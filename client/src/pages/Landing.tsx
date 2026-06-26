import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-gradient">Bayezid</div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 transition">Services</a>
            <a href="#inquiry" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 transition">Inquiry</a>
            <a href="#feedback" className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 transition">Feedback</a>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Welcome to Excellence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Digital Excellence</span>
              <br />
              Redefined
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Professional digital services crafted with precision and delivered with excellence. Transform your vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate("/inquiry")}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Explore Services
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient">500+</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient">1000+</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Projects Completed</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient">15+</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Optimized solutions that deliver results at incredible speed without compromising quality.",
              },
              {
                icon: "🎯",
                title: "Precision Focused",
                description: "Every detail matters. We craft solutions tailored specifically to your unique needs.",
              },
              {
                icon: "🛡️",
                title: "Fully Secure",
                description: "Enterprise-grade security and reliability you can trust with your most important projects.",
              },
            ].map((item, idx) => (
              <div key={idx} className="card-premium group hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Client Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, Tech Startup",
                text: "Exceptional service and outstanding results. They truly understand what excellence means.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Founder, Digital Agency",
                text: "Professional, reliable, and incredibly talented. A pleasure to work with from start to finish.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                role: "Marketing Director",
                text: "Transformed our entire digital presence. The attention to detail is remarkable.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card-premium">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">Join hundreds of satisfied clients who've transformed their digital presence.</p>
          <button
            onClick={() => navigate("/inquiry")}
            className="bg-white text-purple-600 hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Start Your Project <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-black text-white py-12 border-t border-neutral-800">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bayezid Agency</h3>
              <p className="text-neutral-400">Crafting digital excellence since 2009.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#services" className="hover:text-white transition">Web Design</a></li>
                <li><a href="#services" className="hover:text-white transition">Development</a></li>
                <li><a href="#services" className="hover:text-white transition">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 Connect With Bayezid Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
