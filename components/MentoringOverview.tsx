'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { 
  User, 
  MapPin, 
  Phone, 
  Video, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Coffee, 
  ChevronRight, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Loader2,
  Check
} from 'lucide-react';

interface Mentor {
  name: string;
  age: number;
  location: string;
  bio: string;
  specialism: string;
  imageUrl: string;
}

const mentors: Mentor[] = [
  {
    name: 'Liam',
    age: 22,
    location: 'Dowlais',
    bio: '"I struggled to find work after leaving school with no GCSEs. I felt stuck. Now, I help other guys in Merthyr build their confidence and get into trades. I can help you plan your travel and get ready for your first day."',
    specialism: 'Construction & Logistics',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sian',
    age: 21,
    location: 'Gurnos',
    bio: '"Anxiety kept me from applying for jobs for two years. Once I got support, everything clicked. I love helping people who feel nervous about their first day in a busy shop or cafe. We will take it one step at a time."',
    specialism: 'Hospitality & Customer Support',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  }
];

const steps = [
  {
    id: '01',
    title: 'Get Matched Automatically',
    body: 'As soon as you create your profile, we match you with an active mentor living near you in Merthyr.',
  },
  {
    id: '02',
    title: 'Have a Casual Chat',
    body: 'Meet at our Redhouse hub for a free coffee, jump on a quick phone call, or chat over video. You decide. No pressure.',
  },
  {
    id: '03',
    title: 'Get Ready for Your Trial',
    body: 'Your mentor will help you practice what to say, plan how to get to the job on time, and make sure you feel confident.',
  },
  {
    id: '04',
    title: 'Stay Supported',
    body: 'Even after you start your job, your mentor will keep checking in to make sure you are doing well and enjoying the work.',
  }
];

const dateSlots = [
  'Tuesday, Oct 24th',
  'Wednesday, Oct 25th',
  'Thursday, Oct 26th',
  'Friday, Oct 27th'
];

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '2:00 PM - 3:00 PM',
  '3:30 PM - 4:30 PM'
];

