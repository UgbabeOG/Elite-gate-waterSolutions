/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Phone, Mail, MapPin, ExternalLink, ChevronRight, CheckCircle2, 
  Sparkles, ShieldCheck, Sun, HelpCircle, Activity, ClipboardCheck,
  MessageSquare, X
} from 'lucide-react';

import CompanyProfile from './components/CompanyProfile';
import ServicesHub from './components/ServicesHub';
import ProjectProcessTracker from './components/ProjectProcessTracker';
import QuoteEstimator from './components/QuoteEstimator';
import WaterDiagnostic from './components/WaterDiagnostic';
import BookingPortal from './components/BookingPortal';
import ClientTestimonials from './components/ClientTestimonials';
import FAQAccordion from './components/FAQAccordion';
import RecentProjectsGallery from './components/RecentProjectsGallery';
import MaintenanceTips from './components/MaintenanceTips';
import SEOHead from './components/SEOHead';
import { QuoteInput, QuoteResult, ServiceType, ClientType } from './types';

// Custom inline SVG logo replicating the user's uploaded emblem exactly
const BrandLogo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 flex-shrink-0" id="img-logo">
    <defs>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="blueLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="blueDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    
    {/* Outer circle layout matching the exact design */}
    <circle cx="50" cy="50" r="48" fill="none" />
    
    {/* Wave 1: Top orange crescent */}
    <path d="M 12 35 C 28 5, 72 5, 88 35 C 70 20, 30 20, 12 35 Z" fill="url(#orangeGrad)" />
    
    {/* Wave 2: Upper light blue stripe */}
    <path d="M 8 48 C 26 18, 74 18, 92 48 C 74 33, 26 33, 8 48 Z" fill="url(#blueLightGrad)" />
    
    {/* Wave 3: Middle red stripe */}
    <path d="M 6 62 C 24 32, 76 32, 94 62 C 76 47, 24 47, 6 62 Z" fill="url(#redGrad)" />
    
    {/* Wave 4: Bottom deep blue shield base */}
    <path d="M 8 75 C 26 45, 74 45, 92 75 C 72 96, 28 96, 8 75 Z" fill="url(#blueDarkGrad)" />
  </svg>
);

