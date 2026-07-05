'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  Briefcase, 
  Users, 
  FileText, 
  BookOpen, 
  PhoneCall, 
  CheckCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Search,
  Filter,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign,
  MapPin,
  Clock,
  UserCheck,
  Building,
  Mail,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react'

// Helper to query the schema safely
function getTable(tableName: string) {
  // If schema helper is available, use it, otherwise fall back
  if (typeof supabase.schema === 'function') {
    return supabase.schema('employeeme_c1b961').from(tableName)
  }
  return supabase.from(tableName)
}

export default function OwnerDashboard() {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'profiles' | 'trials' | 'applications' | 'mentoring' | 'blogs' | 'enquiries'>('overview')

  // Global Loading & Message States
  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Database States
  const [profiles, setProfiles] = useState<any[]>([])
  const [candidateProfiles, setCandidateProfiles] = useState<any[]>([])
  const [employerProfiles, setEmployerProfiles] = useState<any[]>([])
  const [workTrials, setWorkTrials] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [mentorSessions, setMentorSessions] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [employerEnquiries, setEmployerEnquiries] = useState<any[]>([])
  const [generalContactSubmissions, setGeneralContactSubmissions] = useState<any[]>([])

  // Selection / Form States
  const [searchTerm, setSearchTerm] = useState('')
  
  // 1. Profiles Form State
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null)
  const [profileEmail, setProfileEmail] = useState('')
  const [profileRole, setProfileRole] = useState<'candidate' | 'employer' | 'admin'>('candidate')
  const [profileFullName, setProfileFullName] = useState('')
  const [profilePhone, setProfilePhone] = useState('')

  // 2. Candidate Profiles Form State (linked to selected profile or standalone)
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null)
  const [candBio, setCandBio] = useState('')
  const [candSkills, setCandSkills] = useState('') // comma separated
  const [candSectors, setCandSectors] = useState('') // comma separated
  const [candAvailability, setCandAvailability] = useState('')
  const [candHasMentor, setCandHasMentor] = useState<boolean>(false)
  const [candStatus, setCandStatus] = useState<'pending' | 'active'>('pending')

  // 3. Employer Profiles Form State
  const [editingEmployerId, setEditingEmployerId] = useState<string | null>(null)
  const [empCompanyName, setEmpCompanyName] = useState('')
  const [empIndustry, setEmpIndustry] = useState('')
  const [empWebsite, setEmpWebsite] = useState('')
  const [empBio, setEmpBio] = useState('')
  const [empIsVerified, setEmpIsVerified] = useState<boolean>(false)

  // 4. Work Trials Form State
  const [editingTrialId, setEditingTrialId] = useState<string | null>(null)
  const [trialEmployerId, setTrialEmployerId] = useState('')
  const [trialTitle, setTrialTitle] = useState('')
  const [trialDescription, setTrialDescription] = useState('')
  const [trialLocation, setTrialLocation] = useState('')
  const [trialPayRate, setTrialPayRate] = useState('')
  const [trialDuration, setTrialDuration] = useState('')
  const [trialStatus, setTrialStatus] = useState<'draft' | 'active' | 'filled' | 'archived'>('draft')

  // 5. Applications Form State
  const [editingApplicationId, setEditingApplicationId] = useState<string | null>(null)
  const [appTrialId, setAppTrialId] = useState('')
  const [appCandidateId, setAppCandidateId] = useState('')
  const [appStatus, setAppStatus] = useState<'applied' | 'offered' | 'booked' | 'completed' | 'declined'>('applied')

  // 6. Mentor Sessions Form State
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [sessionCandidateId, setSessionCandidateId] = useState('')
  const [sessionMentorName, setSessionMentorName] = useState('')
  const [sessionScheduledAt, setSessionScheduledAt] = useState('')
  const [sessionStatus, setSessionStatus] = useState<'pending' | 'confirmed' | 'completed'>('pending')

  // 7. Blog Posts Form State
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogSlug, setBlogSlug] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogAuthorId, setBlogAuthorId] = useState('')
  const [blogPublishedAt, setBlogPublishedAt] = useState('')

  // 8. Employer Enquiries Status / Form
  const [editingEnquiryId, setEditingEnquiryId] = useState<string | null>(null)
  const [enqCompanyName, setEnqCompanyName] = useState('')
  const [enqContactPerson, setEnqContactPerson] = useState('')
  const [enqIndustry, setEnqIndustry] = useState('')
  const [enqEmail, setEnqEmail] = useState('')
  const [enqPhone, setEnqPhone] = useState('')
  const [enqHiringNeeds, setEnqHiringNeeds] = useState('')

  // Fetch all data from database
  async function fetchAllData() {
    setLoading(true)
    try {
      // Profiles
      const { data: pData, error: pErr } = await getTable('profiles').select('*').order('created_at', { ascending: false })
      if (pErr) throw pErr
      setProfiles(pData || [])

      // Candidate Profiles
      const { data: cpData, error: cpErr } = await getTable('candidate_profiles').select('*').order('created_at', { ascending: false })
      if (cpErr) throw cpErr
      setCandidateProfiles(cpData || [])

      // Employer Profiles
      const { data: epData, error: epErr } = await getTable('employer_profiles').select('*').order('created_at', { ascending: false })
      if (epErr) throw epErr
      setEmployerProfiles(epData || [])

      // Work Trials
      const { data: wtData, error: wtErr } = await getTable('work_trials').select('*').order('created_at', { ascending: false })
      if (wtErr) throw wtErr
      setWorkTrials(wtData || [])

      // Applications
      const { data: aData, error: aErr } = await getTable('applications').select('*').order('created_at', { ascending: false })
      if (aErr) throw aErr
      setApplications(aData || [])

      // Mentor Sessions
      const { data: msData, error: msErr } = await getTable('mentor_sessions').select('*').order('created_at', { ascending: false })
      if (msErr) throw msErr
      setMentorSessions(msData || [])

      // Blog Posts
      const { data: bpData, error: bpErr } = await getTable('blog_posts').select('*').order('created_at', { ascending: false })
      if (bpErr) throw bpErr
      setBlogPosts(bpData || [])

      // Employer Enquiries
      const { data: eeData, error: eeErr } = await getTable('employer_enquiries').select('*').order('created_at', { ascending: false })
      if (eeErr) throw eeErr
      setEmployerEnquiries(eeData || [])

      // General Contact Submissions
      const { data: gcData, error: gcErr } = await getTable('general_contact_submissions').select('*').order('created_at', { ascending: false })
      if (gcErr) throw gcErr
      setGeneralContactSubmissions(gcData || [])

    } catch (err: any) {
      console.error('Error fetching data:', err)
      triggerNotification(err.message || 'Failed to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // Helper to trigger notification banner
  function triggerNotification(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // ----------------------------------------------------
  // QUICK SEED DATA BUTTON - Extremely helpful for testing & evaluation
  // ----------------------------------------------------
  async function seedSampleData() {
    setActionLoading(true)
    try {
      // 1. Create candidate profile if none exist
      const sampleCandidateId = 'aa11bb22-cc33-dd44-ee55-ff66aa77bb88'
      const sampleEmployerId = 'bb22cc33-dd44-ee55-ff66-aa77bb88cc99'
      const sampleAdminId = 'cc33dd44-ee55-ff66-aa77-bb88cc99dd00'

      // Upsert sample profiles
      const { error: p1 } = await getTable('profiles').upsert([
        { id: sampleCandidateId, email: 'connor.jenkins@gurnos.co.uk', role: 'candidate', full_name: 'Connor Jenkins', phone: '07700 900011' },
        { id: sampleEmployerId, email: 'david@valleysconstruction.co.uk', role: 'employer', full_name: 'David Evans', phone: '07700 900077' },
        { id: sampleAdminId, email: 'admin@employeeme.org', role: 'admin', full_name: 'Sian Davies', phone: '01685 725000' }
      ])

      if (p1) throw p1

      // Candidate Profile
      await getTable('candidate_profiles').upsert([
        { 
          profile_id: sampleCandidateId, 
          bio: 'I like working with my hands and fixing things. I want to learn a trade like carpentry or bricklaying. I am reliable and ready to work hard.', 
          skills: ['Always on time', 'Good with hands', 'Heavy lifting & physical labor'], 
          preferred_sectors: ['Construction & Building', 'Warehouse & Packing'], 
          availability: 'Weekdays (Mon-Fri)', 
          has_mentor: true, 
          status: 'active' 
        }
      ])

      // Employer Profile
      await getTable('employer_profiles').upsert([
        { 
          profile_id: sampleEmployerId, 
          company_name: 'Valleys Construction Ltd', 
          industry: 'Construction & Trades', 
          website: 'https://valleysconstruction.co.uk', 
          bio: 'We build high-quality homes and commercial spaces across Merthyr Tydfil. Proud partner of employeeme since 2024.', 
          is_verified: true 
        }
      ])

      // Work Trial
      const { data: wtData, error: wtErr } = await getTable('work_trials').insert([
        {
          employer_id: sampleEmployerId,
          title: 'Junior Site Assistant',
          description: 'Helping clear materials on a local building site, moving tools, and learning basic trade skills from experienced builders in Gurnos.',
          location: 'Gurnos, Merthyr Tydfil',
          pay_rate: 12.00,
          duration: '2-Day Paid Trial',
          status: 'active'
        },
        {
          employer_id: sampleEmployerId,
          title: 'Warehouse & Packing Assistant',
          description: 'Unpacking deliveries, checking stock items, and packing orders into cardboard shipping boxes.',
          location: 'Pentrebach, Merthyr Tydfil',
          pay_rate: 11.50,
          duration: '3-Day Paid Trial',
          status: 'draft'
        }
      ]).select()

      if (wtErr) throw wtErr

      // Application
      if (wtData && wtData[0]) {
        await getTable('applications').insert([
          {
            trial_id: wtData[0].id,
            candidate_id: sampleCandidateId,
            status: 'applied'
          }
        ])
      }

      // Mentor Session
      await getTable('mentor_sessions').insert([
        {
          candidate_id: sampleCandidateId,
          mentor_name: 'Liam',
          scheduled_at: '2024-10-24T14:00:00Z',
          status: 'confirmed'
        }
      ])

      // Blog Post
      await getTable('blog_posts').insert([
        {
          title: 'How Connor went from no qualifications to a full-time building job in Gurnos',
          slug: 'connor-success-story',
          content: 'Connor spent months sending off CVs and never heard back. On employeeme, he built a profile in minutes, got matched with Sian, and did a two-day trial at Valleys Construction...',
          author_id: sampleAdminId,
          published_at: '2024-10-12T09:00:00Z'
        }
      ])

      // Employer Enquiry
      await getTable('employer_enquiries').insert([
        {
          company_name: 'The Castle Cafe',
          contact_person: 'Sarah Jenkins',
          industry: 'Hospitality',
          email: 'sarah@castlecafe-merthyr.co.uk',
          phone: '07700 900222',
          hiring_needs: 'Need Front of House support and kitchen helpers for weekend shifts.'
        }
      ])

      // General Contact Submission
      await getTable('general_contact_submissions').insert([
        {
          name: 'Dylan Thomas',
          email: 'dylan@gmail.com',
          message: 'Hi, I am 18 and live in Dowlais. I want to match with a mentor to help me look for a warehouse job. Thanks!'
        }
      ])

      triggerNotification('Sample data successfully seeded!', 'success')
      fetchAllData()
    } catch (err: any) {
      console.error(err)
      triggerNotification(err.message || 'Failed to seed sample data', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // ----------------------------------------------------
  // CRUD ACTIONS
  // ----------------------------------------------------

  // 1. Profiles CRUD
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!profileEmail) return triggerNotification('Email is required', 'error')
    setActionLoading(true)
    try {
      const payload = {
        email: profileEmail,
        role: profileRole,
        full_name: profileFullName,
        phone: profilePhone
      }

      if (editingProfileId) {
        const { error } = await getTable('profiles').update(payload).eq('id', editingProfileId)
        if (error) throw error
        triggerNotification('Profile updated successfully', 'success')
      } else {
        const { error } = await getTable('profiles').insert([payload])
        if (error) throw error
        triggerNotification('Profile created successfully', 'success')
      }

      // Reset form
      setEditingProfileId(null)
      setProfileEmail('')
      setProfileRole('candidate')
      setProfileFullName('')
      setProfilePhone('')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving profile', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteProfile(id: string) {
    if (!confirm('Are you sure you want to delete this profile? All linked candidate/employer data will be deleted too.')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('profiles').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Profile deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting profile', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 2. Candidate Profile Upsert / Edit
  async function handleSaveCandidateProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!editingCandidateId) return triggerNotification('No profile ID associated', 'error')
    setActionLoading(true)
    try {
      const skillsArray = candSkills.split(',').map(s => s.trim()).filter(Boolean)
      const sectorsArray = candSectors.split(',').map(s => s.trim()).filter(Boolean)

      const payload = {
        bio: candBio,
        skills: skillsArray,
        preferred_sectors: sectorsArray,
        availability: candAvailability,
        has_mentor: candHasMentor,
        status: candStatus
      }

      const { error } = await getTable('candidate_profiles').upsert({
        profile_id: editingCandidateId,
        ...payload
      })

      if (error) throw error
      triggerNotification('Candidate details updated successfully', 'success')
      setEditingCandidateId(null)
      setCandBio('')
      setCandSkills('')
      setCandSectors('')
      setCandAvailability('')
      setCandHasMentor(false)
      setCandStatus('pending')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving candidate details', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 3. Employer Profile Upsert / Edit
  async function handleSaveEmployerProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!editingEmployerId) return triggerNotification('No profile ID associated', 'error')
    setActionLoading(true)
    try {
      const payload = {
        company_name: empCompanyName,
        industry: empIndustry,
        website: empWebsite,
        bio: empBio,
        is_verified: empIsVerified
      }

      const { error } = await getTable('employer_profiles').upsert({
        profile_id: editingEmployerId,
        ...payload
      })

      if (error) throw error
      triggerNotification('Employer details updated successfully', 'success')
      setEditingEmployerId(null)
      setEmpCompanyName('')
      setEmpIndustry('')
      setEmpWebsite('')
      setEmpBio('')
      setEmpIsVerified(false)
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving employer details', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 4. Work Trials CRUD
  async function handleSaveWorkTrial(e: React.FormEvent) {
    e.preventDefault()
    if (!trialTitle || !trialEmployerId || !trialPayRate) {
      return triggerNotification('Title, Employer, and Pay Rate are required', 'error')
    }
    setActionLoading(true)
    try {
      const payload = {
        employer_id: trialEmployerId,
        title: trialTitle,
        description: trialDescription,
        location: trialLocation,
        pay_rate: parseFloat(trialPayRate),
        duration: trialDuration,
        status: trialStatus
      }

      if (editingTrialId) {
        const { error } = await getTable('work_trials').update(payload).eq('id', editingTrialId)
        if (error) throw error
        triggerNotification('Work trial updated', 'success')
      } else {
        const { error } = await getTable('work_trials').insert([payload])
        if (error) throw error
        triggerNotification('Work trial created', 'success')
      }

      // Reset
      setEditingTrialId(null)
      setTrialTitle('')
      setTrialDescription('')
      setTrialLocation('')
      setTrialPayRate('')
      setTrialDuration('')
      setTrialStatus('draft')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving work trial', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteWorkTrial(id: string) {
    if (!confirm('Are you sure you want to delete this trial? This will also remove any candidate applications for it.')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('work_trials').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Work trial deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting work trial', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 5. Applications CRUD / Status Update
  async function handleSaveApplication(e: React.FormEvent) {
    e.preventDefault()
    if (!appTrialId || !appCandidateId) return triggerNotification('Trial and Candidate are required', 'error')
    setActionLoading(true)
    try {
      const payload = {
        trial_id: appTrialId,
        candidate_id: appCandidateId,
        status: appStatus
      }

      if (editingApplicationId) {
        const { error } = await getTable('applications').update({ status: appStatus }).eq('id', editingApplicationId)
        if (error) throw error
        triggerNotification('Application status updated', 'success')
      } else {
        const { error } = await getTable('applications').insert([payload])
        if (error) throw error
        triggerNotification('Application created successfully', 'success')
      }

      setEditingApplicationId(null)
      setAppTrialId('')
      setAppCandidateId('')
      setAppStatus('applied')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving application', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteApplication(id: string) {
    if (!confirm('Delete this application?')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('applications').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Application deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting application', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Quick Status updates for list items
  async function updateApplicationStatus(id: string, newStatus: 'applied' | 'offered' | 'booked' | 'completed' | 'declined') {
    setActionLoading(true)
    try {
      const { error } = await getTable('applications').update({ status: newStatus }).eq('id', id)
      if (error) throw error
      triggerNotification(`Application status updated to ${newStatus}`, 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error updating status', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 6. Mentor Sessions CRUD
  async function handleSaveMentorSession(e: React.FormEvent) {
    e.preventDefault()
    if (!sessionCandidateId || !sessionMentorName || !sessionScheduledAt) {
      return triggerNotification('Candidate, Mentor name, and Date/time are required', 'error')
    }
    setActionLoading(true)
    try {
      const payload = {
        candidate_id: sessionCandidateId,
        mentor_name: sessionMentorName,
        scheduled_at: sessionScheduledAt,
        status: sessionStatus
      }

      if (editingSessionId) {
        const { error } = await getTable('mentor_sessions').update(payload).eq('id', editingSessionId)
        if (error) throw error
        triggerNotification('Mentor session updated', 'success')
      } else {
        const { error } = await getTable('mentor_sessions').insert([payload])
        if (error) throw error
        triggerNotification('Mentor session scheduled', 'success')
      }

      setEditingSessionId(null)
      setSessionCandidateId('')
      setSessionMentorName('')
      setSessionScheduledAt('')
      setSessionStatus('pending')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving session', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteMentorSession(id: string) {
    if (!confirm('Cancel and delete this mentoring session?')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('mentor_sessions').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Mentor session deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting session', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function updateSessionStatus(id: string, status: 'pending' | 'confirmed' | 'completed') {
    setActionLoading(true)
    try {
      const { error } = await getTable('mentor_sessions').update({ status }).eq('id', id)
      if (error) throw error
      triggerNotification(`Session marked as ${status}`, 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error updating status', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 7. Blog Posts CRUD
  async function handleSaveBlogPost(e: React.FormEvent) {
    e.preventDefault()
    if (!blogTitle || !blogSlug || !blogContent) {
      return triggerNotification('Title, slug, and content are required', 'error')
    }
    setActionLoading(true)
    try {
      const payload = {
        title: blogTitle,
        slug: blogSlug,
        content: blogContent,
        author_id: blogAuthorId || null,
        published_at: blogPublishedAt ? new Date(blogPublishedAt).toISOString() : null
      }

      if (editingBlogId) {
        const { error } = await getTable('blog_posts').update(payload).eq('id', editingBlogId)
        if (error) throw error
        triggerNotification('Blog post updated', 'success')
      } else {
        const { error } = await getTable('blog_posts').insert([payload])
        if (error) throw error
        triggerNotification('Blog post created', 'success')
      }

      setEditingBlogId(null)
      setBlogTitle('')
      setBlogSlug('')
      setBlogContent('')
      setBlogAuthorId('')
      setBlogPublishedAt('')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error saving blog post', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteBlogPost(id: string) {
    if (!confirm('Delete this blog post?')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('blog_posts').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Blog post deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting blog post', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // 8. Delete submissions / enquiries
  async function handleDeleteEnquiry(id: string) {
    if (!confirm('Are you sure you want to delete this employer enquiry?')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('employer_enquiries').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Enquiry deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting enquiry', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDeleteContactSubmission(id: string) {
    if (!confirm('Are you sure you want to delete this contact submission?')) return
    setActionLoading(true)
    try {
      const { error } = await getTable('general_contact_submissions').delete().eq('id', id)
      if (error) throw error
      triggerNotification('Submission deleted', 'success')
      fetchAllData()
    } catch (err: any) {
      triggerNotification(err.message || 'Error deleting submission', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Filtered lists helper
  const filteredProfiles = profiles.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredWorkTrials = workTrials.filter(wt => 
    wt.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    wt.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316] text-white p-2.5 rounded-lg font-bold text-xl tracking-tight flex items-center justify-center">
              eM
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E293B] tracking-tight flex items-center gap-2">
                employeeme <span className="text-[#F97316]">●</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Owner & Management Suite</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={seedSampleData}
              disabled={actionLoading}
              className="bg-[#15803D] hover:bg-[#116430] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${actionLoading ? 'animate-spin' : ''}`} />
              Quick Seed Sample Data
            </button>
            
            <a 
              href="/"
              className="border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-[#1E293B] px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
            >
              View Main Site
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={fetchAllData}
              disabled={loading}
              className="bg-slate-100 hover:bg-slate-200 text-[#1E293B] p-2.5 rounded-lg transition-all"
              title="Refresh database data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>
      </header>

      {/* SYSTEM STATUS BANNER */}
      {message && (
        <div className={`max-w-7xl mx-auto mt-4 mx-4 sm:mx-6 lg:mx-8 p-4 rounded-xl shadow-sm border transition-all duration-300 flex items-start gap-3 ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />}
          <div className="flex-1">
            <p className="text-sm font-semibold">{message.type === 'success' ? 'Action Completed' : 'An Error Occurred'}</p>
            <p className="text-xs opacity-90 mt-0.5">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-bold underline hover:no-underline">Dismiss</button>
        </div>
      )}

      {/* OVERVIEW METRICS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered Profiles</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{profiles.length}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-600 font-bold">● {candidateProfiles.length}</span> candidates, 
                <span className="text-blue-600 font-bold"> {employerProfiles.length}</span> employers
              </p>
            </div>
            <div className="bg-slate-100 p-3 rounded-xl text-slate-700">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Work Trials</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                {workTrials.filter(t => t.status === 'active').length}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Total postings: <span className="font-bold">{workTrials.length}</span>
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl text-[#F97316]">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Applications</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{applications.length}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-[#15803D] font-semibold">
                  {applications.filter(a => a.status === 'booked' || a.status === 'completed').length} Successful / Booked
                </span>
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl text-[#15803D]">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Employer Enquiries</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{employerEnquiries.length}</h3>
              <p className="text-xs text-slate-500 mt-1">
                General contacts: <span className="font-bold">{generalContactSubmissions.length}</span>
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-700">
              <PhoneCall className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>

      {/* DASHBOARD TAB WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* TAB HEADERS */}
          <div className="border-b border-slate-200 bg-slate-50 overflow-x-auto flex">
            <button
              onClick={() => { setActiveTab('overview'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'overview' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Overview & Stats
            </button>

            <button
              onClick={() => { setActiveTab('profiles'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'profiles' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <Users className="w-4 h-4" />
              Users & Profiles ({profiles.length})
            </button>

            <button
              onClick={() => { setActiveTab('trials'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'trials' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Work Trials ({workTrials.length})
            </button>

            <button
              onClick={() => { setActiveTab('applications'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'applications' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Applications ({applications.length})
            </button>

            <button
              onClick={() => { setActiveTab('mentoring'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'mentoring' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Mentoring ({mentorSessions.length})
            </button>

            <button
              onClick={() => { setActiveTab('blogs'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'blogs' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Blog & News ({blogPosts.length})
            </button>

            <button
              onClick={() => { setActiveTab('enquiries'); setSearchTerm('') }}
              className={`px-6 py-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === 'enquiries' ? 'border-[#F97316] text-[#F97316] bg-white' : 'border-transparent text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              Inquiries & Submissions ({employerEnquiries.length + generalContactSubmissions.length})
            </button>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#F97316]" />
              <p className="text-slate-600 mt-3 font-semibold">Fetching latest database tables...</p>
              <p className="text-xs text-slate-400 mt-1">Accessing secure schema: employeeme_c1b961</p>
            </div>
          )}

          {/* TAB CONTENTS */}
          {!loading && (
            <div className="p-6">

              {/* ----------------- TAB: OVERVIEW & SYSTEM HEALTH ----------------- */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-[#1E293B] mb-2 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#F97316]" />
                      Welcome, System Administrator
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      This is the master control dashboard for <strong className="text-[#1E293B]">employeeme</strong> based in Merthyr Tydfil. 
                      You have full capabilities to verify profiles, approve/post paid work trials, connect youth to friendly local mentors, 
                      and review all submitted community enquiries.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button 
                        onClick={() => setActiveTab('trials')} 
                        className="bg-[#F97316] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition"
                      >
                        Manage Active Trials
                      </button>
                      <button 
                        onClick={() => setActiveTab('profiles')} 
                        className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-900 transition"
                      >
                        Verify Candidates ({candidateProfiles.filter(c => c.status === 'pending').length} pending)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Recent Employer Enquiries */}
                    <div className="border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-[#1E293B] flex items-center gap-2">
                          <Building className="w-4 h-4 text-orange-500" />
                          Recent Employer Enquiries
                        </h3>
                        <button onClick={() => setActiveTab('enquiries')} className="text-xs text-[#F97316] font-bold hover:underline">
                          View All ({employerEnquiries.length})
                        </button>
                      </div>

                      {employerEnquiries.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 italic">No employer enquiries received yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {employerEnquiries.slice(0, 3).map((enq) => (
                            <div key={enq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-sm text-slate-800">{enq.company_name}</h4>
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">New</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">Contact: {enq.contact_person} ({enq.email})</p>
                              <p className="text-xs text-slate-700 italic mt-1.5 bg-white p-2 rounded border border-slate-100">&ldquo;{enq.hiring_needs}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pending Candidate Verifications */}
                    <div className="border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-[#1E293B] flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-[#15803D]" />
                          Unverified Candidates Queue
                        </h3>
                        <button onClick={() => setActiveTab('profiles')} className="text-xs text-[#F97316] font-bold hover:underline">
                          Go to Profiles
                        </button>
                      </div>

                      {candidateProfiles.filter(c => c.status === 'pending').length === 0 ? (
                        <div className="bg-emerald-50 text-[#15803D] p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          All candidate profiles have been vetted and activated!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {candidateProfiles.filter(c => c.status === 'pending').slice(0, 3).map((cand) => {
                            const profile = profiles.find(p => p.id === cand.profile_id)
                            return (
                              <div key={cand.profile_id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                                <div>
                                  <h4 className="font-bold text-sm text-slate-800">{profile?.full_name || 'Unnamed Candidate'}</h4>
                                  <p className="text-xs text-slate-500">Email: {profile?.email}</p>
                                  <p className="text-[10px] text-slate-400 mt-1">Sectors: {cand.preferred_sectors?.join(', ') || 'None selected'}</p>
                                </div>
                                <button
                                  onClick={async () => {
                                    setActionLoading(true)
                                    try {
                                      const { error } = await getTable('candidate_profiles').update({ status: 'active' }).eq('profile_id', cand.profile_id)
                                      if (error) throw error
                                      triggerNotification('Candidate activated successfully!', 'success')
                                      fetchAllData()
                                    } catch (e: any) {
                                      triggerNotification(e.message, 'error')
                                    } finally {
                                      setActionLoading(false)
                                    }
                                  }}
                                  className="bg-[#15803D] hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                                >
                                  Verify Now
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* System Architecture Reference */}
                  <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                    <h3 className="font-bold text-sm text-[#1E293B] mb-2 uppercase tracking-wide">Database Architecture (employeeme_c1b961)</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Direct CRUD triggers are active on the following primary tables. This dashboard bypasses CV requirements, establishing direct matching.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">profiles</strong>
                        <span className="text-slate-400">{profiles.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">candidate_profiles</strong>
                        <span className="text-slate-400">{candidateProfiles.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">employer_profiles</strong>
                        <span className="text-slate-400">{employerProfiles.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">work_trials</strong>
                        <span className="text-slate-400">{workTrials.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">applications</strong>
                        <span className="text-slate-400">{applications.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">mentor_sessions</strong>
                        <span className="text-slate-400">{mentorSessions.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">blog_posts</strong>
                        <span className="text-slate-400">{blogPosts.length} records</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <strong className="block text-slate-700">submissions</strong>
                        <span className="text-slate-400">{employerEnquiries.length + generalContactSubmissions.length} records</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* ----------------- TAB: USERS & PROFILES ----------------- */}
              {activeTab === 'profiles' && (
                <div className="space-y-8">
                  
                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search profiles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-slate-50"
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">
                      Showing {filteredProfiles.length} of {profiles.length} profiles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: List of Profiles */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-bold text-[#1E293B] text-base">All Base Users</h3>
                      
                      {filteredProfiles.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                          No profiles match your search filters.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredProfiles.map((p) => {
                            const isCandidate = p.role === 'candidate'
                            const isEmployer = p.role === 'employer'
                            const isEditingThis = editingProfileId === p.id

                            // Match related sub-profile details
                            const candData = candidateProfiles.find(cp => cp.profile_id === p.id)
                            const empData = employerProfiles.find(ep => ep.profile_id === p.id)

                            return (
                              <div 
                                key={p.id} 
                                className={`p-4 rounded-xl border transition-all ${
                                  isEditingThis ? 'border-[#F97316] bg-orange-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-bold text-[#1E293B] text-base">{p.full_name || 'Unnamed User'}</h4>
                                      <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                                        p.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                        p.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                                        'bg-orange-100 text-orange-800'
                                      }`}>
                                        {p.role}
                                      </span>
                                      
                                      {isCandidate && candData && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          candData.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                          {candData.status === 'active' ? 'Verified Profile' : 'Pending Verification'}
                                        </span>
                                      )}

                                      {isEmployer && empData && (
                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                          {empData.is_verified ? 'Verified Partner' : 'Standard Partner'}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">ID: <code className="bg-slate-100 px-1 rounded text-[10px]">{p.id}</code></p>
                                    <p className="text-sm text-slate-600 mt-1.5 flex items-center gap-2">
                                      <span>📧 {p.email}</span>
                                      {p.phone && <span>📞 {p.phone}</span>}
                                    </p>

                                    {/* Sub-profile display */}
                                    {isCandidate && candData && (
                                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 bg-slate-50/50 p-3 rounded-lg">
                                        <p className="text-xs font-bold text-slate-700">No-CV Candidate Details:</p>
                                        <p className="text-xs text-slate-600 italic">&ldquo;{candData.bio || 'No bio entered.'}&rdquo;</p>
                                        <p className="text-xs text-slate-600"><strong>Skills:</strong> {candData.skills?.join(', ') || 'None Listed'}</p>
                                        <p className="text-xs text-slate-600"><strong>Sectors:</strong> {candData.preferred_sectors?.join(', ') || 'None Listed'}</p>
                                        <p className="text-xs text-slate-600"><strong>Availability:</strong> {candData.availability || 'Not specified'}</p>
                                        <p className="text-xs text-slate-600"><strong>Mentor Status:</strong> {candData.has_mentor ? '✅ Matched with Peer Mentor' : '❌ Needs Mentor Match'}</p>
                                        <button
                                          onClick={() => {
                                            setEditingCandidateId(p.id)
                                            setCandBio(candData.bio || '')
                                            setCandSkills(candData.skills?.join(', ') || '')
                                            setCandSectors(candData.preferred_sectors?.join(', ') || '')
                                            setCandAvailability(candData.availability || '')
                                            setCandHasMentor(candData.has_mentor || false)
                                            setCandStatus(candData.status || 'pending')
                                          }}
                                          className="text-[11px] text-[#F97316] font-bold mt-2 hover:underline block"
                                        >
                                          Edit Candidate Specifics →
                                        </button>
                                      </div>
                                    )}

                                    {isCandidate && !candData && (
                                      <div className="mt-2 text-xs text-amber-600 font-medium">
                                        ⚠️ Missing candidate-specific sub-record. 
                                        <button 
                                          onClick={() => {
                                            setEditingCandidateId(p.id)
                                            setCandBio('')
                                            setCandSkills('')
                                            setCandSectors('')
                                            setCandAvailability('')
                                            setCandHasMentor(false)
                                            setCandStatus('pending')
                                          }}
                                          className="underline ml-1 font-bold hover:text-amber-800"
                                        >
                                          Create Sub-record
                                        </button>
                                      </div>
                                    )}

                                    {isEmployer && empData && (
                                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 bg-slate-50/50 p-3 rounded-lg">
                                        <p className="text-xs font-bold text-slate-700">Employer Details:</p>
                                        <p className="text-xs text-slate-600"><strong>Company Name:</strong> {empData.company_name}</p>
                                        <p className="text-xs text-slate-600"><strong>Industry:</strong> {empData.industry || 'N/A'}</p>
                                        <p className="text-xs text-slate-600"><strong>Website:</strong> <a href={empData.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{empData.website || 'N/A'}</a></p>
                                        <p className="text-xs text-slate-600 italic">&ldquo;{empData.bio || 'No bio.'}&rdquo;</p>
                                        <button
                                          onClick={() => {
                                            setEditingEmployerId(p.id)
                                            setEmpCompanyName(empData.company_name || '')
                                            setEmpIndustry(empData.industry || '')
                                            setEmpWebsite(empData.website || '')
                                            setEmpBio(empData.bio || '')
                                            setEmpIsVerified(empData.is_verified || false)
                                          }}
                                          className="text-[11px] text-[#F97316] font-bold mt-2 hover:underline block"
                                        >
                                          Edit Employer Specifics →
                                        </button>
                                      </div>
                                    )}

                                    {isEmployer && !empData && (
                                      <div className="mt-2 text-xs text-amber-600 font-medium">
                                        ⚠️ Missing employer-specific sub-record.
                                        <button 
                                          onClick={() => {
                                            setEditingEmployerId(p.id)
                                            setEmpCompanyName(p.full_name || '')
                                            setEmpIndustry('')
                                            setEmpWebsite('')
                                            setEmpBio('')
                                            setEmpIsVerified(false)
                                          }}
                                          className="underline ml-1 font-bold hover:text-amber-800"
                                        >
                                          Create Sub-record
                                        </button>
                                      </div>
                                    )}

                                  </div>

                                  <div className="flex gap-2 self-stretch sm:self-auto justify-end mt-4 sm:mt-0">
                                    <button
                                      onClick={() => {
                                        setEditingProfileId(p.id)
                                        setProfileEmail(p.email)
                                        setProfileRole(p.role)
                                        setProfileFullName(p.full_name || '')
                                        setProfilePhone(p.phone || '')
                                      }}
                                      className="p-1.5 text-slate-500 hover:text-[#F97316] hover:bg-slate-100 rounded-lg transition"
                                      title="Edit base profile"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProfile(p.id)}
                                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                                      title="Delete entire profile"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Manage Forms */}
                    <div className="space-y-6">
                      
                      {/* Form A: Base Profile Create/Edit */}
                      <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs">
                        <h3 className="font-bold text-[#1E293B] text-base mb-4 flex items-center justify-between">
                          <span>{editingProfileId ? '✏️ Edit Base User' : '➕ Create Base User'}</span>
                          {editingProfileId && (
                            <button 
                              onClick={() => {
                                setEditingProfileId(null)
                                setProfileEmail('')
                                setProfileRole('candidate')
                                setProfileFullName('')
                                setProfilePhone('')
                              }}
                              className="text-xs text-slate-500 hover:underline"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </h3>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g., mail@merthyr.com"
                              value={profileEmail}
                              onChange={(e) => setProfileEmail(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                            <input
                              type="text"
                              placeholder="e.g., Sian Jones"
                              value={profileFullName}
                              onChange={(e) => setProfileFullName(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                            <input
                              type="text"
                              placeholder="e.g., 07700 900011"
                              value={profilePhone}
                              onChange={(e) => setProfilePhone(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">System Role</label>
                            <select
                              value={profileRole}
                              onChange={(e: any) => setProfileRole(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                            >
                              <option value="candidate">Candidate (Youth 16-24)</option>
                              <option value="employer">Employer (Local Business)</option>
                              <option value="admin">Administrator</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition shadow-xs disabled:opacity-50"
                          >
                            {actionLoading ? 'Saving...' : editingProfileId ? 'Update User' : 'Create User'}
                          </button>
                        </form>
                      </div>

                      {/* Form B: Candidate-Specific Sub-record Form */}
                      {editingCandidateId && (
                        <div className="border border-orange-200 rounded-2xl p-6 bg-orange-50/30">
                          <h3 className="font-bold text-[#1E293B] text-sm mb-3 flex items-center justify-between">
                            <span>🛠️ Candidate Details Builder</span>
                            <button onClick={() => setEditingCandidateId(null)} className="text-xs text-slate-500 hover:underline">
                              Close Form
                            </button>
                          </h3>
                          <p className="text-xs text-slate-500 mb-4">Editing extra parameters for user ID: <code className="bg-white px-1 rounded">{editingCandidateId}</code></p>

                          <form onSubmit={handleSaveCandidateProfile} className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Bio</label>
                              <textarea
                                value={candBio}
                                onChange={(e) => setCandBio(e.target.value)}
                                placeholder="What they enjoy doing..."
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Skills (comma-separated)</label>
                              <input
                                type="text"
                                value={candSkills}
                                onChange={(e) => setCandSkills(e.target.value)}
                                placeholder="Always on time, Good with hands, Heavy lifting"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Sectors (comma-separated)</label>
                              <input
                                type="text"
                                value={candSectors}
                                onChange={(e) => setCandSectors(e.target.value)}
                                placeholder="Construction & Building, Hospitality"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Availability</label>
                              <input
                                type="text"
                                value={candAvailability}
                                onChange={(e) => setCandAvailability(e.target.value)}
                                placeholder="Weekdays (Mon-Fri) or Part-time"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div className="flex items-center gap-2 py-1">
                              <input
                                type="checkbox"
                                id="has_mentor"
                                checked={candHasMentor}
                                onChange={(e) => setCandHasMentor(e.target.checked)}
                                className="w-4 h-4 text-[#F97316] focus:ring-[#F97316] border-slate-300 rounded"
                              />
                              <label htmlFor="has_mentor" className="text-xs font-bold text-slate-700 cursor-pointer">Matched with Peer Mentor?</label>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vetting Status</label>
                              <select
                                value={candStatus}
                                onChange={(e: any) => setCandStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              >
                                <option value="pending">Pending Admin Safety Check</option>
                                <option value="active">Active &amp; Verified (Shows on Employer Board)</option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              disabled={actionLoading}
                              className="w-full bg-[#1E293B] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
                            >
                              Save Candidate Sub-details
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Form C: Employer-Specific Sub-record Form */}
                      {editingEmployerId && (
                        <div className="border border-blue-200 rounded-2xl p-6 bg-blue-50/30">
                          <h3 className="font-bold text-[#1E293B] text-sm mb-3 flex items-center justify-between">
                            <span>🏢 Employer Details Builder</span>
                            <button onClick={() => setEditingEmployerId(null)} className="text-xs text-slate-500 hover:underline">
                              Close Form
                            </button>
                          </h3>
                          <p className="text-xs text-slate-500 mb-4">Editing extra parameters for user ID: <code className="bg-white px-1 rounded">{editingEmployerId}</code></p>

                          <form onSubmit={handleSaveEmployerProfile} className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name *</label>
                              <input
                                type="text"
                                required
                                value={empCompanyName}
                                onChange={(e) => setEmpCompanyName(e.target.value)}
                                placeholder="e.g. Valleys Construction Ltd"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Industry</label>
                              <input
                                type="text"
                                value={empIndustry}
                                onChange={(e) => setEmpIndustry(e.target.value)}
                                placeholder="e.g. Construction & Trades"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website URL</label>
                              <input
                                type="text"
                                value={empWebsite}
                                onChange={(e) => setEmpWebsite(e.target.value)}
                                placeholder="https://valleysconstruction.co.uk"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Bio</label>
                              <textarea
                                value={empBio}
                                onChange={(e) => setEmpBio(e.target.value)}
                                placeholder="Tell candidates about your inclusive workplace environment..."
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                              />
                            </div>

                            <div className="flex items-center gap-2 py-1">
                              <input
                                type="checkbox"
                                id="is_verified"
                                checked={empIsVerified}
                                onChange={(e) => setEmpIsVerified(e.target.checked)}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                              />
                              <label htmlFor="is_verified" className="text-xs font-bold text-slate-700 cursor-pointer">Verified Partner Employer?</label>
                            </div>

                            <button
                              type="submit"
                              disabled={actionLoading}
                              className="w-full bg-[#1E293B] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
                            >
                              Save Employer Sub-details
                            </button>
                          </form>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              )}


              {/* ----------------- TAB: WORK TRIALS ----------------- */}
              {activeTab === 'trials' && (
                <div className="space-y-8">
                  
                  {/* Search and stats */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search work trials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-slate-50"
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">
                      Guaranteed minimum wage: £11.44/hr enforced.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* List of Trials */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-bold text-[#1E293B] text-base">Active Opportunities &amp; Paid Shifts</h3>
                      
                      {filteredWorkTrials.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                          No work trials listed. Create one on the right!
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredWorkTrials.map((trial) => {
                            const employer = profiles.find(p => p.id === trial.employer_id)
                            const isEditing = editingTrialId === trial.id
                            const trialApps = applications.filter(a => a.trial_id === trial.id)

                            return (
                              <div 
                                key={trial.id} 
                                className={`p-5 rounded-2xl border transition-all ${
                                  isEditing ? 'border-[#F97316] bg-orange-50/10' : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-extrabold text-[#1E293B] text-base">{trial.title}</h4>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        trial.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                        trial.status === 'draft' ? 'bg-amber-100 text-amber-800' :
                                        'bg-slate-100 text-slate-800'
                                      }`}>
                                        {trial.status.toUpperCase()}
                                      </span>
                                    </div>
                                    
                                    <p className="text-xs text-slate-500 mt-1">
                                      Posted by: <strong className="text-slate-700">{employer?.full_name || 'Unknown Company'}</strong> ({employer?.email})
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-3">
                                      <span className="bg-emerald-50 text-[#15803D] border border-emerald-100 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        £{trial.pay_rate} / Hour
                                      </span>
                                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {trial.location}
                                      </span>
                                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {trial.duration}
                                      </span>
                                    </div>

                                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                                      {trial.description}
                                    </p>

                                    {/* Application mini stats */}
                                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                      <span>Total applications: <strong className="text-slate-800 font-bold">{trialApps.length}</strong></span>
                                      <button 
                                        onClick={() => {
                                          setActiveTab('applications')
                                          setSearchTerm(trial.title)
                                        }}
                                        className="text-[#F97316] font-bold hover:underline"
                                      >
                                        View Applications →
                                      </button>
                                    </div>

                                  </div>

                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => {
                                        setEditingTrialId(trial.id)
                                        setTrialEmployerId(trial.employer_id || '')
                                        setTrialTitle(trial.title)
                                        setTrialDescription(trial.description)
                                        setTrialLocation(trial.location)
                                        setTrialPayRate(String(trial.pay_rate))
                                        setTrialDuration(trial.duration)
                                        setTrialStatus(trial.status)
                                      }}
                                      className="p-1.5 text-slate-500 hover:text-[#F97316] hover:bg-slate-100 rounded-lg transition"
                                      title="Edit Trial"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteWorkTrial(trial.id)}
                                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                                      title="Delete Trial"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Create / Edit Form */}
                    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs self-start">
                      <h3 className="font-bold text-[#1E293B] text-base mb-4 flex items-center justify-between">
                        <span>{editingTrialId ? '✏️ Edit Work Trial' : '➕ Post a Work Trial'}</span>
                        {editingTrialId && (
                          <button 
                            onClick={() => {
                              setEditingTrialId(null)
                              setTrialEmployerId('')
                              setTrialTitle('')
                              setTrialDescription('')
                              setTrialLocation('')
                              setTrialPayRate('')
                              setTrialDuration('')
                              setTrialStatus('draft')
                            }}
                            className="text-xs text-slate-500 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </h3>

                      <form onSubmit={handleSaveWorkTrial} className="space-y-4">
                        
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Associated Employer *</label>
                          <select
                            required
                            value={trialEmployerId}
                            onChange={(e) => setTrialEmployerId(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Select Partner Employer --</option>
                            {profiles.filter(p => p.role === 'employer').map(emp => (
                              <option key={emp.id} value={emp.id}>
                                {emp.full_name || emp.email}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Trial Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Junior Site Assistant"
                            value={trialTitle}
                            onChange={(e) => setTrialTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Gurnos, Merthyr Tydfil"
                            value={trialLocation}
                            onChange={(e) => setTrialLocation(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hourly Pay Rate (£) *</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            placeholder="Min £11.44 per hour"
                            value={trialPayRate}
                            onChange={(e) => setTrialPayRate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">UK National Living Wage guarantee is enforced.</p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Duration</label>
                          <input
                            type="text"
                            placeholder="e.g., 2-Day Paid Trial"
                            value={trialDuration}
                            onChange={(e) => setTrialDuration(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description &amp; Requirements</label>
                          <textarea
                            rows={4}
                            placeholder="Detail what the candidate will be doing..."
                            value={trialDescription}
                            onChange={(e) => setTrialDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                          <select
                            value={trialStatus}
                            onChange={(e: any) => setTrialStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="draft">Draft / Pending Approval</option>
                            <option value="active">Active on Live Board</option>
                            <option value="filled">Filled (Completed)</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition shadow-xs"
                        >
                          {editingTrialId ? 'Update Work Trial' : 'Publish Opportunity'}
                        </button>

                      </form>
                    </div>

                  </div>
                </div>
              )}


              {/* ----------------- TAB: APPLICATIONS ----------------- */}
              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-4">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* List of Applications */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-bold text-[#1E293B] text-base">All Candidate Applications</h3>
                      
                      {applications.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                          No applications have been recorded yet. Candidates can apply with a single click.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {applications
                            .filter(app => {
                              const trial = workTrials.find(t => t.id === app.trial_id)
                              const candidate = profiles.find(p => p.id === app.candidate_id)
                              return (
                                trial?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                candidate?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                            })
                            .map((app) => {
                              const trial = workTrials.find(t => t.id === app.trial_id)
                              const candidate = profiles.find(p => p.id === app.candidate_id)
                              const candDetails = candidateProfiles.find(cp => cp.profile_id === app.candidate_id)

                              return (
                                <div key={app.id} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                                  <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div>
                                      <h4 className="font-extrabold text-[#1E293B] text-base">
                                        {trial ? trial.title : 'Deleted Work Trial'}
                                      </h4>
                                      <p className="text-xs text-slate-500">
                                        Candidate: <strong className="text-slate-800">{candidate?.full_name || 'Unknown'}</strong> ({candidate?.email || 'No email'})
                                      </p>
                                      
                                      {candDetails && (
                                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 my-2 text-xs text-slate-600">
                                          <p className="italic">&ldquo;{candDetails.bio}&rdquo;</p>
                                          <p className="mt-1"><strong>Skills matched:</strong> {candDetails.skills?.join(', ')}</p>
                                        </div>
                                      )}

                                      <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-slate-400">Status:</span>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                          app.status === 'booked' ? 'bg-indigo-100 text-indigo-800' :
                                          app.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                          app.status === 'offered' ? 'bg-blue-100 text-blue-800' :
                                          app.status === 'declined' ? 'bg-red-100 text-red-800' :
                                          'bg-amber-100 text-amber-800'
                                        }`}>
                                          {app.status.toUpperCase()}
                                        </span>
                                      </div>

                                      {/* Quick status actions */}
                                      <div className="mt-3 flex flex-wrap gap-1">
                                        <button 
                                          onClick={() => updateApplicationStatus(app.id, 'booked')}
                                          className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-2.5 py-1 rounded text-xs font-bold transition"
                                        >
                                          Set: Booked Trial
                                        </button>
                                        <button 
                                          onClick={() => updateApplicationStatus(app.id, 'completed')}
                                          className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-2.5 py-1 rounded text-xs font-bold transition"
                                        >
                                          Set: Completed
                                        </button>
                                        <button 
                                          onClick={() => updateApplicationStatus(app.id, 'declined')}
                                          className="bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 px-2.5 py-1 rounded text-xs font-bold transition"
                                        >
                                          Decline
                                        </button>
                                      </div>

                                    </div>

                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => handleDeleteApplication(app.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                                        title="Delete Submission"
                                      >
                                        <Trash2 className="w-4.5 h-4.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      )}
                    </div>

                    {/* Create Application manually */}
                    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs self-start">
                      <h3 className="font-bold text-[#1E293B] text-base mb-4">
                        ➕ Assign Candidate to Trial
                      </h3>
                      <form onSubmit={handleSaveApplication} className="space-y-4">
                        
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Candidate *</label>
                          <select
                            required
                            value={appCandidateId}
                            onChange={(e) => setAppCandidateId(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Select Candidate --</option>
                            {profiles.filter(p => p.role === 'candidate').map(c => (
                              <option key={c.id} value={c.id}>
                                {c.full_name || c.email}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Work Trial *</label>
                          <select
                            required
                            value={appTrialId}
                            onChange={(e) => setAppTrialId(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Select Trial Opportunity --</option>
                            {workTrials.map(wt => (
                              <option key={wt.id} value={wt.id}>
                                {wt.title} ({wt.location})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                          <select
                            value={appStatus}
                            onChange={(e: any) => setAppStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="applied">Applied</option>
                            <option value="offered">Offered Trial</option>
                            <option value="booked">Booked (Trial Scheduled)</option>
                            <option value="completed">Completed (Outcome Pending)</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full bg-[#1E293B] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                        >
                          Create Application
                        </button>

                      </form>
                    </div>

                  </div>
                </div>
              )}


              {/* ----------------- TAB: MENTORING ----------------- */}
              {activeTab === 'mentoring' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Sessions list */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-bold text-[#1E293B] text-base">Scheduled Peer Mentoring Chats</h3>
                      
                      {mentorSessions.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                          No mentoring sessions scheduled yet.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {mentorSessions.map((session) => {
                            const cand = profiles.find(p => p.id === session.candidate_id)
                            return (
                              <div key={session.id} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-extrabold text-slate-800 text-sm">
                                      Mentor: {session.mentor_name}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      Candidate: <strong>{cand?.full_name || 'Unknown'}</strong> ({cand?.email})
                                    </p>
                                    
                                    <p className="text-xs text-slate-700 font-bold mt-2 flex items-center gap-1">
                                      <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                                      Scheduled Date: {session.scheduled_at ? new Date(session.scheduled_at).toLocaleString() : 'N/A'}
                                    </p>

                                    <div className="flex items-center gap-2 mt-3">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        session.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                        session.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                                        'bg-amber-100 text-amber-800'
                                      }`}>
                                        {session.status.toUpperCase()}
                                      </span>

                                      <button 
                                        onClick={() => updateSessionStatus(session.id, 'confirmed')}
                                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold"
                                      >
                                        Confirm
                                      </button>
                                      <button 
                                        onClick={() => updateSessionStatus(session.id, 'completed')}
                                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold"
                                      >
                                        Complete
                                      </button>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => handleDeleteMentorSession(session.id)}
                                    className="p-1 text-slate-400 hover:text-red-600 transition"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Book a Chat Form */}
                    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs self-start">
                      <h3 className="font-bold text-[#1E293B] text-base mb-4">
                        ➕ Book Mentor Session
                      </h3>
                      <form onSubmit={handleSaveMentorSession} className="space-y-4">
                        
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Candidate *</label>
                          <select
                            required
                            value={sessionCandidateId}
                            onChange={(e) => setSessionCandidateId(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Choose Candidate --</option>
                            {profiles.filter(p => p.role === 'candidate').map(c => (
                              <option key={c.id} value={c.id}>
                                {c.full_name || c.email}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assigned Mentor Name *</label>
                          <select
                            required
                            value={sessionMentorName}
                            onChange={(e) => setSessionMentorName(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Choose Mentor --</option>
                            <option value="Liam">Liam (Dowlais - Construction Focus)</option>
                            <option value="Sian">Sian (Gurnos - Hospitality Focus)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Scheduled Date &amp; Time *</label>
                          <input
                            type="datetime-local"
                            required
                            value={sessionScheduledAt}
                            onChange={(e) => setSessionScheduledAt(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                          <select
                            value={sessionStatus}
                            onChange={(e: any) => setSessionStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="pending">Pending Confirmation</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                        >
                          Book Chat
                        </button>

                      </form>
                    </div>

                  </div>
                </div>
              )}


              {/* ----------------- TAB: BLOG POSTS ----------------- */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Blog Posts list */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="font-bold text-[#1E293B] text-base">Published Articles &amp; Success Stories</h3>
                      
                      {blogPosts.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                          No articles found. Add some motivational content!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {blogPosts.map((post) => {
                            const author = profiles.find(p => p.id === post.author_id)
                            return (
                              <div key={post.id} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-extrabold text-slate-800 text-base">{post.title}</h4>
                                    <p className="text-xs text-slate-400">Slug: <code className="bg-slate-100 px-1 rounded">{post.slug}</code></p>
                                    <p className="text-xs text-slate-500 mt-1">Written by: {author?.full_name || 'System Admin'}</p>
                                    
                                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 bg-slate-50 p-2.5 rounded border border-slate-100">
                                      {post.content}
                                    </p>

                                    <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                                      <span>Published: {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</span>
                                    </div>
                                  </div>

                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => {
                                        setEditingBlogId(post.id)
                                        setBlogTitle(post.title)
                                        setBlogSlug(post.slug)
                                        setBlogContent(post.content)
                                        setBlogAuthorId(post.author_id || '')
                                        setBlogPublishedAt(post.published_at ? post.published_at.substring(0, 16) : '')
                                      }}
                                      className="p-1 text-slate-500 hover:text-[#F97316] transition"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBlogPost(post.id)}
                                      className="p-1 text-slate-500 hover:text-red-600 transition"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Blog editor form */}
                    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs self-start">
                      <h3 className="font-bold text-[#1E293B] text-base mb-4 flex items-center justify-between">
                        <span>{editingBlogId ? '✏️ Edit Article' : '➕ Write Article'}</span>
                        {editingBlogId && (
                          <button 
                            onClick={() => {
                              setEditingBlogId(null)
                              setBlogTitle('')
                              setBlogSlug('')
                              setBlogContent('')
                              setBlogAuthorId('')
                              setBlogPublishedAt('')
                            }}
                            className="text-xs text-slate-500 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </h3>

                      <form onSubmit={handleSaveBlogPost} className="space-y-4">
                        
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Post Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="Connor's Success Story in Merthyr"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Slug (URL string) *</label>
                          <input
                            type="text"
                            required
                            placeholder="connor-success-story"
                            value={blogSlug}
                            onChange={(e) => setBlogSlug(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Author *</label>
                          <select
                            required
                            value={blogAuthorId}
                            onChange={(e) => setBlogAuthorId(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
                          >
                            <option value="">-- Select Author --</option>
                            {profiles.filter(p => p.role === 'admin').map(admin => (
                              <option key={admin.id} value={admin.id}>
                                {admin.full_name || admin.email}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Content Text *</label>
                          <textarea
                            required
                            rows={6}
                            placeholder="Write the full body copy of your news article..."
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Publish Date &amp; Time</label>
                          <input
                            type="datetime-local"
                            value={blogPublishedAt}
                            onChange={(e) => setBlogPublishedAt(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Leave empty to save as draft.</p>
                        </div>

                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="w-full bg-[#1E293B] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                        >
                          Save Post
                        </button>

                      </form>
                    </div>

                  </div>
                </div>
              )}


              {/* ----------------- TAB: ENQUIRIES & GENERAL CONTACTS ----------------- */}
              {activeTab === 'enquiries' && (
                <div className="space-y-8">
                  
                  {/* Employer Enquiries List */}
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-[#1E293B] text-lg flex items-center gap-2">
                      <Building className="w-5 h-5 text-[#F97316]" />
                      B2B Employer Enquiries
                    </h3>
                    <p className="text-xs text-slate-500">Submitted through the employer landing pages. Contact these local businesses to onboard them.</p>

                    {employerEnquiries.length === 0 ? (
                      <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                        No employer enquiries received yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {employerEnquiries.map((enq) => (
                          <div key={enq.id} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-bold text-[#1E293B] text-sm">{enq.company_name}</h4>
                              <p className="text-xs text-slate-500">Contact: <strong>{enq.contact_person}</strong></p>
                              {enq.industry && <p className="text-xs text-slate-500">Sector: {enq.industry}</p>}
                              
                              <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                                <strong className="block text-[10px] text-slate-400 uppercase">Hiring Needs:</strong>
                                &ldquo;{enq.hiring_needs || 'No specific requests.'}&rdquo;
                              </div>

                              <div className="mt-3 flex gap-2 text-xs text-slate-500">
                                <a href={`mailto:${enq.email}`} className="text-[#F97316] font-bold hover:underline">📧 Email</a>
                                {enq.phone && <a href={`tel:${enq.phone}`} className="text-slate-600 font-bold hover:underline">📞 {enq.phone}</a>}
                              </div>
                            </div>

                            <button 
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* General Contact Submissions List */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <h3 className="font-extrabold text-[#1E293B] text-lg flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#15803D]" />
                      General Contact &amp; Youth Messages
                    </h3>
                    <p className="text-xs text-slate-500">General enquiries from candidates, parents, or local authority partners.</p>

                    {generalContactSubmissions.length === 0 ? (
                      <div className="p-8 text-center border border-dashed rounded-xl text-slate-400">
                        No general contact submissions.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generalContactSubmissions.map((sub) => (
                          <div key={sub.id} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-bold text-[#1E293B] text-sm">{sub.name}</h4>
                              <p className="text-xs text-[#F97316] font-semibold">{sub.email}</p>
                              
                              <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 mt-2 italic">
                                &ldquo;{sub.message}&rdquo;
                              </p>

                              <p className="text-[10px] text-slate-400 mt-2">
                                Received: {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>

                            <button 
                              onClick={() => handleDeleteContactSubmission(sub.id)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1E293B] text-white py-12 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-extrabold text-lg tracking-tight">employeeme <span className="text-[#F97316]">●</span></p>
              <p className="text-xs text-slate-400 mt-1">Made with pride in Merthyr Tydfil. Supporting young adults into paid careers.</p>
            </div>
            <div className="text-xs text-slate-400 text-center sm:text-right">
              <p>&copy; 2024 employeeme. All rights reserved.</p>
              <p className="mt-1">National Living Wage Guaranteed: £11.44/hr minimum.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}