import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Trash2, CheckCircle, Clock, Archive } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"inquiries" | "orders" | "newsletters" | "feedback">("inquiries");
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Queries
  const dashboardQuery = trpc.admin.dashboard.useQuery(undefined, {
    refetchInterval: refreshInterval,
  });
  const inquiriesQuery = trpc.inquiries.list.useQuery({ limit: 100, offset: 0 }, {
    refetchInterval: refreshInterval,
  });
  const ordersQuery = trpc.serviceOrders.list.useQuery({ limit: 100, offset: 0 }, {
    refetchInterval: refreshInterval,
  });
  const newslettersQuery = trpc.newsletters.list.useQuery({ limit: 100, offset: 0 }, {
    refetchInterval: refreshInterval,
  });
  const feedbackQuery = trpc.feedback.list.useQuery({ limit: 100, offset: 0 }, {
    refetchInterval: refreshInterval,
  });

  // Mutations
  const updateInquiryStatusMutation = trpc.inquiries.updateStatus.useMutation();
  const updateOrderStatusMutation = trpc.serviceOrders.updateStatus.useMutation();
  const updateFeedbackStatusMutation = trpc.feedback.updateStatus.useMutation();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/");
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleStatusChange = async (id: number, status: string, type: "inquiry" | "order" | "feedback") => {
    try {
      if (type === "inquiry") {
        await updateInquiryStatusMutation.mutateAsync({ id, status: status as any });
      } else if (type === "order") {
        await updateOrderStatusMutation.mutateAsync({ id, status: status as any });
      } else if (type === "feedback") {
        await updateFeedbackStatusMutation.mutateAsync({ id, status: status as any });
      }
      toast.success("Status updated");
      // Refetch data
      inquiriesQuery.refetch();
      ordersQuery.refetch();
      feedbackQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-gradient">Bayezid Admin</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{user?.name}</span>
            <button
              onClick={() => {
                trpc.auth.logout.useMutation().mutate();
                navigate("/");
              }}
              className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-24 pb-12">
        <div className="container">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Inquiries", value: dashboardQuery.data?.inquiriesCount || 0, icon: "📧" },
              { label: "Orders", value: dashboardQuery.data?.ordersCount || 0, icon: "🛒" },
              { label: "Subscribers", value: dashboardQuery.data?.newslettersCount || 0, icon: "📬" },
              { label: "Feedback", value: dashboardQuery.data?.feedbackCount || 0, icon: "⭐" },
            ].map((stat, idx) => (
              <div key={idx} className="card-premium">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: "inquiries", label: "Inquiries" },
              { id: "orders", label: "Orders" },
              { id: "newsletters", label: "Subscribers" },
              { id: "feedback", label: "Feedback" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Inquiries Table */}
          {activeTab === "inquiries" && (
            <div className="card-premium overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6">Client Inquiries</h3>
              {inquiriesQuery.isLoading ? (
                <p>Loading inquiries...</p>
              ) : inquiriesQuery.data?.length === 0 ? (
                <p className="text-neutral-600 dark:text-neutral-400">No inquiries yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Message</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiriesQuery.data?.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        <td className="py-3 px-4">{inquiry.name}</td>
                        <td className="py-3 px-4">{inquiry.email}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{inquiry.message}</td>
                        <td className="py-3 px-4">
                          <select
                            value={inquiry.status || "new"}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value, "inquiry")}
                            className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="responded">Responded</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <a href={`mailto:${inquiry.email}`} className="text-purple-600 hover:text-purple-700">
                            Reply
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Orders Table */}
          {activeTab === "orders" && (
            <div className="card-premium overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6">Service Orders</h3>
              {ordersQuery.isLoading ? (
                <p>Loading orders...</p>
              ) : ordersQuery.data?.length === 0 ? (
                <p className="text-neutral-600 dark:text-neutral-400">No orders yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Client</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Service</th>
                      <th className="text-left py-3 px-4 font-semibold">Budget</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersQuery.data?.map((order) => (
                      <tr key={order.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        <td className="py-3 px-4">{order.clientName}</td>
                        <td className="py-3 px-4">{order.clientEmail}</td>
                        <td className="py-3 px-4">{order.serviceName}</td>
                        <td className="py-3 px-4">${order.budget || "N/A"}</td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status || "pending"}
                            onChange={(e) => handleStatusChange(order.id, e.target.value, "order")}
                            className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Newsletters Table */}
          {activeTab === "newsletters" && (
            <div className="card-premium overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6">Newsletter Subscribers</h3>
              {newslettersQuery.isLoading ? (
                <p>Loading subscribers...</p>
              ) : newslettersQuery.data?.length === 0 ? (
                <p className="text-neutral-600 dark:text-neutral-400">No subscribers yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newslettersQuery.data?.map((newsletter) => (
                      <tr key={newsletter.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        <td className="py-3 px-4">{newsletter.name}</td>
                        <td className="py-3 px-4">{newsletter.email}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                            {newsletter.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">
                          {new Date(newsletter.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Feedback Table */}
          {activeTab === "feedback" && (
            <div className="card-premium overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6">Customer Feedback</h3>
              {feedbackQuery.isLoading ? (
                <p>Loading feedback...</p>
              ) : feedbackQuery.data?.length === 0 ? (
                <p className="text-neutral-600 dark:text-neutral-400">No feedback yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold">Message</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackQuery.data?.map((fb) => (
                      <tr key={fb.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                        <td className="py-3 px-4">{fb.name}</td>
                        <td className="py-3 px-4">{fb.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {[...Array(fb.rating)].map((_, i) => (
                              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate">{fb.message}</td>
                        <td className="py-3 px-4">
                          <select
                            value={fb.status || "new"}
                            onChange={(e) => handleStatusChange(fb.id, e.target.value, "feedback")}
                            className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