export default function App() {
  const [selectedServiceIdForQuote, setSelectedServiceIdForQuote] = useState<string>('borehole_drilling');
  const [prefilledBooking, setPrefilledBooking] = useState<{
    serviceType: ServiceType;
    clientType: ClientType;
    state: string;
    totalCost: number;
  } | null>(null);

  const [activePortalTab, setActivePortalTab] = useState<string>('book');
  const [isFloatingContactOpen, setIsFloatingContactOpen] = useState<boolean>(false);

  // Coordination 1: When a service is selected for cost estimation
  const handleSelectServiceForQuote = (serviceId: string) => {
    setSelectedServiceIdForQuote(serviceId);
    const element = document.getElementById('quote-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Coordination 2: When water treatment diagnostic recommends adding treatment to the quote
  const handleApplyFilterToQuote = () => {
    setSelectedServiceIdForQuote('water_treatment');
    const element = document.getElementById('quote-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Coordination 3: When a calculated quote is converted to an active consultation booking
  const handleApplyQuoteToBooking = (input: QuoteInput, result: QuoteResult) => {
    setPrefilledBooking({
      serviceType: input.serviceType,
      clientType: input.clientType,
      state: input.state,
      totalCost: result.total
    });
    setActivePortalTab('book');
    const element = document.getElementById('consultation-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll directly to live tracker
  const handleQuickScrollToTracker = () => {
    setActivePortalTab('track');
    const element = document.getElementById('consultation-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-orange/20 selection:text-brand-orange antialiased">
      <SEOHead />
      
      {/* Upper Top Minimal Contact Info Rail */}
      <div className="bg-brand-navy text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Licensed Water Engineers
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              Mararaba, Nasarawa State (Serving Nigeria)
            </span>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] sm:text-xs justify-center sm:justify-end">
            <a href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation.%20Please%20provide%20more%20details." target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 text-emerald-400 transition-colors flex items-center gap-1 font-bold">
              WhatsApp: +2348037304834
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="tel:08037304834" className="hover:text-brand-orange transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-brand-orange inline shrink-0" />
              08037304834
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="mailto:samsonalacha@gmail.com" className="hover:text-brand-blue-light transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-brand-blue-light inline shrink-0" />
              samsonalacha@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <BrandLogo />
            <div>
              <h1 className="font-display font-extrabold text-base sm:text-lg tracking-tight leading-none text-slate-900 uppercase">
                Elite Gate
              </h1>
              <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase mt-0.5 block font-bold">
                Multi Enterprises Ltd
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase font-mono font-bold text-slate-600">
            <a href="#about" className="hover:text-brand-orange transition-colors">About Us</a>
            <a href="#services" className="hover:text-brand-orange transition-colors">Services</a>
            <a href="#process" className="hover:text-brand-orange transition-colors">Our Process</a>
            <a href="#projects-gallery" className="hover:text-brand-orange transition-colors">Our Work</a>
            <a href="#water-diagnostics" className="hover:text-brand-orange transition-colors">Quality Advisor</a>
            <a href="#quote-calculator" className="hover:text-brand-orange transition-colors">Cost Estimator</a>
            <a href="#consultation-portal" className="hover:text-brand-orange transition-colors">Contact &amp; Booking</a>
            <a href="#faq" className="hover:text-brand-orange transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              id="btn-nav-track-shortcut"
              onClick={handleQuickScrollToTracker}
              className="hidden sm:inline-flex px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-slate-200"
            >
              Track Well
            </button>
            <a
              id="btn-nav-quote-shortcut"
              href="#quote-calculator"
              className="px-4 py-2 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-colors inline-block"
            >
              Free Estimate
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh py-20 lg:py-28 border-b border-slate-200">
        
        {/* Animated Water waves accent backdrop */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/3 translate-x-1/4">
          <svg viewBox="0 0 100 100" className="w-[500px] h-[500px]">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5, 10" className="animate-spin-slow" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f26622" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue-dark/10 text-brand-blue-dark text-xs font-mono font-bold rounded-full border border-brand-blue-dark/15">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>WATER IS LIFE ... AND QUALITY SERVICE IS OUR PRIORITY</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-none uppercase">
                Delivering Reliable <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark via-brand-blue-light to-brand-orange">
                  Water Solutions
                </span> <br />
                Across Nigeria
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Elite Gate Multi Enterprises Nigeria Ltd is a registered and reputable borehole drilling and water engineering company. We provide deep-well drilling, solar pumping, steel stanchion piping, and chemical water filtration for residential, commercial, and agricultural clients.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  id="btn-hero-quote"
                  href="#quote-calculator"
                  className="px-6 py-3.5 bg-brand-navy hover:bg-slate-800 text-white font-display font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-navy/15 flex items-center justify-center gap-1 cursor-pointer transition-transform hover:-translate-y-0.5 duration-300"
                >
                  Configure &amp; Estimate Cost
                  <ChevronRight className="w-4 h-4 text-brand-orange" />
                </a>

                <a
                  id="btn-hero-whatsapp"
                  href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation%20for%20my%20property.%20Please%20provide%20pricing%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.185-1.358a9.94 9.94 0 0 0 4.83 1.248h.004c5.507 0 9.991-4.479 9.992-9.986.001-2.67-1.037-5.178-2.927-7.071A9.925 9.925 0 0 0 12.012 2zm5.823 14.15c-.244.686-1.22 1.262-1.684 1.32-.464.057-.923.116-2.977-.696-2.628-1.04-4.303-3.713-4.434-3.886-.13-.174-1.063-1.412-1.063-2.695 0-1.283.673-1.914.912-2.175.24-.26.522-.326.696-.326.174 0 .348.004.498.01.155.006.365-.06.57.442.21.516.718 1.745.78 1.875.062.13.104.283.016.456-.088.174-.13.283-.26.435-.13.152-.274.34-.391.456-.13.13-.268.272-.116.533.152.261.677 1.114 1.45 1.804.996.89 1.83 1.168 2.09 1.298.26.13.412.109.564-.065.153-.174.654-.761.826-1.02.174-.26.348-.217.587-.13.24.087 1.52.717 1.78.847.261.13.435.195.499.304.064.109.064.63-.18 1.316z"/>
                  </svg>
                  <span>WhatsApp Booking</span>
                </a>
                
                <a
                  id="btn-hero-consultation"
                  href="#consultation-portal"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-display font-bold text-xs sm:text-sm rounded-xl border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 duration-300"
                >
                  Book Site Survey Form
                </a>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/60 max-w-lg">
                <div>
                  <div className="font-display font-bold text-slate-900 text-base sm:text-lg">Registered</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Nigeria Corporate Desk</div>
                </div>
                <div>
                  <div className="font-display font-bold text-slate-900 text-base sm:text-lg">Modern Rigs</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Rotary &amp; Hammer</div>
                </div>
                <div>
                  <div className="font-display font-bold text-slate-900 text-base sm:text-lg">100% Solid</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Thick UPVC Casing</div>
                </div>
              </div>

            </div>

            {/* Right Graphics Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange to-brand-blue-light rounded-3xl blur-xl opacity-20"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 overflow-hidden">
                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                  {/* High quality water engineering picture placeholder */}
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
                    alt="Borehole Drilling Truck"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                  
                  {/* Overlay trust indicators */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-widest block">
                        ACTIVE SITE
                      </span>
                      <span className="font-display font-bold text-white text-sm sm:text-base">
                        Deep Borehole Rig Operation
                      </span>
                    </div>
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border border-slate-700">
                      NASARAWA
                    </span>
                  </div>
                </div>

                {/* Sub-cards */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                    <Sun className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <span className="font-display font-bold text-slate-900 text-xs block">Solar Pumping</span>
                      <span className="text-[9px] text-slate-500 font-mono">Zero ongoing fuel cost</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                    <Droplets className="w-5 h-5 text-brand-blue-light shrink-0" />
                    <div>
                      <span className="font-display font-bold text-slate-900 text-xs block">Pure Filtration</span>
                      <span className="text-[9px] text-slate-500 font-mono">Iron &amp; Odor Removal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Section 1: Company Profile (About, values, HSE) */}
      <CompanyProfile />

      {/* Section 2: Services Hub (Major 8 services grid + technical modal details) */}
      <ServicesHub onSelectServiceForQuote={handleSelectServiceForQuote} />

      {/* Section 3: Project Process (Interactive 7 steps) */}
      <ProjectProcessTracker />

      {/* Section 4: Water diagnostics sandbox advisor */}
      <WaterDiagnostic onApplyFilterToQuote={handleApplyFilterToQuote} />

      {/* Section 5: Quote Estimator (Nigerian geology and invoice breakdown) */}
      <QuoteEstimator 
        initialServiceId={selectedServiceIdForQuote} 
        onApplyQuoteToBooking={handleApplyQuoteToBooking} 
      />

      {/* Section 6: Consultation Scheduling and Live Status tracker */}
      <BookingPortal 
        prefilledInputs={prefilledBooking} 
        onClearPrefilled={() => setPrefilledBooking(null)} 
        activeTabRef={activePortalTab}
      />

      {/* Section 7: Recent Projects Gallery & Real Case Studies */}
      <RecentProjectsGallery />

      {/* Section 8: Verified Client Testimonials and Experience Registry */}
      <FAQAccordion />
      <MaintenanceTips />
      <ClientTestimonials />

      {/* Sticky Bottom Direct Click-to-Call Action banner for mobile */}
      <div className="bg-brand-orange text-white py-4 px-6 text-center text-xs sm:text-sm font-semibold tracking-wide border-t border-brand-orange">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="flex items-center justify-center gap-2 font-display text-left">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping flex-shrink-0"></span>
            <span>Water is Life and Quality Service is our Priority. Need immediate borehole installation?</span>
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            <a
              id="btn-sticky-whatsapp"
              href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation.%20Please%20provide%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              WhatsApp Book
            </a>
            <a
              id="btn-sticky-call"
              href="tel:08037304834"
              className="px-4.5 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-lg font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              Call Operations
            </a>
          </div>
        </div>
      </div>

      {/* Global Footer Section */}
      <footer className="bg-brand-navy text-slate-400 pt-16 pb-12 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo />
              <div>
                <h3 className="font-display font-black text-white text-base sm:text-lg tracking-wider uppercase leading-none">
                  Elite Gate
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block font-bold mt-1">
                  Multi Enterprises Nigeria Ltd
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Elite Gate Multi Enterprises Nigeria Ltd is a registered and reputable borehole drilling and water engineering company. We are committed to delivering clean water through modern technology, certified professionals and unmatched customer support.
            </p>

            <div className="text-[10px] font-mono text-slate-500 pt-2 uppercase">
              RC NO: Registered in Federal Republic of Nigeria
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-display font-semibold text-xs uppercase tracking-widest border-l-2 border-brand-orange pl-2.5">
              Operations Scope
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors block">Company Profile</a></li>
              <li><a href="#services" className="hover:text-white transition-colors block">Borehole Drilling</a></li>
              <li><a href="#services" className="hover:text-white transition-colors block">Solar Pumping Systems</a></li>
              <li><a href="#water-diagnostics" className="hover:text-white transition-colors block">Water Treatment Plants</a></li>
              <li><a href="#quote-calculator" className="hover:text-white transition-colors block">Cost Estimator</a></li>
              <li><a href="#consultation-portal" className="hover:text-white transition-colors block">Client Tracker Desk</a></li>
            </ul>
          </div>

          {/* Col 3: Head office contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-display font-semibold text-xs uppercase tracking-widest border-l-2 border-brand-orange pl-2.5">
              Headquarters Office
            </h4>
            
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  SUITA 206 ROYAL PLAZA,<br />
                  OPPOSITE BUILDING MATERIALS,<br />
                  MARARABA, NASARAWA STATE, NIGERIA
                </span>
              </div>

              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-brand-blue-light flex-shrink-0" />
                <a href="mailto:samsonalacha@gmail.com" className="hover:text-white transition-colors">
                  samsonalacha@gmail.com
                </a>
              </div>

              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-brand-blue-light flex-shrink-0" />
                <div className="font-mono">
                  <a href="tel:08037304834" className="hover:text-white transition-colors block">08037304834 (Hotline)</a>
                  <a href="tel:07086031016" className="hover:text-white transition-colors block">07086031016 (Support)</a>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="p-0.5 bg-emerald-500/10 rounded flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-emerald-400">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.185-1.358a9.94 9.94 0 0 0 4.83 1.248h.004c5.507 0 9.991-4.479 9.992-9.986.001-2.67-1.037-5.178-2.927-7.071A9.925 9.925 0 0 0 12.012 2zm5.823 14.15c-.244.686-1.22 1.262-1.684 1.32-.464.057-.923.116-2.977-.696-2.628-1.04-4.303-3.713-4.434-3.886-.13-.174-1.063-1.412-1.063-2.695 0-1.283.673-1.914.912-2.175.24-.26.522-.326.696-.326.174 0 .348.004.498.01.155.006.365-.06.57.442.21.516.718 1.745.78 1.875.062.13.104.283.016.456-.088.174-.13.283-.26.435-.13.152-.274.34-.391.456-.13.13-.268.272-.116.533.152.261.677 1.114 1.45 1.804.996.89 1.83 1.168 2.09 1.298.26.13.412.109.564-.065.153-.174.654-.761.826-1.02.174-.26.348-.217.587-.13.24.087 1.52.717 1.78.847.261.13.435.195.499.304.064.109.064.63-.18 1.316z"/>
                  </svg>
                </div>
                <div className="font-mono text-xs">
                  <a
                    href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation%20for%20my%20property.%20Please%20provide%20pricing%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 text-emerald-400 font-bold flex items-center gap-1"
                  >
                    +2348037304834 (WhatsApp Book)
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800/80 my-10 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Elite Gate Multi Enterprises Nigeria Ltd. All Rights Reserved. Delivering Reliable Water Solutions across Nigeria.</p>
          <p className="mt-1 text-[10px] text-slate-600 font-mono uppercase">Designed with Precision water engineering standards</p>
        </div>
      </footer>

      {/* Floating Quick Connection & WhatsApp Acquisition Desk */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
        <AnimatePresence>
          {isFloatingContactOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="w-80 bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-5 mb-1 text-left relative overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-brand-blue-light to-brand-orange"></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    Elite Gate Desk
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold mt-0.5">
                    Instant Booking &amp; Support
                  </p>
                </div>
                <button
                  id="btn-close-floating-widget"
                  onClick={() => setIsFloatingContactOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Greeting */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Hello! Welcome to Elite Gate Water Enterprises. We specialize in borehole drilling and water systems. Reach out directly to book your installation today!
              </p>

              {/* Contact Buttons Stack */}
              <div className="space-y-2">
                {/* WhatsApp Chat Row */}
                <a
                  href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20am%20interested%20in%20booking%20a%20borehole%20drilling%20or%20solar%20water%20installation%20for%20my%20property.%20Please%20provide%20pricing%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 hover:border-emerald-500/20 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg group-hover:bg-emerald-500/20 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.185-1.358a9.94 9.94 0 0 0 4.83 1.248h.004c5.507 0 9.991-4.479 9.992-9.986.001-2.67-1.037-5.178-2.927-7.071A9.925 9.925 0 0 0 12.012 2zm5.823 14.15c-.244.686-1.22 1.262-1.684 1.32-.464.057-.923.116-2.977-.696-2.628-1.04-4.303-3.713-4.434-3.886-.13-.174-1.063-1.412-1.063-2.695 0-1.283.673-1.914.912-2.175.24-.26.522-.326.696-.326.174 0 .348.004.498.01.155.006.365-.06.57.442.21.516.718 1.745.78 1.875.062.13.104.283.016.456-.088.174-.13.283-.26.435-.13.152-.274.34-.391.456-.13.13-.268.272-.116.533.152.261.677 1.114 1.45 1.804.996.89 1.83 1.168 2.09 1.298.26.13.412.109.564-.065.153-.174.654-.761.826-1.02.174-.26.348-.217.587-.13.24.087 1.52.717 1.78.847.261.13.435.195.499.304.064.109.064.63-.18 1.316z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-800">Chat Samson Alacha</h5>
                    <p className="text-[10px] text-slate-400">Instantly active on WhatsApp</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Voice Call Row */}
                <a
                  href="tel:08037304834"
                  className="flex items-center gap-3 p-2.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/20 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-800">Call Operations Line</h5>
                    <p className="text-[10px] text-slate-400">08037304834 (Hotline)</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Email Row */}
                <a
                  href="mailto:samsonalacha@gmail.com?subject=Borehole%20Drilling%20Inquiry%20-%20Elite%20Gate"
                  className="flex items-center gap-3 p-2.5 bg-brand-orange/5 hover:bg-brand-orange/10 border border-brand-orange/10 hover:border-brand-orange/20 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg group-hover:bg-brand-orange/20 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-800">Send Official Email</h5>
                    <p className="text-[10px] text-slate-400">samsonalacha@gmail.com</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Direct Booking Desk shortcut link */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 text-center">
                <a
                  href="#consultation-portal"
                  onClick={() => setIsFloatingContactOpen(false)}
                  className="text-[10px] font-mono font-bold text-brand-orange hover:text-brand-orange/95 uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                >
                  Open Booking Form &amp; Tracker →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <div className="relative group">
          {/* Pulse Effect Rings */}
          {!isFloatingContactOpen && (
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none scale-125"></div>
          )}
          
          <button
            id="btn-floating-whatsapp-bubble"
            onClick={() => setIsFloatingContactOpen(!isFloatingContactOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all cursor-pointer ${
              isFloatingContactOpen 
                ? 'bg-slate-900 hover:bg-slate-800 rotate-90 scale-100' 
                : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105'
            }`}
          >
            {isFloatingContactOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.185-1.358a9.94 9.94 0 0 0 4.83 1.248h.004c5.507 0 9.991-4.479 9.992-9.986.001-2.67-1.037-5.178-2.927-7.071A9.925 9.925 0 0 0 12.012 2zm5.823 14.15c-.244.686-1.22 1.262-1.684 1.32-.464.057-.923.116-2.977-.696-2.628-1.04-4.303-3.713-4.434-3.886-.13-.174-1.063-1.412-1.063-2.695 0-1.283.673-1.914.912-2.175.24-.26.522-.326.696-.326.174 0 .348.004.498.01.155.006.365-.06.57.442.21.516.718 1.745.78 1.875.062.13.104.283.016.456-.088.174-.13.283-.26.435-.13.152-.274.34-.391.456-.13.13-.268.272-.116.533.152.261.677 1.114 1.45 1.804.996.89 1.83 1.168 2.09 1.298.26.13.412.109.564-.065.153-.174.654-.761.826-1.02.174-.26.348-.217.587-.13.24.087 1.52.717 1.78.847.261.13.435.195.499.304.064.109.064.63-.18 1.316z"/>
              </svg>
            )}
          </button>

          {/* Label Tooltip on Hover */}
          {!isFloatingContactOpen && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Chat/Call Direct
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
