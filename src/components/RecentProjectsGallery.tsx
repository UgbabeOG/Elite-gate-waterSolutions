/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, X, MapPin, Calendar, ShieldCheck, 
  Droplets, Sun, Sparkles, Filter, Info, 
  ArrowRight, CheckCircle2, Award, Zap, ChevronRight 
} from 'lucide-react';
import { ClientType } from '../types';

interface ProjectSpec {
  label: string;
  value: string;
}

interface ProjectItem {
  id: string;
  title: string;
  category: 'borehole' | 'solar' | 'filtration';
  clientType: ClientType;
  location: string;
  date: string;
  imageUrl: string;
  summary: string;
  challenge: string;
  solution: string;
  specs: ProjectSpec[];
  waterYield: string; // e.g. "15,000 L/hr"
  drillDepth?: string; // e.g. "220 feet"
  powerSource: string; // e.g. "Solar Powered (4x 450W Panels)"
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'High-Yield Agricultural Solar Borehole',
    category: 'solar',
    clientType: 'agricultural',
    location: 'Keffi, Nasarawa State',
    date: 'November 2025',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    summary: 'A completely grid-independent irrigation well powering a large-scale poultry and crop farm. Engineered with dual-axis solar panels.',
    challenge: 'The farm suffered from severe power outages and exorbitant diesel costs for generator pumping, causing crop dehydration and water rationing for livestock.',
    solution: ' Elite Gate drilled a 250-foot deep high-yield well, installed a heavy-duty 3HP DC solar submersible pump, and deployed a robust 6-panel solar array on a reinforced steel stanchion.',
    waterYield: '22,000 Liters/Day',
    drillDepth: '250 Feet (76m)',
    powerSource: '3HP Solar DC Pump (6x 450W Monocrystalline Panels)',
    specs: [
      { label: 'Drill Method', value: 'DTH Air-Hammer Pneumatic Rig' },
      { label: 'Casing Installed', value: 'High-Gauge 5.5-inch Threaded UPVC' },
      { label: 'Overhead Tank', value: '10,000L Double-Layer Polyethylene' },
      { label: 'Pump Controller', value: 'LORENTZ Solar MPPT Controller' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Multi-Stage Iron & Odor Filtration Plant',
    category: 'filtration',
    clientType: 'residential',
    location: 'Mararaba, Nasarawa State',
    date: 'April 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    summary: 'Advanced chemical-free oxidation and catalytic media filtration designed to eradicate severe iron content from residential water supply.',
    challenge: 'Water drawn from the regional aquifer was yellowish-brown, stained sanitary wares, possessed a foul metallic odor, and was unsafe for laundry or bathing.',
    solution: 'Designed and integrated an automatic aeration unit that precipitates dissolved iron, followed by a multi-media Manganese Greensand and granular activated carbon filtration bank.',
    waterYield: '3,000 Liters/Hour',
    powerSource: 'AC Mains + Backup Solar Power',
    specs: [
      { label: 'Iron Pre-Treatment', value: 'Venturi Passive Aeration System' },
      { label: 'Primary Media', value: 'Manganese Greensand Catalyst' },
      { label: 'Polishing Filter', value: 'Activated Carbon + 5-Micron Sediment' },
      { label: 'Water Quality', value: 'WHO Potable Standard (0.05mg/L Iron)' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Commercial Plaza Overhead Well System',
    category: 'borehole',
    clientType: 'commercial',
    location: 'Garki, Abuja FCT',
    date: 'January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=800&q=80',
    summary: 'A heavy-duty commercial borehole supplying uninterrupted water to 35 business suites, retail shops, and food courts with smart auto-switch sensors.',
    challenge: 'High water demand during office hours combined with highly congested utility lanes in a crowded shopping plaza requiring highly precise drill placement.',
    solution: 'Conducted advanced electromagnetic geophysical survey to locate the optimal aquifer fracture zone, drilled a deep 220-foot well, and installed a 15-meter structural galvanized steel stanchion.',
    waterYield: '32,000 Liters/Day',
    drillDepth: '220 Feet (67m)',
    powerSource: 'AC Mains Grid (Auto-Mains Transfer Switch)',
    specs: [
      { label: 'Stanchion Height', value: '15-Meter Structural Galvanized H-Beams' },
      { label: 'Casing Grade', value: 'Schedule-80 Heavy Duty UPVC' },
      { label: 'Water Reservoirs', value: 'Twin 5,000L Overhead Tanks (10,000L Total)' },
      { label: 'Pump Installed', value: '2HP Pedrollo Submersible AC Pump' }
    ]
  },
  {
    id: 'proj-4',
    title: 'Industrial Manufacturing Pure Water Feed',
    category: 'filtration',
    clientType: 'industrial',
    location: 'Lafia, Nasarawa State',
    date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    summary: 'Reverse osmosis and micro-filtration plant built to provide ultra-pure process water for a local food processing and packaging factory.',
    challenge: 'Raw borehole water contained elevated TDS (Total Dissolved Solids) and micro-organic pathogens that violated industrial manufacturing hygiene guidelines.',
    solution: 'Designed and deployed a stainless steel reverse osmosis (RO) membrane system paired with chemical dosing, multi-cartridge sediment polishing, and high-intensity ultraviolet (UV) sterilizers.',
    waterYield: '5,000 Liters/Hour',
    powerSource: 'Factory AC Grid (380V Industrial Tri-Phase)',
    specs: [
      { label: 'Primary Tech', value: 'Reverse Osmosis (RO) Membrane Desalination' },
      { label: 'Sterilization', value: 'High-Power Inline Ultraviolet (UV) Unit' },
      { label: 'Plumbing Grade', value: 'Surgical Stainless Steel (SS316) Piping' },
      { label: 'Control System', value: 'PLC Automated TDS Monitor Panel' }
    ]
  },
  {
    id: 'proj-5',
    title: 'Estate-Scale Multi-Family Water Station',
    category: 'borehole',
    clientType: 'residential',
    location: 'Lekki Phase 1, Lagos',
    date: 'February 2026',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    summary: 'A deep-sea saline barrier borehole engineered to bypass shallow brackish water tables and tap into the deep pure continental sands aquifer.',
    challenge: 'Shallow wells in coastal Lekki yield extremely salty, yellow water due to sea-water intrusion, resulting in fast degradation of pipes and household plumbing.',
    solution: 'Drilled with extreme precision down to 180 feet, bypassing saline aquifers by sealing them off with thick cement grouting, extracting water exclusively from the deep freshwater stratum.',
    waterYield: '18,000 Liters/Day',
    drillDepth: '180 Feet (55m)',
    powerSource: 'AC Generator + Inverter Hybrid System',
    specs: [
      { label: 'Grouting Method', value: 'Double-Pressure Neat Cement Seal' },
      { label: 'Salinity Mitigation', value: 'Aquifer Selection Grouting' },
      { label: 'Pre-Filter', value: 'Pressure Sand Filter & Salt Conditioner' },
      { label: 'Pump Spec', value: '1.5HP Low-Vibration Submersible' }
    ]
  },
  {
    id: 'proj-6',
    title: 'Livestock Solar Water Fountain',
    category: 'solar',
    clientType: 'agricultural',
    location: 'Karu, Nasarawa State',
    date: 'March 2026',
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    summary: 'A cost-effective solar-direct pumping system that feeds a network of livestock drinking troughs on a remote grazing reserve without batteries.',
    challenge: 'Remote pasture land with absolutely zero electricity grid connection and extremely high daily temperatures requiring automatic pumping as solar intensity rises.',
    solution: 'Deployed a Solar-Direct DC pumping system that pumps water directly into high-elevation holding tanks during peak sun hours, utilizing simple gravity to feed the troughs.',
    waterYield: '12,000 Liters/Day',
    drillDepth: '160 Feet (49m)',
    powerSource: 'Solar-Direct DC (4x 380W High-Efficiency Panels)',
    specs: [
      { label: 'Battery System', value: 'None (Direct-to-Water Reservoir Design)' },
      { label: 'Tank Capacity', value: '5,000L Overhead Reservoir' },
      { label: 'Valves Installed', value: 'Float-Switch Auto shutoff valves' },
      { label: 'Pipe Material', value: 'Flexible HDPE Piping (Anti-Crush)' }
    ]
  }
];

export default function RecentProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'borehole' | 'solar' | 'filtration'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Before/After Slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left button held down
      handleSliderMove(e.clientX);
    }
  };

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const getCategoryTagColor = (cat: string) => {
    switch (cat) {
      case 'borehole': return 'bg-sky-50 text-sky-700 border-sky-150';
      case 'solar': return 'bg-amber-50 text-amber-700 border-amber-150';
      case 'filtration': return 'bg-emerald-50 text-emerald-700 border-emerald-150';
      default: return 'bg-slate-50 text-slate-700 border-slate-150';
    }
  };

