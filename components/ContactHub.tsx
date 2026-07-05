'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Building2, 
  Users, 
  Briefcase, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export function ContactHub() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'I am looking for work (Candidate)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Format message to include the selected role context
      const formattedMessage = `[Role: ${form.role}]\n\n${form.message}`;

      const { error } = await supabase
        .from('general_contact_submissions')
        .insert([
          {
            name: form.name,
            email: form.email,
            message: formattedMessage
          }
        ]);

      if (error) throw error;
      setSubmitStatus('success');
      setForm({ name: '', email: '', role: 'I am looking for work (Candidate)', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Decorative background grids & shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            Your Local Merthyr Hub
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display"
          >
            Let's get Merthyr working. <span className="text-orange-500">Get in touch.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 leading-relaxed"
          >
            Have a question about our trials, mentoring, or how to partner with us? Drop us a message or visit our local community hub.
          </motion.p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Physical Office Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Redhouse Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=800&q=80" 
                  alt="Redhouse Merthyr Tydfil Workspace" 
                  className="object-cover w-full h-full filter saturate-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-orange-500 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                    REDHOUSE HUB
                  </span>
                  <h4 className="text-lg font-bold font-display mt-2">The Historic Old Town Hall</h4>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-display mb-4">
                Visit Us in Merthyr Tydfil
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">employeeme Community Hub</p>
                    <p className="text-slate-600">The Redhouse, High Street</p>
                    <p className="text-slate-600">Merthyr Tydfil</p>
                    <p className="text-slate-600 font-medium">CF47 8AE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Opening Hours</p>
                    <p className="text-slate-600">Monday to Friday, 9:00 AM – 4:30 PM</p>
                    <p className="text-xs text-orange-600 font-medium mt-0.5">Drop-ins welcome — no appointment needed</p>
                  </div>
                </div>

                <hr className="border-slate-100 my-4" />

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Phone (Local rate call)</p>
                    <a href="tel:01685725000" className="text-lg font-bold text-slate-800 hover:text-orange-500 transition-colors">
                      01685 725000
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email Us Directly</p>
                    <a href="mailto:hello@employeeme.co.uk" className="text-lg font-bold text-slate-800 hover:text-orange-500 transition-colors">
                      hello@employeeme.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Community Note */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10">
                <Building2 className="w-48 h-48 text-white" />
              </div>
              <p className="text-sm text-slate-400 font-semibold uppercase tracking-widest mb-2">Our Promise</p>
              <p className="text-base text-slate-200 leading-relaxed font-light">
                We are 100% focused on South Wales. All work trials facilitated through our Redhouse hub pay a minimum of the UK National Living Wage (<strong className="text-orange-400">£11.44/hr</strong>).
              </p>
            </div>
          </motion.div>

          {/* Right Column: General Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
              <div className="mb-8">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded">
                  Direct Response
                </span>
                <h3 className="text-2xl font-bold text-slate-950 font-display mt-3">
                  Send Us a Message
                </h3>
                <p className="text-slate-500 mt-1 text-sm">
                  Fill out this quick form and our Merthyr team will get back to you within 1 business day.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-800 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-900 bg-slate-50/50 hover:bg-slate-50"
                  />
                </div>

                {/* Radio Selector: Who Are You? */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-3">
                    Who are you?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { 
                        id: 'candidate', 
                        label: 'Looking for Work', 
                        desc: 'Candidate',
                        icon: Users,
                        full: 'I am looking for work (Candidate)'
                      },
                      { 
                        id: 'employer', 
                        label: 'Looking to Hire', 
                        desc: 'Employer',
                        icon: Briefcase,
                        full: 'I am looking to hire (Employer)'
                      },
                      { 
                        id: 'partner', 
                        label: 'Authority / Partner', 
                        desc: 'Community Partner',
                        icon: Building2,
                        full: 'I am a local authority or community partner'
                      }
                    ].map((item) => {
                      const IconComponent = item.icon;
                      const isSelected = form.role === item.full;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setForm({ ...form, role: item.full })}
                          className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                            isSelected 
                              ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20' 
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 mb-2 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                          <span className="font-bold text-slate-900 text-sm leading-tight">{item.label}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-800 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-slate-900 bg-slate-50/50 hover:bg-slate-50 resize-y"
                  />
                </div>

                {/* Submission State Alerts */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Message sent successfully!</p>
                        <p className="text-sm text-green-700">Thank you for reaching out. A friendly member of our Merthyr team will contact you very soon.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl"
                    >
                      <p className="font-bold">Something went wrong</p>
                      <p className="text-sm text-red-700">We couldn't submit your message. Please check your network connection and try again, or call us directly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed focus:ring-4 focus:ring-orange-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* Map & Travel Assistance Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-lg font-bold text-slate-950 font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-ping" />
              Getting here is simple
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Redhouse is located right on the High Street, just a <strong className="text-slate-950">3-minute walk</strong> from the main Merthyr Tydfil Bus Station and Train Station. If you need help planning your bus route or need transport support, let us know!
            </p>
          </div>
          <a 
            href="https://maps.google.com/?q=The+Redhouse+High+Street+Merthyr+Tydfil+CF47+8AE"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors px-5 py-3 rounded-xl border border-orange-100"
          >
            Open in Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}