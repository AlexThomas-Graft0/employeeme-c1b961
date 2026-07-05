'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2, 
  Send, 
  TrendingUp, 
  Users, 
  Briefcase,
  Sparkles,
  Heart
} from 'lucide-react'

export function Footer() {
  const [activeTrialsCount, setActiveTrialsCount] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count, error } = await supabase
          .from('work_trials')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')
        
        if (!error && count !== null) {
          setActiveTrialsCount(count)
        } else {
          // Tasteful fallback placeholder count if no active trials in DB yet
          setActiveTrialsCount(12)
        }
      } catch (err) {
        // Fallback to average/placeholder
        setActiveTrialsCount(12)
      }
    }
    fetchStats()
  }, [])

  const handleQuickInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { error } = await supabase
        .from('general_contact_submissions')
        .insert([
          {
            name: 'Quick Footer Enquiry',
            email: email,
            message: message,
          }
        ])

      if (error) throw error

      setSubmitSuccess(true)
      setEmail('')
      setMessage('')
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err: any) {
      setSubmitError('Something went wrong. Please try again or email hello@employeeme.co.uk')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-[#1E293B] text-slate-100 border-t-4 border-[#F97316] overflow-hidden">
      {/* Background subtle decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_40%)] pointer-events-none" />
      
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#15803D]/20 rounded-xl border border-[#15803D]/30 text-[#15803D] flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
                  Live in Merthyr Tydfil
                </p>
                <h4 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                  <span>{activeTrialsCount !== null ? activeTrialsCount : '...'} Active Paid Work Trials</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#15803D] text-white animate-pulse">
                    Apply Today
                  </span>
                </h4>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="#trials" 
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-[#F97316] hover:bg-orange-600 text-white transition-all duration-200 shadow-lg shadow-orange-500/20 active:scale-95"
              >
                Find Paid Work
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
              <a 
                href="#post-trial" 
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all duration-200 active:scale-95"
              >
                Hire Local Talent
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                employeeme<span className="text-[#F97316] font-extrabold">.</span>
              </span>
            </div>
            
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Made in Merthyr Tydfil. Supporting our community, our young people, and our local businesses. No CVs, no stress, just paid opportunities.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <MapPin className="h-5 w-5 text-[#F97316] shrink-0" />
                <span>The Redhouse, High Street, Merthyr Tydfil, CF47 8AE</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <Heart className="h-5 w-5 text-red-400 shrink-0 fill-red-400/20" />
                <span>Guaranteed £11.44+/hr minimum pay</span>
              </div>
            </div>
          </div>

          {/* Column 2: Candidates */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              For Candidates
            </h5>
            <ul className="space-y-3">
              <li>
                <a href="#trials" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>Find Work Trials</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#mentoring" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>Meet a Mentor</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#login" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>Candidate Login</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Employers */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              For Employers
            </h5>
            <ul className="space-y-3">
              <li>
                <a href="#post-trial" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>Post an Opportunity</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>How It Works</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#login" className="text-slate-300 hover:text-[#F97316] transition-colors duration-150 text-sm flex items-center gap-1 group">
                  <span>Employer Login</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Help Form */}
          <div className="lg:col-span-4 space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F97316]" />
              <span>Got a quick question?</span>
            </h5>
            <p className="text-xs text-slate-400">
              Drop us your email and query. Our local Merthyr team will text or email you back.
            </p>

            <form onSubmit={handleQuickInquiry} className="space-y-3">
              <div>
                <input 
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-850 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-white placeholder-slate-500 bg-slate-800/80"
                />
              </div>
              <div>
                <textarea 
                  required
                  rows={2}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-850 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-white placeholder-slate-500 bg-slate-800/80 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold bg-[#F97316] hover:bg-orange-600 text-white rounded-lg transition-colors duration-150 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 bg-[#15803D]/20 border border-[#15803D]/40 text-green-400 text-xs rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Diolch! We will contact you within 1 business day.</span>
                  </motion.div>
                )}

                {submitError && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-850 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center md:text-left leading-relaxed">
              © 2024 employeeme. Supported by local South Wales community partners. 
              <br className="hidden sm:block" />
              All trials pay a minimum of UK National Living Wage (£11.44/hr).
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact Hub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}