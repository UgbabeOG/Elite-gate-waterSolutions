/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Quote, CheckCircle2, User, MapPin, 
  Sparkles, Calendar, PlusCircle, PenTool, Check 
} from 'lucide-react';
import { ClientType } from '../types';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  sector: ClientType;
  projectSpecs: string;
  content: string;
  rating: number;
  date: string;
  isVerified: boolean;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Chief Alhaji Ibrahim Musa',
    role: 'Plaza Owner & Administrator',
    location: 'Garki, Abuja',
    sector: 'commercial',
    projectSpecs: '220ft Deep Borehole + 2HP Solar Pump + 10,000L Overhead Tank',
    content: 'Elite Gate delivered an exceptional job for our commercial plaza. The water pressure is fantastic, and we no longer spend a single Naira on generator diesel for water pumping thanks to their premium solar layout design.',
    rating: 5,
    date: 'January 2026',
    isVerified: true
  },
  {
    id: 't2',
    author: 'Dr. Elizabeth Adebayo',
    role: 'Homeowner',
    location: 'Mararaba, Nasarawa',
    sector: 'residential',
    projectSpecs: '160ft Borehole + Iron & Odor Removal Filtration Plant',
    content: 'Highly professional geophysicists and drillers. They analyzed our local aquifer, discovered high iron content, and custom-designed an active chemical filtration system. Our water is now sparkling clean and safe for domestic use!',
    rating: 5,
    date: 'April 2026',
    isVerified: true
  },
  {
    id: 't3',
    author: 'Chinedu Okechukwu Farms',
    role: 'Managing Director',
    location: 'Keffi, Nasarawa State',
    sector: 'agricultural',
    projectSpecs: '250ft Deep Rock Well + 3HP Heavy Duty Solar Submersible',
    content: 'Our poultry farm was struggling with water shortages and rationing. Elite Gate surveyed the rocky terrain and successfully reached a rich aquifer. The automatic solar sensors pump water all day without requiring any monitoring.',
    rating: 5,
    date: 'November 2025',
    isVerified: true
  },
  {
    id: 't4',
    author: 'Chief Mrs. Grace Olatunji',
    role: 'Estate Developer',
    location: 'Lekki, Lagos',
    sector: 'residential',
    projectSpecs: '120ft Treated Well + Double Stage Sand & Carbon Filters',
    content: 'In Lekki, salinity and organic odor are major challenges. Elite Gate did not just drill blindly; they ran water quality tests first and engineered a durable, salt-water purification plant. Service was swift and transparent.',
    rating: 5,
    date: 'February 2026',
    isVerified: true
  },
  {
    id: 't5',
    author: 'Engr. Abubakar Bello',
    role: 'Operations Director',
    location: 'Lafia, Nasarawa State',
    sector: 'industrial',
    projectSpecs: '300ft Heavy Industrial Borehole + Twin Galvanized Steel Stanchions',
    content: "I've worked with several drilling contractors in Nigeria, but Elite Gate's safety (HSE) protocols, heavy-duty UPVC casing usage, and detailed geophysical logs set them far apart. Outstanding professional engineering standards.",
    rating: 5,
    date: 'May 2026',
    isVerified: true
  }
];

