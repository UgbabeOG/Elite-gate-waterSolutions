/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clipboard, Search, Calendar, Phone, Mail, MapPin, 
  Settings, CheckCircle2, AlertCircle, Copy, Check, ChevronRight, HelpCircle, ArrowRight 
} from 'lucide-react';
import { Booking, ProjectStatus, ServiceType, ClientType } from '../types';

interface BookingPortalProps {
  prefilledInputs?: {
    serviceType: ServiceType;
    clientType: ClientType;
    state: string;
    totalCost: number;
  } | null;
  onClearPrefilled: () => void;
  activeTabRef?: string;
}

export default function BookingPortal({ prefilledInputs, onClearPrefilled, activeTabRef }: BookingPortalProps) {
  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');
  const [searchId, setSearchId] = useState<string>('');
  const [searchedProject, setSearchedProject] = useState<Booking | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form Inputs
  const [formInputs, setFormInputs] = useState({
    clientName: '',
    phone: '',
    email: '',
    location: '',
    state: 'Nasarawa',
    serviceType: 'borehole_drilling' as ServiceType,
    clientType: 'residential' as ClientType,
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState<{ id: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Default Mock Bookings to pre-load
  const defaultBookings: Booking[] = [
    {
      id: 'EG-4081',
      clientName: 'Samson Alacha',
      phone: '08037304834',
      email: 'samsonalacha@gmail.com',
      location: 'Royal Plaza, Opp Building Materials, Mararaba',
      state: 'Nasarawa',
      serviceType: 'solar_borehole',
      clientType: 'residential',
      status: 'completed',
      notes: 'HQ Site demonstration setup. Fully integrated solar MPPT direct pumping array with 5000L tank tower.',
      createdAt: '2026-06-10',
      estimatedCost: 1850000,
      progressPercentage: 100
    },
    {
      id: 'EG-9052',
      clientName: 'Royal Plaza Management',
      phone: '07086031016',
      email: 'royalplaza@gmail.com',
      location: 'Royal Plaza Mararaba',
      state: 'Nasarawa',
      serviceType: 'tank_installation',
      clientType: 'commercial',
      status: 'testing_treatment',
      notes: 'Central gravity feed overhead structural tower reticulation connecting 12 separate shopping plazas.',
      createdAt: '2026-06-28',
      estimatedCost: 950000,
      progressPercentage: 75
    },
    {
      id: 'EG-1104',
      clientName: 'Alhaji Ibrahim',
      phone: '08092003322',
      email: 'ibrahim.farms@yahoo.com',
      location: 'Karu Road, Karshi',
      state: 'FCT / Abuja',
      serviceType: 'borehole_drilling',
      clientType: 'agricultural',
      status: 'drilling_in_progress',
      notes: 'Requires 5" class D casings. Target depth is 220 feet deep into hard basement granite.',
      createdAt: '2026-07-02',
      estimatedCost: 2100000,
      progressPercentage: 35
    }
  ];

  // Initialize Bookings from LocalStorage or pre-load defaults
  useEffect(() => {
    const saved = localStorage.getItem('elite_gate_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        setBookings(defaultBookings);
      }
    } else {
      setBookings(defaultBookings);
      localStorage.setItem('elite_gate_bookings', JSON.stringify(defaultBookings));
    }
  }, []);

  // Watch for active tab scroll/trigger requests
  useEffect(() => {
    if (activeTabRef) {
      setActiveTab(activeTabRef as any);
    }
  }, [activeTabRef]);

  // Handle prefilled options from Quote Estimator
  useEffect(() => {
    if (prefilledInputs) {
      setFormInputs(prev => ({
        ...prev,
        serviceType: prefilledInputs.serviceType,
        clientType: prefilledInputs.clientType,
        state: prefilledInputs.state,
        notes: `Estimated Quote: ₦${prefilledInputs.totalCost.toLocaleString()} NGN.`
      }));
      setActiveTab('book');
    }
  }, [prefilledInputs]);

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('elite_gate_bookings', JSON.stringify(updated));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInputs.clientName || !formInputs.phone || !formInputs.location) return;

    // Generate random EG tracking ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `EG-${randomNum}`;

    // Calculate simulated cost if not already in notes
    let simulatedCost = 1200000;
    if (formInputs.serviceType === 'borehole_rehab') simulatedCost = 250000;
    else if (formInputs.serviceType === 'solar_borehole') simulatedCost = 1950000;
    else if (formInputs.clientType === 'industrial') simulatedCost = 5500000;

    const newBooking: Booking = {
      id: bookingId,
      clientName: formInputs.clientName,
      phone: formInputs.phone,
      email: formInputs.email || 'client@example.com',
      location: formInputs.location,
      state: formInputs.state,
      serviceType: formInputs.serviceType,
      clientType: formInputs.clientType,
      status: 'site_inspection',
      notes: formInputs.notes,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedCost: simulatedCost,
      progressPercentage: 10
    };

    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    setBookingSuccess({ id: bookingId });
    setFormInputs({
      clientName: '',
      phone: '',
      email: '',
      location: '',
      state: 'Nasarawa',
      serviceType: 'borehole_drilling',
      clientType: 'residential',
      notes: ''
    });
    onClearPrefilled();

    // Auto load in search tracker to view immediately
    setSearchId(bookingId);
    setSearchedProject(newBooking);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    const found = bookings.find(b => b.id.toUpperCase().trim() === searchId.toUpperCase().trim());
    if (found) {
      setSearchedProject(found);
      setSearchError(null);
    } else {
      setSearchedProject(null);
      setSearchError(`Tracking ID "${searchId}" not found. Please test pre-loaded IDs: EG-4081, EG-9052, or EG-1104.`);
    }
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateStatus = (id: string, newStatus: ProjectStatus) => {
    // Determine progress percentages for status steps
    const progressMap: Record<ProjectStatus, number> = {
      site_inspection: 10,
      geophysical_survey: 25,
      drilling_in_progress: 45,
      casing_packing: 60,
      pump_installation: 75,
      testing_treatment: 85,
      final_commissioning: 95,
      completed: 100
    };

    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: newStatus,
          progressPercentage: progressMap[newStatus]
        };
      }
      return b;
    });

    saveBookings(updated);

    // If active search, update active view state
    if (searchedProject && searchedProject.id === id) {
      setSearchedProject(prev => prev ? {
        ...prev,
        status: newStatus,
        progressPercentage: progressMap[newStatus]
      } : null);
    }
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    if (searchedProject && searchedProject.id === id) {
      setSearchedProject(null);
    }
  };

  const statusWorkflow: { key: ProjectStatus; title: string; desc: string }[] = [
    { key: 'site_inspection', title: 'Site Inspection', desc: 'Sizing rig clearance & proximity hazards' },
    { key: 'geophysical_survey', title: 'Geophysical Survey', desc: 'Resistivity electrical sounding arrays' },
    { key: 'drilling_in_progress', title: 'Borehole Drilling', desc: 'Rig is hammering basement rocks' },
    { key: 'casing_packing', title: 'Casing & Gravel', desc: 'Lining UPVC screen pipes' },
    { key: 'pump_installation', title: 'Pump Rigging', desc: 'Lowering electrical submersible pump' },
    { key: 'testing_treatment', title: 'Water Chemical Treatment', desc: 'Acidic neutralizers, iron filters' },
    { key: 'final_commissioning', title: 'Commissioning', desc: 'Flow testing, automatic float switches' },
    { key: 'completed', title: 'Completed Well', desc: 'Pristine drinking water flow secured' }
  ];

  return (
    <section id="consultation-portal" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Nav */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/65 p-1 rounded-2xl flex gap-1 border border-slate-300/45">
            <button
              id="btn-tab-book"
              onClick={() => setActiveTab('book')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'book'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📝 Contact &amp; Book Now
            </button>
            <button
              id="btn-tab-track"
              onClick={() => setActiveTab('track')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'track'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📡 Track Live Project
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Work Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: Booking form */}
              {activeTab === 'book' && (
                <motion.div
                  key="tab-book-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* High-Conversion Express Booking Channels */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                    {/* Background Light Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue-light/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-brand-orange font-mono text-[10px] font-bold uppercase tracking-widest bg-brand-orange/15 px-2.5 py-1 rounded-md">
                          ⚡ Express Booking Desk
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-emerald-500/15 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Operations Active
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-4 tracking-tight leading-none uppercase">
                        Book Your Borehole Installation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-blue-light to-brand-orange">
                          Instantly Today
                        </span>
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        Ready to secure your clean water supply? Skip the web form and connect with our Operations Team directly. Click below to instantly launch a secure chat, call, or email to discuss details and secure your slot.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        {/* WhatsApp Card */}
                        <div className="bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.01]">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.185-1.358a9.94 9.94 0 0 0 4.83 1.248h.004c5.507 0 9.991-4.479 9.992-9.986.001-2.67-1.037-5.178-2.927-7.071A9.925 9.925 0 0 0 12.012 2zm5.823 14.15c-.244.686-1.22 1.262-1.684 1.32-.464.057-.923.116-2.977-.696-2.628-1.04-4.303-3.713-4.434-3.886-.13-.174-1.063-1.412-1.063-2.695 0-1.283.673-1.914.912-2.175.24-.26.522-.326.696-.326.174 0 .348.004.498.01.155.006.365-.06.57.442.21.516.718 1.745.78 1.875.062.13.104.283.016.456-.088.174-.13.283-.26.435-.13.152-.274.34-.391.456-.13.13-.268.272-.116.533.152.261.677 1.114 1.45 1.804.996.89 1.83 1.168 2.09 1.298.26.13.412.109.564-.065.153-.174.654-.761.826-1.02.174-.26.348-.217.587-.13.24.087 1.52.717 1.78.847.261.13.435.195.499.304.064.109.064.63-.18 1.316z"/>
                                </svg>
                              </span>
                              <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                Best Response
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-base text-white mt-4">WhatsApp Booking</h4>
                            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                              Instantly launch a direct chat with Engineer Samson Alacha to finalize location mapping, logistics, and pricing.
                            </p>
                          </div>
                          <a
                            href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation%20for%20my%20property.%20Please%20provide%20pricing%20details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-900/20"
                          >
                            Chat on WhatsApp
                          </a>
                        </div>

                        {/* Direct Call Card */}
                        <div className="bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.01]">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                                <Phone className="w-6 h-6" />
                              </span>
                              <span className="text-[9px] font-mono text-blue-400 uppercase font-bold tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">
                                Voice Lines
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-base text-white mt-4">Direct Voice Call</h4>
                            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                              Call our water engineering desk to ask technical questions about soil sounding and casing setups.
                            </p>
                          </div>
                          <div className="space-y-2 mt-6">
                            <a
                              href="tel:08037304834"
                              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-[11px] text-center flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-sm"
                            >
                              Call: 08037304834
                            </a>
                            <a
                              href="tel:07086031016"
                              className="w-full py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-xl text-[10px] text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              Call: 07086031016
                            </a>
                          </div>
                        </div>

                        {/* Email Inquiry Card */}
                        <div className="bg-brand-orange/5 hover:bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.01]">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="p-2.5 bg-brand-orange/20 text-brand-orange rounded-xl">
                                <Mail className="w-6 h-6" />
                              </span>
                              <span className="text-[9px] font-mono text-brand-orange uppercase font-bold tracking-widest bg-brand-orange/10 px-2 py-0.5 rounded-md">
                                Official RFP
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-base text-white mt-4">Email Inquiry</h4>
                            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                              Submit official corporate tenders, engineering designs, or request a written quote proposal.
                            </p>
                          </div>
                          <a
                            href="mailto:samsonalacha@gmail.com?subject=Borehole%20Drilling%20Inquiry%20-%20Elite%20Gate"
                            className="mt-6 w-full py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-brand-orange/10"
                          >
                            Send Email
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Online Survey Form Box */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                    <div className="absolute top-4 right-6 hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 font-mono uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse"></span>
                      Option 2: Web Registry
                    </div>

                    <div className="mb-6">
                      <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
                        // SECURE CALLBACK REGISTER
                      </span>
                      <h3 className="text-xl font-display font-bold text-slate-900 mt-1">
                        Register Your Project Details
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">
                        Prefer us to contact you? Enter your target details below to save your project context. Our team will prepare a structured proposal and follow up with you directly.
                      </p>
                    </div>

                    {bookingSuccess && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 p-5 rounded-2xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="font-display font-bold text-sm">Booking Successfully Submitted!</h4>
                          <p className="text-xs mt-1">Your provisional Tracking ID is <span className="font-mono font-bold text-brand-orange bg-white px-2 py-0.5 rounded-md border border-slate-200">{bookingSuccess.id}</span></p>
                        </div>
                        <button
                          id="btn-view-submitted-project"
                          onClick={() => {
                            setSearchId(bookingSuccess.id);
                            setActiveTab('track');
                            setBookingSuccess(null);
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Track Status Now
                        </button>
                      </div>
                    )}

                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    
                    {/* Basic info row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Full Name / Company Name *</label>
                        <input
                          id="txt-book-name"
                          type="text"
                          required
                          value={formInputs.clientName}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, clientName: e.target.value }))}
                          placeholder="Samson Alacha"
                          className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark focus:ring-1 focus:ring-brand-blue-dark"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Nigerian Phone Lines *</label>
                        <input
                          id="txt-book-phone"
                          type="text"
                          required
                          value={formInputs.phone}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="e.g. 08037304834"
                          className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark focus:ring-1 focus:ring-brand-blue-dark"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Email Address (Optional)</label>
                        <input
                          id="txt-book-email"
                          type="email"
                          value={formInputs.email}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="samsonalacha@gmail.com"
                          className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark focus:ring-1 focus:ring-brand-blue-dark"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Target Location State</label>
                        <select
                          id="select-book-state"
                          value={formInputs.state}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs focus:border-brand-blue-dark focus:ring-1 focus:ring-brand-blue-dark"
                        >
                          <option value="Nasarawa">Nasarawa State</option>
                          <option value="FCT / Abuja">FCT / Abuja</option>
                          <option value="Kaduna">Kaduna State</option>
                          <option value="Plateau">Plateau State</option>
                          <option value="Benue">Benue State</option>
                          <option value="Lagos">Lagos State</option>
                          <option value="Rivers">Rivers State</option>
                          <option value="Delta">Delta State</option>
                          <option value="Kano">Kano State</option>
                        </select>
                      </div>
                    </div>

                    {/* Dropdowns row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Primary Service Required</label>
                        <select
                          id="select-book-service"
                          value={formInputs.serviceType}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, serviceType: e.target.value as ServiceType }))}
                          className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 text-xs focus:border-brand-blue-dark"
                        >
                          <option value="borehole_drilling">Borehole Drilling</option>
                          <option value="solar_borehole">Solar-Powered Well System</option>
                          <option value="water_treatment">Water Filtration &amp; Treatment</option>
                          <option value="tank_installation">Steel Tower Tank Installation</option>
                          <option value="borehole_rehab">Borehole Rehabilitation</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Volume Sector Scale</label>
                        <select
                          id="select-book-client-type"
                          value={formInputs.clientType}
                          onChange={(e) => setFormInputs(prev => ({ ...prev, clientType: e.target.value as ClientType }))}
                          className="w-full p-3 border border-slate-300 bg-white rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark"
                        >
                          <option value="residential">Residential Household</option>
                          <option value="commercial">Commercial Complex</option>
                          <option value="agricultural">Agricultural Farm</option>
                          <option value="industrial">Industrial Plant</option>
                        </select>
                      </div>
                    </div>

                    {/* Physical address input */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Detailed Site Street Address *</label>
                      <input
                        id="txt-book-address"
                        type="text"
                        required
                        value={formInputs.location}
                        onChange={(e) => setFormInputs(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. Suita 206 Royal Plaza opposite building materials, Mararaba"
                        className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark"
                      />
                    </div>

                    {/* Special Notes */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Geological details or special requests</label>
                      <textarea
                        id="txt-book-notes"
                        rows={3}
                        value={formInputs.notes}
                        onChange={(e) => setFormInputs(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="e.g., Neighbors have a hard rocky formation, or need highly prioritized completion within 4 days."
                        className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark"
                      ></textarea>
                    </div>

                    {/* Disclaimer and Submit */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[10px] text-slate-400 max-w-sm text-center sm:text-left leading-relaxed">
                        By submitting, you authorize Elite Gate Multi Enterprises NGD Ltd to compile site logistics and coordinate geologists.
                      </p>
                      <button
                        id="btn-submit-booking-form"
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                      >
                        Submit Consultation Request
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                </div>
              </motion.div>
              )}

              {/* TAB 2: Live Status Tracker */}
              {activeTab === 'track' && (
                <motion.div
                  key="tab-track-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Tracking Search Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                    <div className="mb-6">
                      <span className="text-brand-blue-light font-mono font-semibold tracking-wider text-sm uppercase">
                        // REAL-TIME RADAR
                      </span>
                      <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
                        Borehole Drilling Live Project Tracker
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">
                        Monitor the active chemical and physical engineering phases of your water system installations.
                      </p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          id="txt-track-search-id"
                          type="text"
                          required
                          value={searchId}
                          onChange={(e) => setSearchId(e.target.value)}
                          placeholder="Enter Tracking ID (e.g., EG-4081, EG-9052, EG-1104)"
                          className="w-full p-3 pl-10 border border-slate-300 rounded-xl text-slate-800 text-xs focus:border-brand-blue-dark"
                        />
                      </div>
                      <button
                        id="btn-run-track-search"
                        type="submit"
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        Search
                      </button>
                    </form>

                    {searchError && (
                      <div className="mt-3 flex items-center gap-2 p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-xl text-xs">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{searchError}</span>
                      </div>
                    )}
                  </div>

                  {/* Tracking Status Display Board */}
                  {searchedProject ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                      {/* Sub-header banner */}
                      <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <span className="bg-brand-orange text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-md">
                            Active Project Tracker
                          </span>
                          <h4 className="text-lg font-display font-bold text-white tracking-tight mt-2 flex items-center gap-2">
                            {searchedProject.clientName}
                            <span className="text-slate-400 text-xs font-mono">({searchedProject.id})</span>
                          </h4>
                          <p className="text-slate-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-blue-light" />
                            {searchedProject.location}, {searchedProject.state} State
                          </p>
                        </div>

                        {/* Progress circle gauge */}
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                            <span className="text-xs font-mono font-bold text-brand-blue-light">
                              {searchedProject.progressPercentage}%
                            </span>
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">CURRENT OUTCOME</div>
                            <div className="text-xs font-bold text-white capitalize">
                              {searchedProject.status.replace(/_/g, ' ')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technical Progress workflow lines */}
                      <div className="p-6 sm:p-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100 text-xs">
                          <div className="space-y-2">
                            <div className="text-slate-400 font-mono uppercase text-[9px] font-bold tracking-widest">// CONTRACT SUMMARY</div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Service Category:</span>
                              <span className="font-semibold text-slate-800 capitalize">{searchedProject.serviceType.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Volume Sector:</span>
                              <span className="font-semibold text-slate-800 capitalize">{searchedProject.clientType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Contract Outlay:</span>
                              <span className="font-semibold text-slate-800 font-mono">₦{searchedProject.estimatedCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Date Registered:</span>
                              <span className="font-semibold text-slate-800 font-mono">{searchedProject.createdAt}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-slate-400 font-mono uppercase text-[9px] font-bold tracking-widest">// SURVEY LOGS &amp; REMARKS</div>
                            <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 text-[11px] leading-relaxed italic">
                              "{searchedProject.notes || 'No custom site inspector remarks recorded yet.'}"
                            </p>
                          </div>
                        </div>

                        {/* Workflow Pipeline timeline steps */}
                        <div>
                          <h4 className="text-slate-400 font-mono uppercase text-[9px] font-bold tracking-widest mb-4">// DETAILED QUALITY GATES PIPELINE</h4>
                          
                          <div className="relative border-l border-slate-200 ml-4 space-y-6">
                            {statusWorkflow.map((step, sIdx) => {
                              // Determine step highlight status
                              const isCurrent = searchedProject.status === step.key;
                              // A simple index check to find passed steps
                              const currentStatusIndex = statusWorkflow.findIndex(x => x.key === searchedProject.status);
                              const isPassed = sIdx < currentStatusIndex;
                              const isPending = sIdx > currentStatusIndex;

                              return (
                                <div key={step.key} className="relative pl-6">
                                  {/* Bullet marker node */}
                                  <div className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                                    isCurrent 
                                      ? 'bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/20 animate-pulse' 
                                      : isPassed 
                                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                                        : 'bg-white border-slate-200 text-slate-400'
                                  }`}>
                                    {isPassed ? (
                                      <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                      <span className="text-[10px] font-mono font-bold">{sIdx + 1}</span>
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-display font-bold text-xs ${
                                        isCurrent 
                                          ? 'text-brand-orange font-extrabold text-sm' 
                                          : isPassed 
                                            ? 'text-slate-800' 
                                            : 'text-slate-400'
                                      }`}>
                                        {step.title}
                                      </span>
                                      {isCurrent && (
                                        <span className="bg-brand-orange/10 text-brand-orange text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded-md animate-pulse">
                                          Active Phase
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isCurrent ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                                      {step.desc}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
                      <p>Enter a water project ID above to trace the deep physical drilling depth, soil quality, and filter calibration phases.</p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
                        <span>Try preloaded:</span>
                        <button
                          id="btn-quick-track-1"
                          onClick={() => {
                            setSearchId('EG-4081');
                            const found = bookings.find(b => b.id === 'EG-4081');
                            if (found) setSearchedProject(found);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-2 py-0.5 font-mono cursor-pointer"
                        >
                          EG-4081
                        </button>
                        <button
                          id="btn-quick-track-2"
                          onClick={() => {
                            setSearchId('EG-9052');
                            const found = bookings.find(b => b.id === 'EG-9052');
                            if (found) setSearchedProject(found);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-2 py-0.5 font-mono cursor-pointer"
                        >
                          EG-9052
                        </button>
                        <button
                          id="btn-quick-track-3"
                          onClick={() => {
                            setSearchId('EG-1104');
                            const found = bookings.find(b => b.id === 'EG-1104');
                            if (found) setSearchedProject(found);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-2 py-0.5 font-mono cursor-pointer"
                        >
                          EG-1104
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar Portal Details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Contact details */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-brand-orange font-mono text-[9px] uppercase font-bold tracking-widest bg-brand-orange/10 px-2 py-0.5 rounded-md">
                Direct Contact Lines
              </span>
              <h3 className="font-display font-extrabold text-lg text-white mt-3 leading-tight">
                Connect Directly with our Drilling Operations Team
              </h3>
              
              <div className="mt-6 space-y-4 text-xs">
                <a href="tel:08037304834" className="flex items-start gap-3 hover:text-brand-orange transition-colors group">
                  <Phone className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">08037304834 (HQ Operations)</div>
                    <div className="text-[10px] text-slate-400">Main Engineer Alacha Samson</div>
                  </div>
                </a>

                <a href="tel:07086031016" className="flex items-start gap-3 hover:text-brand-orange transition-colors group">
                  <Phone className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">07086031016 (Billing Desk)</div>
                    <div className="text-[10px] text-slate-400">Provisional Booking Support</div>
                  </div>
                </a>

                <a href="mailto:samsonalacha@gmail.com" className="flex items-start gap-3 hover:text-brand-blue-light transition-colors group">
                  <Mail className="w-4 h-4 text-brand-blue-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">samsonalacha@gmail.com</div>
                    <div className="text-[10px] text-slate-400">Technical RFQs and Contracts</div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-blue-light flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">Royal Plaza, Suite 206</div>
                    <div className="text-[10px] text-slate-400">Opposite Building Materials, Mararaba, Nasarawa State</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/80 my-5"></div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                "Water is life and quality service is our priority. Contact us today for your installations."
              </p>
            </div>

            {/* Sandbox Admin Control board */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              <button
                id="btn-toggle-admin"
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="w-full flex items-center justify-between font-display font-bold text-xs text-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Settings className="w-4 h-4 text-brand-blue-dark animate-spin-slow" />
                  <span>Interactive Admin Sandbox Panel</span>
                </div>
                <span className="text-[10px] text-brand-blue-dark uppercase font-mono">
                  {showAdminPanel ? '[Hide]' : '[Show]'}
                </span>
              </button>

              <AnimatePresence>
                {showAdminPanel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-4 pt-4 mt-3 border-t border-slate-100 text-xs text-slate-600"
                  >
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      This staff controller panel allows you to modify the status of water projects in real time, simulating how the client tracker reacts dynamically.
                    </p>

                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-mono font-bold text-slate-700">{booking.id}</span>
                            <span className="text-slate-500 truncate max-w-[120px]">{booking.clientName}</span>
                          </div>

                          {/* Quick buttons to shift status */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Update Status Phase</label>
                            <select
                              id={`select-admin-status-${booking.id}`}
                              value={booking.status}
                              onChange={(e) => handleUpdateStatus(booking.id, e.target.value as ProjectStatus)}
                              className="w-full p-1.5 border border-slate-300 bg-white rounded-md text-[10px] text-slate-800 font-medium"
                            >
                              <option value="site_inspection">01. Site Inspection</option>
                              <option value="geophysical_survey">02. Geophysical Survey</option>
                              <option value="drilling_in_progress">03. Borehole Drilling</option>
                              <option value="casing_packing">04. Casing &amp; Gravel Packing</option>
                              <option value="pump_installation">05. Pump Installation</option>
                              <option value="testing_treatment">06. Water Quality &amp; Treatment</option>
                              <option value="final_commissioning">07. Final Commissioning</option>
                              <option value="completed">08. Completed &amp; Certified</option>
                            </select>
                          </div>

                          <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                            <button
                              id={`btn-admin-copy-${booking.id}`}
                              onClick={() => copyToClipboard(booking.id)}
                              className="text-brand-blue-dark hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === booking.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                              Copy ID
                            </button>
                            <button
                              id={`btn-admin-delete-${booking.id}`}
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-brand-red hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