export function MentoringOverview() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('First Available Mentor');
  const [chatLocation, setChatLocation] = useState('Redhouse Hub (High St, Merthyr Tydfil)');
  const [selectedDate, setSelectedDate] = useState(dateSlots[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[2]);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (!fullName || !email || !phone) {
      setErrorMsg('Please fill in your name, email, and phone number so we can text you.');
      setLoading(false);
      return;
    }

    try {
      // 1. Create candidate profile in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: email.trim(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          role: 'candidate'
        })
        .select()
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      // 2. Schedule the mentor session
      // Combine date and time to dummy ISO string for storage compatibility
      const dummyDate = '2024-10-24T14:00:00Z'; // Hardcoded representative timestamp matching slot

      const { error: sessionError } = await supabase
        .from('mentor_sessions')
        .insert({
          candidate_id: profileData.id,
          mentor_name: selectedMentor,
          scheduled_at: dummyDate,
          status: 'pending'
        });

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mentoring" className="bg-slate-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 5.1: HERO SECTION */}
        <div className="relative mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" />
            Free Local Support
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-6 font-display">
            Meet a local mentor who <span className="text-orange-500">has your back.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            You don’t have to do this alone. Our mentors are young people from Merthyr who have been in your shoes. They know how stressful starting a new job can be.
          </p>
          <div className="mt-8 flex justify-center">
            <a 
              href="#book-chat" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Book a Free Chat with a Mentor
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* SECTION 5.2: HOW MENTORING WORKS */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 font-display">
              How Mentoring Works
            </h3>
            <p className="text-slate-500 mt-2">Simple, friendly support designed around what you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-5xl font-extrabold text-orange-500/20 font-display mb-4">
                    {step.id}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2 font-display">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 text-slate-300">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 5.3: MEET THE MENTORS */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 font-display">
              Meet the Mentors
            </h3>
            <p className="text-slate-500 mt-2">Real people from Merthyr Tydfil who are here to help you succeed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mentors.map((mentor, idx) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-48 h-64 md:h-auto min-h-[220px]">
                  <img 
                    src={mentor.imageUrl} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-4 left-4 text-white md:hidden">
                    <span className="font-bold text-lg">{mentor.name}, {mentor.age}</span>
                    <span className="block text-xs text-orange-200">from {mentor.location}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="hidden md:flex items-baseline justify-between mb-2">
                      <h4 className="text-xl font-bold text-slate-800 font-display">
                        {mentor.name}, <span className="text-slate-500 font-medium">{mentor.age}</span>
                      </h4>
                      <span className="text-xs font-semibold text-slate-400">from {mentor.location}</span>
                    </div>

                    <div className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-md mb-4 border border-orange-100">
                      {mentor.specialism}
                    </div>

                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      {mentor.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <Coffee className="w-4 h-4 text-orange-500" />
                    <span>Ready to meet at the Redhouse Hub</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 5.4: MENTORING BOOKING FORM */}
        <div id="book-chat" className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700/50 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                BOOK A CHAT WITH A MENTOR
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Select your preferences and we will text you to confirm. No pressure, just a friendly chat.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form 
                  key="booking-form"
                  onSubmit={handleBooking} 
                  className="space-y-6 relative"
                >
                  {/* Contact details */}
                  <div className="bg-slate-900/50 p-4 sm:p-6 rounded-2xl border border-slate-700/60 space-y-4">
                    <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider">Your Details</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Connor Jenkins" 
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (For Text Confirm)</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 07700 900077" 
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. connor@gurnos.co.uk" 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                      />
                    </div>
                  </div>

                  {/* 1. Choose a Mentor */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-400 uppercase tracking-wider">
                      1. Choose a Mentor:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'First Available Mentor', label: 'First Available', desc: 'Fastest response' },
                        { id: 'Liam', label: 'Liam', desc: 'Trades & Warehouse' },
                        { id: 'Sian', label: 'Sian', desc: 'Hospitality & Customer' }
                      ].map((mentorOption) => (
                        <button
                          key={mentorOption.id}
                          type="button"
                          onClick={() => setSelectedMentor(mentorOption.id)}
                          className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                            selectedMentor === mentorOption.id 
                              ? 'bg-orange-500/10 border-orange-500 text-white ring-2 ring-orange-500/20' 
                              : 'bg-slate-900/30 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span className="font-bold text-sm flex items-center justify-between w-full">
                            {mentorOption.label}
                            {selectedMentor === mentorOption.id && (
                              <Check className="w-4 h-4 text-orange-500" />
                            )}
                          </span>
                          <span className="text-xs text-slate-400 mt-1">{mentorOption.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Where would you like to chat? */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-400 uppercase tracking-wider">
                      2. Where would you like to chat?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'Redhouse Hub (High St, Merthyr Tydfil)', label: 'Redhouse Hub', icon: Coffee, desc: 'Free coffee' },
                        { id: 'Phone Call', label: 'Phone Call', icon: Phone, desc: 'We call you' },
                        { id: 'Video Call (Google Meet)', label: 'Video Call', icon: Video, desc: 'Google Meet link' }
                      ].map((locationOption) => {
                        const Icon = locationOption.icon;
                        return (
                          <button
                            key={locationOption.id}
                            type="button"
                            onClick={() => setChatLocation(locationOption.id)}
                            className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                              chatLocation === locationOption.id 
                                ? 'bg-orange-500/10 border-orange-500 text-white ring-2 ring-orange-500/20' 
                                : 'bg-slate-900/30 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${
                              chatLocation === locationOption.id ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-sm block">{locationOption.label}</span>
                              <span className="text-xs text-slate-400">{locationOption.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Pick a Day & Time */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-400 uppercase tracking-wider">
                      3. Pick a Day & Time:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Select Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm appearance-none cursor-pointer"
                          >
                            {dateSlots.map(date => (
                              <option key={date} value={date} className="bg-slate-800">{date}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Select Time Slot</label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm appearance-none cursor-pointer"
                          >
                            {timeSlots.map(time => (
                              <option key={time} value={time} className="bg-slate-800">{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-xl flex items-start gap-3 text-sm">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-extrabold text-base py-4 px-6 rounded-xl transition duration-200 shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving Your Profile & Booking...
                      </>
                    ) : (
                      <>
                        Book My Chat
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white font-display">You are booked in!</h4>
                    <p className="text-slate-300 max-w-md mx-auto text-sm">
                      Awesome, <span className="text-white font-semibold">{fullName}</span>. We've set up your profile and requested your chat with <span className="text-orange-400 font-semibold">{selectedMentor}</span>.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 max-w-md mx-auto rounded-2xl p-5 border border-slate-700/50 text-left space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Mentor:</span>
                      <span className="font-semibold text-white">{selectedMentor}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Where:</span>
                      <span className="font-semibold text-white">{chatLocation}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-400">When:</span>
                      <span className="font-semibold text-white">{selectedDate} @ {selectedTime}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We will send a text confirmation to <span className="text-white">{phone}</span> shortly. If you need to change anything, just text us back.
                  </p>

                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                    }}
                    className="text-xs text-orange-400 hover:text-orange-300 underline font-semibold transition"
                  >
                    Book another session or change details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}