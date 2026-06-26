import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star, Send, CheckCircle } from "lucide-react";

export default function Services() {
  const servicesQuery = trpc.services.list.useQuery();
  const inquiryMutation = trpc.inquiries.submit.useMutation();
  const orderMutation = trpc.serviceOrders.submit.useMutation();
  const newsletterMutation = trpc.newsletters.subscribe.useMutation();
  const feedbackMutation = trpc.feedback.submit.useMutation();

  const [activeTab, setActiveTab] = useState<"inquiry" | "order" | "newsletter" | "feedback">("inquiry");
  const [selectedService, setSelectedService] = useState<string>("");
  const [rating, setRating] = useState(0);

  // Inquiry Form
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", message: "" });
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inquiryMutation.mutateAsync(inquiryForm);
      toast.success("Thank you! We'll be in touch soon.");
      setInquiryForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit inquiry");
    }
  };

  // Order Form
  const [orderForm, setOrderForm] = useState({ clientName: "", clientEmail: "", serviceName: "", orderDetails: "", budget: "" });
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await orderMutation.mutateAsync({ ...orderForm, serviceName: selectedService || orderForm.serviceName });
      toast.success("Order submitted! We'll confirm shortly.");
      setOrderForm({ clientName: "", clientEmail: "", serviceName: "", orderDetails: "", budget: "" });
      setSelectedService("");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit order");
    }
  };

  // Newsletter Form
  const [newsletterForm, setNewsletterForm] = useState({ name: "", email: "" });
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await newsletterMutation.mutateAsync(newsletterForm);
      toast.success("Successfully subscribed to newsletter!");
      setNewsletterForm({ name: "", email: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe");
    }
  };

  // Feedback Form
  const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", message: "" });
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      await feedbackMutation.mutateAsync({ ...feedbackForm, rating });
      toast.success("Thank you for your feedback!");
      setFeedbackForm({ name: "", email: "", message: "" });
      setRating(0);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-gradient">Bayezid</a>
          <a href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 transition">← Back</a>
        </div>
      </nav>

      {/* Services Section */}
      <section id="services" className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">Our Services</h1>
          
          {servicesQuery.isLoading ? (
            <div className="text-center py-12">Loading services...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesQuery.data?.map((service) => (
                <div key={service.id} className="card-premium group">
                  <div className="text-5xl mb-4">{service.icon || "✨"}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">{service.description}</p>
                  {service.price && (
                    <p className="text-lg font-semibold text-purple-600 mb-4">From ${service.price}</p>
                  )}
                  <button
                    onClick={() => {
                      setSelectedService(service.name);
                      setActiveTab("order");
                      document.getElementById("forms")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
                  >
                    Order Now →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Forms Section */}
      <section id="forms" className="py-20 md:py-32 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Connect With Us</h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "inquiry", label: "Inquiry" },
              { id: "order", label: "Order Service" },
              { id: "newsletter", label: "Newsletter" },
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

          <div className="max-w-2xl mx-auto">
            {/* Inquiry Form */}
            {activeTab === "inquiry" && (
              <form onSubmit={handleInquirySubmit} className="card-premium space-y-6">
                <h3 className="text-2xl font-bold">Send us an Inquiry</h3>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <Input
                    className="input-premium"
                    placeholder="Your name"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <Input
                    className="input-premium"
                    type="email"
                    placeholder="your@email.com"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <Textarea
                    className="textarea-premium"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={inquiryMutation.isPending}
                >
                  {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"} <Send size={18} />
                </Button>
              </form>
            )}

            {/* Order Form */}
            {activeTab === "order" && (
              <form onSubmit={handleOrderSubmit} className="card-premium space-y-6">
                <h3 className="text-2xl font-bold">Order a Service</h3>
                <div className="form-group">
                  <label className="form-label">Service</label>
                  <select
                    className="input-premium"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Select a service</option>
                    {servicesQuery.data?.map((service) => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <Input
                    className="input-premium"
                    placeholder="Your name"
                    value={orderForm.clientName}
                    onChange={(e) => setOrderForm({ ...orderForm, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <Input
                    className="input-premium"
                    type="email"
                    placeholder="your@email.com"
                    value={orderForm.clientEmail}
                    onChange={(e) => setOrderForm({ ...orderForm, clientEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Order Details</label>
                  <Textarea
                    className="textarea-premium"
                    placeholder="Describe your requirements..."
                    rows={4}
                    value={orderForm.orderDetails}
                    onChange={(e) => setOrderForm({ ...orderForm, orderDetails: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Budget (Optional)</label>
                  <Input
                    className="input-premium"
                    type="number"
                    placeholder="Your budget"
                    value={orderForm.budget}
                    onChange={(e) => setOrderForm({ ...orderForm, budget: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={orderMutation.isPending}
                >
                  {orderMutation.isPending ? "Submitting..." : "Place Order"} <Send size={18} />
                </Button>
              </form>
            )}

            {/* Newsletter Form */}
            {activeTab === "newsletter" && (
              <form onSubmit={handleNewsletterSubmit} className="card-premium space-y-6">
                <h3 className="text-2xl font-bold">Subscribe to Newsletter</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Get the latest updates and insights delivered to your inbox.</p>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <Input
                    className="input-premium"
                    placeholder="Your name"
                    value={newsletterForm.name}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <Input
                    className="input-premium"
                    type="email"
                    placeholder="your@email.com"
                    value={newsletterForm.email}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"} <Send size={18} />
                </Button>
              </form>
            )}

            {/* Feedback Form */}
            {activeTab === "feedback" && (
              <form onSubmit={handleFeedbackSubmit} className="card-premium space-y-6">
                <h3 className="text-2xl font-bold">Share Your Feedback</h3>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-all transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300 dark:text-neutral-700"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <Input
                    className="input-premium"
                    placeholder="Your name"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <Input
                    className="input-premium"
                    type="email"
                    placeholder="your@email.com"
                    value={feedbackForm.email}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <Textarea
                    className="textarea-premium"
                    placeholder="Tell us what you think..."
                    rows={4}
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={feedbackMutation.isPending}
                >
                  {feedbackMutation.isPending ? "Submitting..." : "Submit Feedback"} <Send size={18} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
