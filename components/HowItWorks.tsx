'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  User, 
  Coffee, 
  Briefcase, 
  ChevronRight, 
  AlertCircle, 
  Loader2,
  CheckCircle2,
  Building2,
  Users,
  ShieldCheck
} from 'lucide-react';

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer'>('candidate');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Always on time (Punctual)', 'Good with hands (Practical)']);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Construction & Building']);
  
  // Interactive Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('I like working with my hands and fixing things. I want to learn a trade. I am reliable and ready to work hard.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const availableSkills = [
    'Always on time (Punctual)',
    'Good with hands (Practical)',
    'Friendly with customers',
    'Heavy lifting & physical labor',
    'Working with computers'
  ];

  const availableSectors = [
    'Construction & Building',
    'Cafe & Restaurant Work',
    'Warehouse & Packing',
    'Retail & Customer Support'
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Insert into profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            email,
            full_name: fullName,
            phone,
            role: 'candidate'
          }
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      if (profile) {
        // 2. Insert into candidate_profiles
        const { error: candidateError } = await supabase
          .from('candidate_profiles')
          .insert([
            {
              profile_id: profile.id,
              bio,
              skills: selectedSkills,
              preferred_sectors: selectedSectors,
              availability: 'Weekdays (Mon-Fri)',
              has_mentor: true,
              status: 'active'
            }
          ]);

        if (candidateError) throw candidateError;

        // 3. Insert a mock mentor session to match them with Sian
        await supabase
          .from('mentor_sessions')
          .insert([
            {
              candidate_id: profile.id,
              mentor_name: 'Sian',
              scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
              status: 'pending'
            }
          ]);
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const candidateSteps = [
    {
      number: '1',
      title: 'Build a profile without writing a CV',
      description: "You don't need a CV. Just tick boxes to show what you are good at—like working with your hands, talking to people, or turning up on time.",
      icon: User,
      badge: 'Takes 3 minutes'
    },
    {
      number: '2',
      title: 'Get matched with a friendly local mentor',
      description: 'A peer mentor is a young person from Merthyr who knows what it is like. They will meet you for a free coffee, chat about what you want to do, and make sure you are ready for day one.',
      icon: Coffee,
      badge: 'Redhouse Hub, Merthyr'
    },
    {
      number: '3',
      title: 'Do a paid work trial and get hired',
      description: 'Instead of an interview, you work a short trial (usually 1 to 3 days). You get paid at least £11.44 for every hour. If you do a good job, the business can hire you permanently.',
      icon: Briefcase,
      badge: '85% success rate'
    }
  ];

  const employerSteps = [
    {
      number: '1',
      title: 'Post a low-risk paid work trial',
      description: 'Skip traditional job boards and irrelevant CVs. Describe the basic tasks and set an hourly wage (minimum £11.44/hr). Free to post.',
      icon: Building2,
      badge: 'Zero placement fees'
    },
    {
      number: '2',
      title: 'Match with pre-vetted local talent',
      description: 'Our team matches you with candidates who are supported by a dedicated local mentor. The mentor ensures they show up on time and prepared.',
      icon: Users,
      badge: 'Pre-vetted for attitude'
    },
    {
      number: '3',
      title: 'See them work, then hire permanently',
      description: 'Assess their real-world fit during a short 1 to 3 day trial. If it is a match, transition them to permanent staff with zero buyout or agency fees.',
      icon: ShieldCheck,
      badge: 'No contracts or catch'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 text-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-100 px-3 py-1.5 rounded-full inline-block mb-4">
            Simple Pathway to Work
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Getting a job in Merthyr shouldn't be a struggle.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-sans leading-relaxed">
            We've replaced long applications and stressful interviews with direct, paid work trials. Choose your path below to see how easy it is.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-200 p-1.5 rounded-xl inline-flex shadow-inner">
            <button
              onClick={() => setActiveTab('candidate')}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'candidate'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>For Candidates (16-24)</span>
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'employer'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Local Employers</span>
            </button>
          </div>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 relative">
          <AnimatePresence mode="wait">
            {(activeTab === 'candidate' ? candidateSteps : employerSteps).map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={`${activeTab}-${step.number}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm hover:border-orange-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-5xl font-black text-orange-500 tracking-tight">
                        {step.number}
                      </span>
                      <div className="p-3 bg-slate-100 rounded-xl text-slate-800 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Badge */}
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-4 uppercase tracking-wider">
                      {step.badge}
                    </span>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting indicator */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Live Interactive Playground (Step 1 Demonstration) */}
        {activeTab === 'candidate' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-slate-800 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Interactive Inputs */}
              <div className="lg:col-span-7">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="text-orange-500 w-5 h-5" />
                  <span className="text-orange-500 font-bold text-sm uppercase tracking-wider">Interactive Preview</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
                  Try Step 1: Build Your No-CV Profile
                </h3>
                <p className="text-slate-300 mb-8 text-base">
                  See how it works right now. Tap your skills, write a quick sentence about yourself, and preview the profile that local Merthyr employers will see.
                </p>

                <form onSubmit={handleSubmitProfile} className="space-y-6">
                  {/* Skill Picker */}
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      1. Select your key strengths (No qualifications needed!):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => {
                        const selected = selectedSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                              selected
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {selected && <Check className="w-3 h-3 inline mr-1" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sectors Picker */}
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      2. What sectors do you want to try?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSectors.map((sector) => {
                        const selected = selectedSectors.includes(sector);
                        return (
                          <button
                            type="button"
                            key={sector}
                            onClick={() => toggleSector(sector)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                              selected
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {selected && <Check className="w-3 h-3 inline mr-1" />}
                            {sector}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Short Bio */}
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      3. Short Bio (Tell us what you enjoy doing):
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="Write a brief intro..."
                    />
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Connor Jenkins"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="connor@example.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07700 900077"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-900/40 border border-red-500 text-red-200 p-3 rounded-lg text-sm flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Profile...</span>
                      </>
                    ) : submitSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Profile Saved!</span>
                      </>
                    ) : (
                      <>
                        <span>Save Profile & Match with Mentor</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Live Profile Preview Card */}
              <div className="lg:col-span-5">
                <div className="bg-white text-slate-800 rounded-2xl p-6 border-4 border-orange-500 shadow-2xl relative">
                  
                  {/* Watermark/Stamp */}
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest border border-green-300">
                    Live Preview
                  </div>

                  <div className="border-b pb-4 mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">employeeme profile</p>
                    <h4 className="text-xl font-black text-slate-900 mt-1">
                      {fullName || 'Your Name Here'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {phone || 'No Phone Entered'} • {email || 'No Email Entered'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">My Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkills.length > 0 ? (
                          selectedSkills.map((skill) => (
                            <span key={skill} className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No strengths selected yet</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sectors I Want to Try</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedSectors.length > 0 ? (
                          selectedSectors.map((sector) => (
                            <span key={sector} className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded">
                              {sector}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No sectors selected yet</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">About Me</p>
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed">
                        "{bio || 'I am ready to show what I can do.'}"
                      </p>
                    </div>

                    <div className="pt-2 border-t flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">Assigned Mentor</p>
                        <p className="text-xs font-bold text-slate-800">Sian, 21 (Gurnos)</p>
                      </div>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-extrabold uppercase">
                        Guaranteed £11.44+/hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post-Submit Success Modal Overlay */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-slate-900/95 flex flex-col justify-center items-center text-center p-6 rounded-2xl z-20"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                        <Check className="w-8 h-8 text-white stroke-[3]" />
                      </div>
                      <h4 className="text-2xl font-black text-white mb-2">Awesome, Profile Saved!</h4>
                      <p className="text-sm text-slate-300 max-w-sm mb-6">
                        We have registered your details. Your assigned mentor, <strong>Sian</strong>, will reach out to you via text within 24 hours to set up a friendly coffee chat at the Redhouse Hub!
                      </p>
                      <button 
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFullName('');
                          setEmail('');
                          setPhone('');
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition duration-200"
                      >
                        Create Another Profile
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}

        {/* Employer Info Block */}
        {activeTab === 'employer' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-slate-800 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-100/10 px-3 py-1.5 rounded-full inline-block mb-4">
                No Recruitment Agency Fees
              </span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
                Ready to try a better way of hiring?
              </h3>
              <p className="text-slate-300 mb-8 text-base leading-relaxed">
                Join local Merthyr Tydfil businesses who have stopped reading CVs and started seeing people work. Post your first trial for free. You only pay the candidate’s hourly wage (minimum £11.44/hr) during the trial phase.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="#employer-form"
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Post a Work Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pricing"
                  className="w-full sm:w-auto border-2 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold px-8 py-4 rounded-xl transition duration-200 flex items-center justify-center text-sm"
                >
                  View Pricing & Partnership
                </a>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}