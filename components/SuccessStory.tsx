'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  published_at: string
  created_at: string
}

export function SuccessStory() {
  const [activeTab, setActiveTab] = useState<'pathway' | 'article'>('pathway')
  const [showFullArticle, setShowFullArticle] = useState(false)
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .filter('slug', 'eq', 'connor-success-story')
          .limit(1)

        if (data && data.length > 0 && !error) {
          setDbPosts(data as BlogPost[])
        }
      } catch (err) {
        console.error('Error fetching blog posts from Supabase:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Connor's hardcoded premium data
  const connorQuote = "I spent months sending off CVs and never heard back. On employeeme, I built a profile in minutes, got matched with a mentor named Sian, and did a two-day trial at Valleys Construction. I’ve been working here full-time for six months now. Getting paid to show what I can do changed everything."
  const connorBio = "Connor, 19, from Gurnos, Merthyr Tydfil"
  const connorOutcome = "Now working as a Junior Site Assistant"
  const connorArticleTitle = "How Connor went from no qualifications to a full-time building job in Gurnos."
  const connorArticleExcerpt = "I spent months feeling like a failure because school wasn't for me. Here is how a simple 2-day work trial changed my entire life, and why I didn't need a single GCSE to make it happen."
  const connorArticleFull = `
    "Before finding employeeme, my mornings were always the same: wake up in Gurnos, stare at job boards, and copy-paste my empty CV to employers who didn't even bother to decline. It felt like I was invisible because I didn't have the grades.

    Everything changed on a Tuesday in April. I heard about employeeme at the local youth club and decided to build a profile. No writing paragraphs or uploading old school reports. I just checked off what I knew I was good at: always turning up on time, working with my hands, and not minding heavy lifting.

    Within 24 hours, I got a text matching me with Sian, a mentor who lives just ten minutes away. We met up at the Redhouse Hub on High Street for a free coffee. Sian didn't interview me. She just asked what I liked doing, helped me figure out the bus routes to the construction sites, and made sure I felt confident.

    Two days later, I was on-site at Valleys Construction for a paid trial. I got paid £12.00 per hour right from the first morning. No promises, just a chance to show them my attitude. I worked hard, cleaned the zones, helped move materials, and listened to the site manager, David. 

    At the end of the second day, David offered me a full-time contract. Six months later, I am still here, learning trade skills every day and earning a real wage. If you're feeling stuck in Merthyr, don't waste time on CVs—just show them what you can do."
  `

  return (
    <section id="success-story" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50/60 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-800 mb-4 border border-green-200">
            ★ Local Success Story
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            From Gurnos to Full-Time Work
          </h2>
          <p className="text-lg text-slate-600 font-sans">
            Getting a job in Merthyr Tydfil shouldn't be a struggle. See how Connor skipped the classroom, got matched with a local mentor, and proved his value on-site.
          </p>
        </div>

        {/* Major Showcase Card with Forest Green Border */}
        <div className="bg-white rounded-3xl border-4 border-green-700 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: The Testimonial & Connor's Profile Photo */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div>
              {/* Quote Mark Icon */}
              <div className="text-green-700 opacity-20 text-7xl font-serif leading-none h-4 -mt-4 select-none">
                “
              </div>
              
              <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed font-sans mb-8 relative z-10">
                {connorQuote}
              </blockquote>
            </div>

            <div>
              {/* Outcome Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 font-bold text-sm sm:text-base border border-green-200/60 mb-6 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
                {connorOutcome}
              </div>

              {/* Author Info block */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500 bg-slate-200 shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Connor Jenkins"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 font-display">
                    Connor Jenkins
                  </h4>
                  <p className="text-sm text-slate-500">
                    {connorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Journey Tracker & Article Tab */}
          <div className="lg:col-span-5 bg-slate-50/80 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              {/* Navigation Tabs */}
              <div className="flex p-1 bg-slate-200/80 rounded-xl mb-8">
                <button
                  onClick={() => { setActiveTab('pathway'); setShowFullArticle(false); }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === 'pathway' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Connor's Path
                </button>
                <button
                  onClick={() => setActiveTab('article')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === 'article' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Featured Article
                </button>
              </div>

              {/* Tab Contents with Framer Motion */}
              <AnimatePresence mode="wait">
                {activeTab === 'pathway' ? (
                  <motion.div
                    key="pathway"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-bold text-slate-900 font-display mb-4">
                      How Connor Got Hired
                    </h3>

                    {/* Timeline Step 1 */}
                    <div className="flex gap-4 relative">
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200" />
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">No-CV Profile Built</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Connor selected his hand-on skills and availability in 3 minutes. No writing required.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Step 2 */}
                    <div className="flex gap-4 relative">
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200" />
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Matched with Sian (Mentor)</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Met for a friendly coffee at Redhouse Hub to plan his bus routes and build confidence.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Step 3 */}
                    <div className="flex gap-4 relative">
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200" />
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">2-Day Paid Work Trial</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Worked a trial shift at Valleys Construction earning £12.00/hour to prove his reliability.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Step 4 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 border-2 border-green-600 flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 text-base">Permanent Job Offer</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Hired as a full-time Junior Site Assistant. Still working there 6 months later.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="article"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span>Published Oct 12, 2024</span>
                      <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">3 Min Read</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 font-display leading-tight mb-3">
                      {connorArticleTitle}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {connorArticleExcerpt}
                    </p>

                    {showFullArticle ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm text-slate-600 space-y-3 pt-3 border-t border-slate-200 max-h-60 overflow-y-auto pr-2"
                      >
                        {connorArticleFull.trim().split('\n\n').map((para, idx) => (
                          <p key={idx} className="leading-relaxed">{para}</p>
                        ))}
                      </motion.div>
                    ) : null}

                    <button
                      onClick={() => setShowFullArticle(!showFullArticle)}
                      className="mt-2 text-green-700 font-bold text-sm inline-flex items-center gap-1 hover:text-green-800 transition-colors"
                    >
                      {showFullArticle ? 'Collapse Story ↑' : "Read Connor's Story ->"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Callouts/Statistics from Section 1.3 */}
            <div className="mt-8 pt-8 border-t border-slate-200/80 grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-black text-green-700">85%</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  Of trials lead directly to permanent work.
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-2xl font-black text-slate-800">£11.44+</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  Minimum guaranteed pay rate per hour.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Double-Path Call to Action below the main success card */}
        <div className="mt-16 bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Ready to write your own success story?
            </h3>
            <p className="text-slate-300 mt-2 text-sm sm:text-base font-sans">
              Whether you are a young person looking for work, or a Merthyr employer ready to hire reliable talent, we have your back.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="#candidates"
              className="w-full sm:w-auto px-6 py-3 text-center rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Start No-CV Profile
            </a>
            <a
              href="#employers"
              className="w-full sm:w-auto px-6 py-3 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition-all focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Post a Work Trial
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}