  const getClientTypeLabel = (type: ClientType) => {
    switch (type) {
      case 'residential': return 'Residential Property';
      case 'commercial': return 'Commercial Plaza';
      case 'agricultural': return 'Agricultural Farm';
      case 'industrial': return 'Industrial Factory';
    }
  };

  return (
    <section id="projects-gallery" className="py-24 bg-slate-100 border-t border-slate-200 relative overflow-hidden">
      {/* Structural Accent Details */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-brand-blue-light/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold rounded-full border border-brand-orange/15 uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Finished Engineering Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight uppercase">
            Recent Projects <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark via-brand-blue-light to-brand-orange">
              Gallery &amp; Case Studies
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Take a visual tour of our professionally completed deep well drillings, solar stanchion setups, and high-purity water filtration plants across Nigeria.
          </p>

          {/* Interactive Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-6">
            {(['all', 'borehole', 'solar', 'filtration'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-blue-dark text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Operations' : `${cat} installations`}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col group"
              >
                {/* Project Image Wrapper */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill Overlays */}
                  <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase border shadow-xs bg-white ${getCategoryTagColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay Detail Trigger */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4.5 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View Technical Specs
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Location & Client Type Row */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        {project.location}
                      </span>
                      <span>{getClientTypeLabel(project.clientType)}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 leading-tight uppercase group-hover:text-brand-blue-dark transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Yield & Technical Quick Spec */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Tested Yield</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 animate-pulse" />
                        {project.waterYield}
                      </span>
                    </div>
                    {project.drillDepth && (
                      <div className="space-y-0.5 text-right">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Drill Depth</span>
                        <span className="text-slate-700 font-bold">{project.drillDepth}</span>
                      </div>
                    )}
                  </div>

                  {/* Read More Trigger */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-2 py-2 bg-slate-50 hover:bg-brand-orange/5 text-slate-700 hover:text-brand-orange text-xs font-bold rounded-xl border border-slate-200/80 hover:border-brand-orange/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Read Engineering Log
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Water Purification Before/After Interactive Panel */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Text description */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-mono font-bold rounded-full border border-emerald-500/15 uppercase">
                <Sparkles className="w-3 h-3" />
                <span>Water Purification Showcase</span>
              </div>
              <h3 className="font-display font-black text-slate-900 text-lg sm:text-2xl uppercase leading-tight">
                Watch Water <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-brand-blue-light">
                  Purification Magic
                </span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Many boreholes in Nasarawa and Abuja yield high iron content, odors, or sand turbidity. Slide the divider to see the crystal-clear potability standard of Elite Gate's catalytic multi-media filter system!
              </p>
              
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Unprocessed Aquifer Water</span>
                    <span className="text-slate-500 text-[11px]">Turbid, metallic taste, heavy iron oxide precipitation (red/orange stains).</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Elite Gate Filtered Water</span>
                    <span className="text-slate-500 text-[11px]">WHO certified pure drinking water, odor-free, neutral pH, zero chemical residual.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Slider Container */}
            <div className="md:col-span-7 flex flex-col items-center">
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-slate-300 shadow-inner select-none cursor-ew-resize group"
              >
                {/* AFTER: Clean Water (Bottom/Base Layer) */}
                <div className="absolute inset-0 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"
                    alt="After: Crystal Clean Water"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Clean Water Label */}
                  <div className="absolute bottom-4 right-4 bg-emerald-600/95 text-white px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider z-10 shadow-xs">
                    Filtered Water Standards
                  </div>
                </div>

                {/* BEFORE: Dirty Water (Top Clip Layer) */}
                <div 
                  className="absolute inset-0 bg-slate-850 pointer-events-none overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1484655556241-740451a509ea?auto=format&fit=crop&w=800&q=80"
                    alt="Before: Unfiltered Muddy Water"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter sepia saturate-150 hue-rotate-15 contrast-110 brightness-75"
                    style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  />
                  {/* Unfiltered Label */}
                  <div className="absolute bottom-4 left-4 bg-amber-800/95 text-white px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider z-10 shadow-xs whitespace-nowrap">
                    Unfiltered Raw Water
                  </div>
                </div>

                {/* Slider bar handler */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-orange border-2 border-white flex items-center justify-center shadow-md -translate-x-1/2 transform group-hover:scale-110 transition-transform">
                    <span className="text-white text-[10px] font-sans font-bold tracking-tighter flex gap-0.5 select-none">
                      <span>&larr;</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-3 font-mono font-bold uppercase flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-orange" />
                Drag the divider handle horizontally to compare water clarity
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
            >
              {/* Modal Banner Top */}
              <div className="relative h-64 sm:h-80 bg-slate-100 overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  id="btn-close-modal"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-slate-900/65 hover:bg-slate-900/95 text-white rounded-full flex items-center justify-center border border-white/20 transition-colors cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 text-left">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border bg-white ${getCategoryTagColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-200">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      {selectedProject.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedProject.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Main Content Columns (Challenge & Solution) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-900 uppercase flex items-center gap-1.5 border-b pb-2">
                      <span className="text-red-600 font-mono text-[10px] font-bold border border-red-200 bg-red-50 px-2 py-0.5 rounded">Challenge</span>
                      The Aquifer Challenge
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-900 uppercase flex items-center gap-1.5 border-b pb-2">
                      <span className="text-emerald-600 font-mono text-[10px] font-bold border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded">Engineering Solution</span>
                      The Elite Gate Engineering Solution
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Trust Badge */}
                  <div className="bg-sky-50 border border-sky-150 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-sky-800 block">3-Year Structure Guarantee Included</span>
                      <span className="text-[11px] text-sky-600">Like all our drilling and filtration projects, this borehole carries a 3-year structural guarantee on UPVC casing and 12 months mechanical warranty on pumps.</span>
                    </div>
                  </div>

                </div>

                {/* Technical Specifications Column */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
                    <h4 className="font-display font-black text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-3">
                      <Award className="w-4 h-4 text-brand-orange" />
                      Engineering Specifications
                    </h4>

                    {/* Quick Core Specs */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200/60">
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono uppercase block font-bold">Tested Yield</span>
                        <span className="text-emerald-600 font-mono text-xs font-bold flex items-center gap-1">
                          {selectedProject.waterYield}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono uppercase block font-bold">Power Layout</span>
                        <span className="text-slate-700 font-mono text-xs font-bold truncate block">
                          {selectedProject.powerSource}
                        </span>
                      </div>
                    </div>

                    {/* Full spec list */}
                    <div className="space-y-3">
                      {selectedProject.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium">{spec.label}</span>
                          <span className="text-slate-950 font-bold font-mono text-right pl-2">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Immediate CTA inside modal */}
                  <div className="bg-gradient-to-r from-brand-orange to-brand-orange/90 rounded-2xl p-5 text-white text-center space-y-3">
                    <h5 className="font-display font-bold text-xs uppercase text-white">Need a similar water layout?</h5>
                    <p className="text-[11px] text-white/80">Get a custom geologically-tailored invoice quotation for your location instantly.</p>
                    <a
                      href="#quote-calculator"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex w-full py-2.5 bg-white hover:bg-slate-50 text-brand-orange font-bold text-xs rounded-xl transition-colors justify-center items-center gap-1.5 shadow-sm uppercase"
                    >
                      Use Cost Estimator
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4.5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Close Case Log
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