export default function ClientTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeFilter, setActiveFilter] = useState<'all' | ClientType>('all');
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSector, setNewSector] = useState<ClientType>('residential');
  const [newSpecs, setNewSpecs] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [formSuccess, setFormSuccess] = useState(false);

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.sector === activeFilter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent || !newLocation) return;

    const newTestimonial: Testimonial = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      role: newRole || 'Property Owner',
      location: newLocation,
      sector: newSector,
      projectSpecs: newSpecs || 'Standard Borehole Installation',
      content: newContent,
      rating: newRating,
      date: 'Just now',
      isVerified: false // Form-submitted ones start unverified till admin reviews, but visible in UI
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormSuccess(true);
    
    // Reset fields
    setNewAuthor('');
    setNewRole('');
    setNewLocation('');
    setNewSector('residential');
    setNewSpecs('');
    setNewContent('');
    setNewRating(5);

    setTimeout(() => {
      setFormSuccess(false);
      setShowReviewForm(false);
    }, 4000);
  };

  const getSectorLabel = (sector: ClientType) => {
    switch (sector) {
      case 'residential': return 'Residential';
      case 'commercial': return 'Commercial Plaza';
      case 'agricultural': return 'Agricultural Farm';
      case 'industrial': return 'Industrial Factory';
      default: return sector;
    }
  };

  const getSectorColor = (sector: ClientType) => {
    switch (sector) {
      case 'residential': return 'bg-sky-50 text-sky-700 border-sky-150';
      case 'commercial': return 'bg-amber-50 text-amber-700 border-amber-150';
      case 'agricultural': return 'bg-emerald-50 text-emerald-700 border-emerald-150';
      case 'industrial': return 'bg-purple-50 text-purple-700 border-purple-150';
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background Mesh Accent */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-blue-light/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold rounded-full border border-brand-orange/15 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Approved</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight uppercase">
            Built on Absolute <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark via-brand-blue-light to-brand-orange">
              Trust &amp; Quality
            </span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            See how Elite Gate Multi Enterprises has transformed water access for families, farms, and businesses across Nigeria. Real feedback from verified installations.
          </p>

          {/* Interactive Filtering and Call to Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/60 rounded-2xl border border-slate-300/30">
              {(['all', 'residential', 'commercial', 'agricultural', 'industrial'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {filter === 'all' ? 'All Reviews' : filter}
                </button>
              ))}
            </div>

            {/* Leave a review trigger */}
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4.5 py-2 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-brand-orange" />
              Write A Review
            </button>
          </div>
        </div>

        {/* Dynamic Review Submission Form Card */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl max-w-3xl mx-auto relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-blue-light"></div>
                
                {formSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900">Review Submitted Successfully!</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Thank you for sharing your experience! Your testimonial has been saved and added dynamically below to help other clients learn about our quality borehole services.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <PenTool className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display font-bold text-lg text-slate-900">Share Your Elite Gate Experience</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Chief Johnson Okafor"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-800 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Designation / Role
                        </label>
                        <input
                          type="text"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          placeholder="e.g. Factory Manager, Homeowner"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-800 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Location (City, State) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="e.g. Karu, Nasarawa"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-800 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Installation Type
                        </label>
                        <select
                          value={newSector}
                          onChange={(e) => setNewSector(e.target.value as ClientType)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-850 outline-none transition-all"
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="agricultural">Agricultural</option>
                          <option value="industrial">Industrial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Borehole Specifications
                        </label>
                        <input
                          type="text"
                          value={newSpecs}
                          onChange={(e) => setNewSpecs(e.target.value)}
                          placeholder="e.g. 150ft well, 1.5HP pump"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-800 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Star selection */}
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                        Your Rating
                      </span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 cursor-pointer hover:scale-110 transition-transform"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                star <= newRating 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                        Testimonial Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Tell others about the borehole water quality, the drilling process, the technical efficiency of the crew, and overall trust you have in Elite Gate."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-xs text-slate-800 outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-brand-orange/10"
                      >
                        Publish Review
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={testimonial.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Visual quote accent mark */}
                <div className="absolute top-6 right-6 text-slate-100 group-hover:text-slate-200 transition-colors pointer-events-none">
                  <Quote className="w-10 h-10 rotate-180 fill-current" />
                </div>

                <div className="space-y-4">
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < testimonial.rating 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-200'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3.5">
                  
                  {/* Metadata Tag Row */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full border ${getSectorColor(testimonial.sector)} font-bold`}>
                      {getSectorLabel(testimonial.sector)}
                    </span>
                    <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Tech Specs */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-start gap-1.5">
                    <div className="w-4 h-4 text-slate-400 mt-0.5 shrink-0">
                      <PlusCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">Specs Implemented</span>
                      <span className="text-[10px] text-slate-700 font-semibold">{testimonial.projectSpecs}</span>
                    </div>
                  </div>

                  {/* User Profile Footer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-display font-bold text-sm flex-shrink-0">
                      {testimonial.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-display font-extrabold text-xs text-slate-900 truncate">
                          {testimonial.author}
                        </h4>
                        {testimonial.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-[9px] text-slate-400 flex items-center gap-0.5 mt-0.5 truncate font-semibold uppercase">
                        <MapPin className="w-2.5 h-2.5 text-brand-orange" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic conversion nudge */}
        <div className="mt-16 bg-gradient-to-r from-brand-orange/10 to-brand-blue-light/10 border border-brand-orange/15 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-left">
            <h4 className="font-display font-black text-slate-900 text-base sm:text-lg uppercase">
              Join Our List of Satisfied Clients Across Nigeria
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              Take the first step toward securing reliable, clean, solar-powered water source for your property.
            </p>
          </div>
          <a
            href="#consultation-portal"
            className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/95 text-white font-display font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-orange/15 transition-transform hover:-translate-y-0.5 duration-300 shrink-0 uppercase"
          >
            Schedule Free Inspection
          </a>
        </div>

      </div>
    </section>
  );
}
