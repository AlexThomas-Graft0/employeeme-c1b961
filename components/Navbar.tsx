'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus, MapPin, Briefcase, GraduationCap, ShieldCheck, Check } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(null);
  const [userRole, setUserRole] = useState<'candidate' | 'employer'>('candidate');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Find Work', href: '#find-work' },
    { label: 'Hire Talent', href: '#hire-talent' },
    { label: 'Live Trials', href: '#live-trials' },
    { label: 'Mentoring', href: '#mentoring' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center space-x-2 group focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-md outline-none"
              aria-label="employeeme Home"
            >
              <span className="text-2xl font-bold text-slate-800 tracking-tight font-display transition-colors duration-200 group-hover:text-slate-900">
                employeeme<span className="text-orange-500 font-extrabold">.</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                <MapPin className="w-3 h-3 mr-1 text-orange-500" /> Merthyr Tydfil
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveModal('login')}
                className="px-5 py-2 text-[15px] font-semibold text-slate-800 bg-white border-2 border-slate-800 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 outline-none"
              >
                Log In
              </button>
              <button
                onClick={() => setActiveModal('signup')}
                className="px-5 py-2 text-[15px] font-semibold text-white bg-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 shadow-sm shadow-orange-500/10 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 outline-none"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 px-2 py-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Merthyr Tydfil Hub</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    <span>All Trials Paid £11.44+</span>
                  </div>
                </div>

                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-[16px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 outline-none"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="pt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveModal('login');
                    }}
                    className="w-full py-3 text-center text-sm font-bold text-slate-800 bg-white border-2 border-slate-800 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveModal('signup');
                    }}
                    className="w-full py-3 text-center text-sm font-bold text-white bg-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Authentication Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10"
            >
              {/* Header banner */}
              <div className="bg-slate-800 text-white px-6 py-5 relative">
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-700 rounded-lg"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold tracking-tight font-display">
                    employeeme<span className="text-orange-500">.</span>
                  </span>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                    Merthyr Hub
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-2 font-display">
                  {activeModal === 'login' ? 'Welcome Back!' : 'Create Your Free Account'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {activeModal === 'login'
                    ? 'Log in to view active work trials and chat with your mentor.'
                    : 'Get paired with a local mentor and skip standard job applications.'}
                </p>
              </div>

              {/* Role Toggle */}
              <div className="px-6 pt-6">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setUserRole('candidate')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      userRole === 'candidate'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
                    <span>I want Work (16-24)</span>
                  </button>
                  <button
                    onClick={() => setUserRole('employer')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      userRole === 'employer'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                    <span>I want to Hire Talent</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
                {activeModal === 'signup' && userRole === 'candidate' && (
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mb-2">
                    <p className="text-xs text-orange-800 font-medium leading-relaxed">
                      💡 <strong>No CV Needed!</strong> We do not care about school grades. Your attitude is your qualification. Registration takes 3 minutes.
                    </p>
                  </div>
                )}

                {activeModal === 'signup' && userRole === 'employer' && (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 mb-2">
                    <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                      🤝 <strong>Zero Recruitment Fees.</strong> Test local candidates through low-risk, paid trials. All candidates supported by a peer mentor.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., connor@gurnos.co.uk"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {activeModal === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name / Company Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={userRole === 'candidate' ? 'Connor Jenkins' : 'Valleys Construction Ltd'}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number (For WhatsApp / Text Matches)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g., 07700 900077"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 ${
                      userRole === 'candidate'
                        ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 shadow-orange-500/10'
                        : 'bg-slate-800 hover:bg-slate-900 focus:ring-slate-800 shadow-slate-800/10'
                    }`}
                  >
                    {activeModal === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Log In to Dashboard</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>{userRole === 'candidate' ? 'Create My Free Profile' : 'Register as Employer'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(activeModal === 'login' ? 'signup' : 'login')}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline decoration-slate-300 hover:decoration-slate-800 transition-colors"
                  >
                    {activeModal === 'login'
                      ? "Don't have an account? Sign up free"
                      : 'Already have an account? Log in'}
                  </button>
                </div>
              </form>

              {/* Guarantees Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-700" /> Fully safe & Jobcentre approved
                </span>
                <span className="font-semibold text-slate-700">
                  Paid Trial Guarantee (£11.44+/hr)
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}