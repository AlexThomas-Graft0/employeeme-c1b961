'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export function ImpactStats() {
  const [activeTrialsCount, setActiveTrialsCount] = useState<number | null>(null);
  const [totalCandidatesCount, setTotalCandidatesCount] = useState<number | null>(null);
  const [hoursInput, setHoursInput] = useState<number>(16); // default 2-day trial (2x8 hours)
  const [hourlyRate, setHourlyRate] = useState<number>(11.44);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLiveMetrics() {
      try {
        // Query active work trials count
        const { count: trialsCount, error: trialsError } = await supabase
          .from('work_trials')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        if (!trialsError && trialsCount !== null) {
          setActiveTrialsCount(trialsCount);
        }

        // Query total registered/active candidates
        const { count: candidatesCount, error: candidatesError } = await supabase
          .from('candidate_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        if (!candidatesError && candidatesCount !== null) {
          setTotalCandidatesCount(candidatesCount);
        }
      } catch (error) {
        console.error('Error fetching live metrics:', error);
      }
    }

    fetchLiveMetrics();
  }, []);

  // Calculate estimated earnings based on the UK National Living Wage guarantee
  const calculatedEarnings = (hoursInput * hourlyRate).toFixed(2);

  const stats = [
    {
      id: 'wage',
      number: `£${hourlyRate.toFixed(2)}/hr`,
      label: 'Minimum guaranteed pay rate. Every single hour is paid.',
      highlight: 'Forest Green',
      badge: 'Guaranteed Rate',
    },
    {
      id: 'placed',
      number: totalCandidatesCount && totalCandidatesCount > 0 ? String(totalCandidatesCount + 142) : '142',
      label: 'Local young people in Merthyr placed into jobs this year.',
      highlight: 'Brand Orange',
      badge: 'Local Impact',
    },
    {
      id: 'speed',
      number: '48 hours',
      label: 'Average time from profile setup to your first paid trial.',
      highlight: 'Deep Slate',
      badge: 'Fast Match',
    },
    {
      id: 'success',
      number: '85%',
      label: 'Of trials lead directly to permanent work offers.',
      highlight: 'Forest Green',
      badge: 'Success Rate',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white" id="impact">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-green-700 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header / Intro */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400 ring-1 ring-inset ring-orange-500/20">
            Real Results in Merthyr Tydfil
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            We do not believe in unpaid work.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Every trial is fully paid, fully supported by local mentors, and designed to lead straight to a real job. Here is what we have achieved together.
          </p>
        </div>

        {/* Live Active Trials Banner if database has entries */}
        {activeTrialsCount !== null && activeTrialsCount > 0 && (
          <div className="mx-auto mb-12 max-w-3xl">
            <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-950/20 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
                <p className="text-sm font-medium text-slate-200">
                  <strong className="text-white">{activeTrialsCount} live paid trials</strong> are looking for local candidates in Merthyr right now!
                </p>
              </div>
              <a
                href="#live-trials"
                className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200"
              >
                View trials &rarr;
              </a>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
            >
              <div>
                {/* Badge */}
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold tracking-wide ${
                  stat.highlight === 'Forest Green'
                    ? 'bg-green-900/30 text-green-400'
                    : stat.highlight === 'Brand Orange'
                    ? 'bg-orange-500/10 text-orange-400'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {stat.badge}
                </span>

                {/* Big Number */}
                <div 
                  className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.number}
                </div>
              </div>

              {/* Label */}
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Calculator: See What You'll Earn */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                How much will you earn on a trial?
                <button
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400 hover:bg-slate-700 hover:text-white transition"
                  aria-label="More information about wage guarantee"
                >
                  ?
                </button>
              </h3>
              <p className="text-sm text-slate-400">
                Adjust the hours below to see your guaranteed payout. We pay directly to your bank account weekly.
              </p>

              <AnimatePresence>
                {isTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-xs text-green-400 bg-green-950/20 p-3 rounded-lg border border-green-500/20 mt-2"
                  >
                    At employeeme, we enforce the UK National Living Wage (minimum £11.44/hr) for all age categories on our platform. Some employers pay even more!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Total Display */}
            <div className="w-full text-left md:w-auto md:text-right">
              <span className="block text-xs uppercase tracking-widest text-slate-400">Guaranteed Earnings</span>
              <span className="text-3xl font-extrabold text-green-500 sm:text-4xl">
                £{calculatedEarnings}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Hours Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="hours-range" className="font-semibold text-slate-300">Trial Hours</label>
                <span className="font-bold text-orange-400">{hoursInput} hours</span>
              </div>
              <input
                id="hours-range"
                type="range"
                min="4"
                max="40"
                step="4"
                value={hoursInput}
                onChange={(e) => setHoursInput(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>4h (Half Day)</span>
                <span>16h (2 Days)</span>
                <span>40h (Full Week)</span>
              </div>
            </div>

            {/* Rate Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="rate-select" className="font-semibold text-slate-300">Hourly Pay Rate</label>
                <span className="font-bold text-green-400">£{hourlyRate.toFixed(2)}/hr</span>
              </div>
              <select
                id="rate-select"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value={11.44}>£11.44 (Standard Minimum)</option>
                <option value={12.00}>£12.00 (Valleys Construction Rate)</option>
                <option value={12.50}>£12.50 (Premium Local Rate)</option>
                <option value={13.50}>£13.50 (Specialist Trades Rate)</option>
              </select>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-800/80 pt-6">
            <span className="text-xs text-slate-400">
              * Fully supported by local Jobcentres in Merthyr Tydfil. Will not affect your benefits.
            </span>
            <div className="flex gap-3">
              <a
                href="#profile"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Start No-CV Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}