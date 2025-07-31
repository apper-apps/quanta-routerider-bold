import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Help = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      id: 1,
      question: "How do I book a bus ticket?",
      answer: "Simply enter your departure and destination cities along with your travel date on our search page. Browse available routes, select your preferred bus, choose your seats, and complete the booking with passenger details."
    },
    {
      id: 2,
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before departure. Cancellation charges may apply depending on the operator's policy. Go to 'My Bookings' to cancel your ticket."
    },
    {
      id: 3,
      question: "What documents do I need for travel?",
      answer: "You need to carry a valid government-issued photo ID (driver's license, passport, or national ID card) and your booking confirmation (digital or printed)."
    },
    {
      id: 4,
      question: "How early should I arrive at the departure point?",
      answer: "We recommend arriving at least 30 minutes before your scheduled departure time to allow for check-in and boarding procedures."
    },
    {
      id: 5,
      question: "What if my bus is delayed or cancelled?",
      answer: "In case of delays or cancellations, we'll notify you via SMS and email. You can reschedule your journey or request a full refund as per our policy."
    },
    {
      id: 6,
      question: "Can I modify my booking after confirmation?",
      answer: "You can modify your booking (change date, time, or passenger details) up to 4 hours before departure, subject to availability and modification charges."
    }
  ];

  const quickActions = [
    {
      title: "Track Your Bus",
      description: "Get real-time location updates of your bus",
      icon: "MapPin",
      action: () => toast.info("Bus tracking feature coming soon!")
    },
    {
      title: "Refund Status",
      description: "Check the status of your refund requests",
      icon: "RefreshCw",
      action: () => toast.info("Refund tracking feature coming soon!")
    },
    {
      title: "Route Information",
      description: "View detailed route maps and stops",
      icon: "Route",
      action: () => toast.info("Route details feature coming soon!")
    },
    {
      title: "Emergency Contact",
      description: "Get help during your journey",
      icon: "Phone",
      action: () => toast.info("Emergency contact: +1-800-ROUTERIDER")
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you within 24 hours.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-display mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="p-6 text-center cursor-pointer group"
              onClick={action.action}
            >
              <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <ApperIcon name={action.icon} size={32} className="text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "faq"
                  ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "contact"
                  ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ApperIcon 
                      name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-gray-400 flex-shrink-0"
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6 animate-fadeIn">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Additional Help */}
            <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="MessageCircle" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
                  Still need help?
                </h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help you 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" icon="MessageCircle">
                    Live Chat
                  </Button>
                  <Button variant="outline" icon="Phone">
                    Call Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Contact Form */}
        {activeTab === "contact" && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Mail" size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  Send us a message and we'll respond within 24 hours
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="form-label">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="form-label">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">Subject</label>
                  <Input
                    type="text"
                    placeholder="What's this about?"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="form-label">Message</label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    value={contactForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={6}
                    className="form-input resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon="Send"
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="p-6 text-center">
                <div className="bg-gradient-to-r from-success/10 to-green-600/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Phone" size={24} className="text-success" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-sm text-gray-600">+1-800-ROUTERIDER</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Mail" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">support@routerider.com</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="bg-gradient-to-r from-accent/10 to-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name="Clock" size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;