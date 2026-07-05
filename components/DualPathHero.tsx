'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export function DualPathHero() {
  // Stats loaded from Supabase
  const [activeTrialsCount, setActiveTrialsCount] = useState<number | null>(null);
  const [placedCount, setPlacedCount] = useState<number>(142); // Fallback / default

  // Modals state
  const [activeModal, setActiveModal] = useState<'candidate' | 'employer' | null>(null);

  // Form states
  const [candidateForm, setCandidateForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    sector: 'Construction & Trades',
    error: '',
    success: false,
    loading: false,
  });

  const [employerForm, setEmployerForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    hiringNeeds: '',
    error: '',
    success: false,
    loading: false,
  });

  // Fetch real-time count of active trials from Supabase
  useEffect(() => {
    async function fetchStats() {
      try {
        const { count, error } = await supabase
          .from('work_trials')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        if (!error && count !== null) {
          setActiveTrialsCount(count);
        }
      } catch (err) {
        console.error('Error fetching trials count:', err);
      }
    }
    fetchStats();
  }, []);

  // Candidate Form Submit Handler
  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateForm((prev) => ({ ...prev, loading: true, error: '' }));

    const { fullName, email, phone, sector } = candidateForm;

    if (!fullName || !email || !phone) {
      setCandidateForm((prev) => ({
        ...prev,
        loading: false,
        error: 'Please fill in all fields so we can reach you.',
      }));
      return;
    }

    try {
      // 1. Insert into general profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            email,
            full_name: fullName,
            phone,
            role: 'candidate',
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      if (profileData) {
        // 2. Insert into candidate_profiles
        const { error: candidateError } = await supabase
          .from('candidate_profiles')
          .insert([
            {
              profile_id: profileData.id,
              preferred_sectors: [sector],
              bio: 'Quick registration via home hero',
              status: 'pending',
            },
          ]);

        if (candidateError) throw candidateError;
      }

      setCandidateForm((prev) => ({
        ...prev,
        loading: false,
        success: true,
        error: '',
      }));
    } catch (err: any) {
      setCandidateForm((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Something went wrong. Please try again.',
      }));
    }
  };

  // Employer Form Submit Handler
  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmployerForm((prev) => ({ ...prev, loading: true, error: '' }));

    const { companyName, contactPerson, email, phone, hiringNeeds } = employerForm;

    if (!companyName || !contactPerson || !email || !phone) {
      setEmployerForm((prev) => ({
        ...prev,
        loading: false,
        error: 'Please complete all required fields.',
      }));
      return;
    }

    try {
      const { error } = await supabase
        .from('employer_enquiries')
        .insert([
          {
            company_name: companyName,
            contact_person: contactPerson,
            email,
            phone,
            hiring_needs: hiringNeeds,
          },
        ]);

      if (error) throw error;

      setEmployerForm((prev) => ({
        ...prev,
        loading: false,
        success: true,
        error: '',
      }));
    } catch (err: any) {
      setEmployerForm((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to submit. Please try again.',
      }));
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-between">
      {/* Dynamic Stats Top Bar */}
      <div className="bg-slate-900 text-white py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-300">
              Active in Merthyr Tydfil:
            </span>
            <span className="text-white font-semibold">
              {activeTrialsCount !== null ? `${activeTrialsCount} live paid trials` : 'New paid trials loaded daily'}
            </span>
          </div>
          <div className="text-slate-400 text-xs sm:text-sm">
            Guaranteed pay of at least <strong className="text-emerald-400">£11.44/hr</strong>. No exceptions.
          </div>
        </div>
      </div>

      {/* Main Dual Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-grow">
        
        {/* Left Column: Candidates */}
        <div className="relative group overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white border-r border-slate-100">
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
              For Candidates Aged 16-24
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              No CV? No problem. <br />
              <span className="text-orange-500">Get paid</span> to show what you can do.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Skip the boring classrooms and endless job applications. We connect you directly with local, paid work trials in Merthyr. Your attitude is your qualification.
            </p>

            <div className="pt-4 space-y-4">
              <button
                onClick={() => setActiveModal('candidate')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Start Your No-CV Profile (Takes 3 mins)
              </button>
              
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Free to join. You will always get paid at least £11.44 per hour.
              </p>
            </div>
          </div>

          {/* Bottom Card / Contextual Visual */}
          <div className="relative mt-12 pt-8 border-t border-slate-100 z-10">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1521791136364-7286d3557385?auto=format&fit=crop&w=150&q=80"
                alt="Connor from Merthyr"
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-100 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  "Getting paid to show what I can do changed everything."
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Connor, 19, Gurnos — Now full-time Junior Site Assistant
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Employers */}
        <div className="relative group overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-slate-900 text-white">
          {/* Subtle background pattern/glow */}
          <div className="absolute inset-0 bg-gradient-to-bl from-slate-800/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
              For Local Businesses
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Stop reading CVs. <br />
              <span className="text-orange-400">Start hiring</span> by seeing people work.
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
              Skip the no-shows and irrelevant applications. Find motivated, reliable young people in Merthyr Tydfil through low-risk, paid work trials.
            </p>

            <div className="pt-4 space-y-4">
              <button
                onClick={() => setActiveModal('employer')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 rounded-xl shadow-lg shadow-slate-950/50 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Post a Work Trial
              </button>
              
              <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pre-vetted local candidates ready to show up and work.
              </p>
            </div>
          </div>

          {/* Bottom Card / Contextual Visual */}
          <div className="relative mt-12 pt-8 border-t border-slate-800 z-10">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=150&q=80"
                alt="Local Merthyr Employer"
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-800 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  "No recruitment fees, no endless interviews. Just great local workers."
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Valleys Construction Ltd, Merthyr Tydfil
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Community Impact Statistics Horizontal Ribbon */}
      <div className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">£11.44/hr</p>
            <p className="text-xs sm:text-sm text-slate-300">Minimum guaranteed pay rate. Every hour is paid.</p>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{placedCount}</p>
            <p className="text-xs sm:text-sm text-slate-300">Local young people in Merthyr placed into jobs.</p>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">48 hours</p>
            <p className="text-xs sm:text-sm text-slate-300">Average time from profile to first paid trial.</p>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">85%</p>
            <p className="text-xs sm:text-sm text-slate-300">Of trials lead directly to permanent work offers.</p>
          </div>
        </div>
      </div>

      {/* Dynamic Modals / Slide-outs */}
      <AnimatePresence>
        {activeModal === 'candidate' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Start Your No-CV Profile</h3>
                  <p className="text-xs text-orange-100">Takes 3 mins • Free to join</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-orange-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {candidateForm.success ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Success! Welcome aboard.</h4>
                    <p className="text-slate-600 text-sm">
                      We've reserved your spot. A local mentor from Merthyr will text or call you within 24 hours to help you set up your direct trial.
                    </p>
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        setCandidateForm((prev) => ({ ...prev, success: false }));
                      }}
                      className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCandidateSubmit} className="space-y-4">
                    {candidateForm.error && (
                      <div className="p-3 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-100">
                        {candidateForm.error}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Connor Jenkins"
                        value={candidateForm.fullName}
                        onChange={(e) => setCandidateForm({ ...candidateForm, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-250 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. connor@gurnos.co.uk"
                        value={candidateForm.email}
                        onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-250 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number (For mentor to text you)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07700 900077"
                        value={candidateForm.phone}
                        onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-250 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        What sector are you interested in?
                      </label>
                      <select
                        value={candidateForm.sector}
                        onChange={(e) => setCandidateForm({ ...candidateForm, sector: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-250 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      >
                        <option>Construction & Trades</option>
                        <option>Hospitality & Food</option>
                        <option>Retail & Customer Support</option>
                        <option>Warehouse & Logistics</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={candidateForm.loading}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {candidateForm.loading ? (
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Save My Spot'
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-2">
                      By signing up you agree to let a local mentor contact you. We never share your details with spam companies.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === 'employer' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold">Post a Work Trial Enquiry</h3>
                  <p className="text-xs text-slate-400">No placement fees • No risk trial model</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-slate-800 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {employerForm.success ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Enquiry Received</h4>
                    <p className="text-slate-600 text-sm">
                      Thank you. Our local Merthyr team will contact you within 1 business day to confirm candidate availability and help set up your trial.
                    </p>
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        setEmployerForm((prev) => ({ ...prev, success: false }));
                      }}
                      className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEmployerSubmit} className="space-y-4">
                    {employerForm.error && (
                      <div className="p-3 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-100">
                        {employerForm.error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Valleys Construction"
                          value={employerForm.companyName}
                          onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-slate-250 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Your Name & Role
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. David Evans"
                          value={employerForm.contactPerson}
                          onChange={(e) => setEmployerForm({ ...employerForm, contactPerson: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-slate-250 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. david@valleysconstruction.co.uk"
                        value={employerForm.email}
                        onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-250 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07700 900077"
                        value={employerForm.phone}
                        onChange={(e) => setEmployerForm({ ...employerForm, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-250 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        What roles do you need help with?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Junior site work, basic labor, kitchen assistant..."
                        value={employerForm.hiringNeeds}
                        onChange={(e) => setEmployerForm({ ...employerForm, hiringNeeds: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-250 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={employerForm.loading}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {employerForm.loading ? (
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}