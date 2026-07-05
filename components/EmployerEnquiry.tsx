'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export function EmployerEnquiry() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    hiringNeeds: '',
    industry: 'Construction & Trades',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('employer_enquiries')
        .insert({
          company_name: formData.companyName,
          contact_person: formData.contactName,
          industry: formData.industry,
          email: formData.email,
          phone: formData.phone,
          hiring_needs: formData.hiringNeeds,
        });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        hiringNeeds: '',
        industry: 'Construction & Trades',
      });
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="employer-enquiry" className="relative py-24 bg-slate-50 overflow-hidden font-sans">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 3.1: Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase text-orange-600 bg-orange-50 rounded-full border border-orange-200">
              For Local Businesses in Merthyr Tydfil
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Stop reading CVs.<br />
              <span className="text-orange-500">Start hiring</span> by seeing people work.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Find motivated, reliable entry-level workers in Merthyr Tydfil through low-risk, paid work trials. No recruitment agency fees. No endless interviews.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#post-trial-form" 
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Post a Work Trial Now
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-300 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Learn More
              </a>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-slate-200">
              <div>
                <p className="text-2xl font-bold text-slate-900">85%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Success Rate</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-green-700">£11.44/hr</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Min. Guaranteed Pay</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900">142+</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Placed This Year</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80" 
                alt="Local workspace construction site in South Wales" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Trusted by Local Employers</p>
                <p className="text-lg font-bold mt-1">"We found two incredible yard assistants in less than a week."</p>
                <p className="text-xs text-slate-300 mt-2">— Valleys Construction, Gurnos</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 3.2: Why the Paid Work Trial Model Works */}
        <div id="how-it-works" className="mb-24 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Why the Paid Work Trial Model Works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              No long-winded interviews, no fake CVs. Just motivated Merthyr youth showing you what they can do on the job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-orange-500/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>No More No-Shows</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Traditional job boards result in hundreds of low-quality CVs. Our candidates are pre-vetted for attitude and supported by a dedicated local mentor who ensures they show up on time and ready to work.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-orange-500/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Zero-Risk Trialing</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Test a candidate’s fit in your actual workplace environment before committing to a contract. If the match isn't right, the trial simply ends with no strings attached.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-orange-500/40 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Community First</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Build a diverse local workforce. By hiring based on attitude rather than qualifications, you give local Merthyr youth a real chance while filling your open roles with loyal, hard-working talent.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3.3: Pricing & Partnership Structure */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Transparent, Zero-Fee Partnership
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Our mission is to support local employment. We never charge local businesses recruitment or placement fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: The Trial Phase */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-orange-500/20 overflow-hidden flex flex-col justify-between">
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded">Phase 1</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>The Trial Phase</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Platform Cost</p>
                    <p className="text-2xl font-extrabold text-slate-900">FREE</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Post unlimited paid work trials and get matched with pre-vetted local candidates instantly.
                </p>
                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <p className="font-semibold text-xs text-slate-400 uppercase tracking-wider">Features Included:</p>
                  <ul className="space-y-2.5">
                    <li className="flex items-center text-sm text-slate-700">
                      <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Unlimited work trial listings
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                      <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Pre-vetted local candidate matching
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                      <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Dedicated candidate mentor support
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-50 px-8 py-5 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-800">Your Only Cost:</strong> You only pay the candidate’s hourly wage (minimum £11.44/hr) during the trial.
                </p>
              </div>
            </div>

            {/* Card 2: The Hiring Phase */}
            <div className="bg-slate-900 rounded-2xl shadow-md border border-slate-800 overflow-hidden flex flex-col justify-between text-white">
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/50 px-2.5 py-1 rounded">Phase 2</span>
                    <h3 className="text-2xl font-bold text-white mt-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>The Hiring Phase</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Placement Fee</p>
                    <p className="text-2xl font-extrabold text-orange-400">£0</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-6">
                  Transition your work trial candidate to permanent contracted staff with zero buyout fees or catch.
                </p>
                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <p className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Features Included:</p>
                  <ul className="space-y-2.5">
                    <li className="flex items-center text-sm text-slate-200">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Transition trialist to permanent staff
                    </li>
                    <li className="flex items-center text-sm text-slate-200">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      No agency buyout or conversion fees
                    </li>
                    <li className="flex items-center text-sm text-slate-200">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Ongoing support from our local team
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-950 px-8 py-5 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  <strong className="text-white">Absolutely Free:</strong> We do not charge local businesses to hire our candidates. No hidden costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.4: Employer Enquiry Form */}
        <div id="post-trial-form" className="scroll-mt-20 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
            <div className="bg-slate-900 py-8 px-6 sm:px-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                GET IN TOUCH TO POST A TRIAL
              </h3>
              <p className="mt-2 text-slate-300 text-sm max-w-lg mx-auto">
                Fill out this quick form and our Merthyr team will call you back within 1 business day.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      placeholder="e.g. Valleys Construction Ltd"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Name & Role *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      placeholder="e.g. David Evans, Site Manager"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. david@valleysconstruction.co.uk"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. 07700 900077"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Industry Sector
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all"
                  >
                    <option value="Construction & Trades">Construction & Trades</option>
                    <option value="Hospitality & Food">Hospitality & Food</option>
                    <option value="Retail & Customer Support">Retail & Customer Support</option>
                    <option value="Warehouse & Logistics">Warehouse & Logistics</option>
                    <option value="Other">Other Sector</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="hiringNeeds" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    What roles do you need help with?
                  </label>
                  <textarea
                    id="hiringNeeds"
                    name="hiringNeeds"
                    rows={4}
                    placeholder="e.g. Junior site work, basic labor, kitchen prep, warehouse packing..."
                    value={formData.hiringNeeds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900 text-sm transition-all placeholder:text-slate-400 resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Enquiry...
                      </span>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-start gap-3"
                    >
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-bold">Thank you for your enquiry!</p>
                        <p className="mt-0.5">Our Merthyr team will review your requirements and reach out within 1 business day.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-start gap-3"
                    >
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-bold">Submission failed</p>
                        <p className="mt-0.5">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}