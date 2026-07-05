/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, MapPin, Layers, Settings, ShieldCheck, RefreshCw, Layers3, Sun, 
  X, Calendar, ClipboardCheck, ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  category: 'drilling' | 'power' | 'treatment' | 'engineering';
  fullDesc: string;
  timeline: string;
  materials: string[];
  features: string[];
  equipment: string[];
  imageUrl: string;
}

export default function ServicesHub({ onSelectServiceForQuote }: { onSelectServiceForQuote: (serviceId: string) => void }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'drilling' | 'power' | 'treatment' | 'engineering'>('all');

  const services: ServiceItem[] = [
    {
      id: 'borehole_drilling',
      title: 'Borehole Drilling (Res, Comm & Ind)',
      category: 'drilling',
      shortDesc: 'Deep-well hydraulic drilling for residential, commercial, industrial, and agricultural clients utilizing modern rotary and pneumatic hammer rigs.',
      icon: <Droplets className="w-6 h-6" />,
      fullDesc: 'We drill premium deep water wells ranging from 45 meters to over 250 meters deep. Our technology can punch through loose sandy soils of the south, clay strata, and heavy igneous granite basement rock found in Nasarawa and Abuja. We design each borehole based on actual geological formation yields.',
      timeline: '2 - 4 Days (Strata dependent)',
      materials: [
        'Premium 5" or 6" Class-D high-pressure UPVC casing pipes',
        'Inert river wash gravel packing (prevents sand infiltration)',
        'Bottom borehole sanitary grout seal (prevents surface water pollution)'
      ],
      features: [
        'Accurate depth logging to reach aquifer basement',
        'Casing to full depth to prevent cave-ins',
        'High-pressure chemical well flushing and development'
      ],
      equipment: ['Heavy Hydraulic Rotary Rig', 'Pneumatic Air Compressor Rig', 'Well Logger'],
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'geophysical_survey',
      title: 'Geophysical Survey (Site Investigation)',
      category: 'engineering',
      shortDesc: 'Scientific site investigation using Terrameters to map groundwater aquifers, fault zones, and determine the exact drilling spot for maximum yield.',
      icon: <MapPin className="w-6 h-6" />,
      fullDesc: 'Before we bring any massive drilling rig, our geophysicists perform Vertical Electrical Sounding (VES) using high-precision resistivity terrameters. This maps the subterranean layers and ensures we do not drill "dry wells," identifying the highest water-bearing fractured rock zones.',
      timeline: '1 Day (Requires 2-3 hours on-site)',
      materials: [
        'Resistivity Sounding Cable arrays',
        'Copper electrodes and copper-sulfate half-cell pots',
        'Geophysical analysis computer models'
      ],
      features: [
        'Detailed geological stratification reports',
        'Basement depth determination',
        'Water table quality and salinity projection'
      ],
      equipment: ['Abem Terrameter SAS 1000', 'Vertical Electrical Sounding (VES) Kit'],
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'borehole_casing',
      title: 'Borehole Casing & Installation',
      category: 'drilling',
      shortDesc: 'Professional casing lining with heavy-duty slotted UPVC screen pipes and sand-arresting gravel packing to guarantee a lifetime of clean water.',
      icon: <Layers className="w-6 h-6" />,
      fullDesc: 'An uncased or poorly cased borehole is bound to collapse or pump sand, destroying your pumps within months. We insert heavy-walled, thick, food-grade UPVC casings with professionally slotted screens in the water-bearing zone to let water rush in while keeping clay and sand out.',
      timeline: '1 Day',
      materials: [
        'Class D food-grade UPVC screen and blind casing pipes',
        'Eco-friendly rubber casing centralizers',
        'Cement grout sealants'
      ],
      features: [
        'Proper placement of casing centralizers for uniform wall support',
        'Perfect sizing of screen slots to match local aquifer sand grains',
        'Bentonite clay bottom sealing'
      ],
      equipment: ['Pipe Threading Lathe', 'Hoisting Winch Systems'],
      imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'submersible_pump',
      title: 'Submersible Pump Installation',
      category: 'power',
      shortDesc: 'Sizing and installation of highly reliable, high-head submersible pumps (Franklin, Pedrollo, Grundfos) with full automated controls.',
      icon: <Settings className="w-6 h-6" />,
      fullDesc: 'We install premium-quality, high-head Italian and Danish submersible pumps suited for your specific borehole depth and yield. We integrate automatic dry-run protection controls and water-level float switches to protect your pump from running dry and burning.',
      timeline: '1 Day',
      materials: [
        'Stainless Steel Submersible Pump (0.75HP to 10HP)',
        'Double-insulated submersible flat power cables',
        'Automated Control Box (Overload & dry run protection)',
        'Heavy-duty safety rope and galvanised fittings'
      ],
      features: [
        'Water level sensing probes',
        'Correct electrical voltage and surge protection integration',
        'Optimal pressure valve settings'
      ],
      equipment: ['Digital Cable Joiner (Waterproof Resin)', 'Digital Multimeter & Megger Tester'],
      imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'water_treatment',
      title: 'Water Treatment Systems (Filtration)',
      category: 'treatment',
      shortDesc: 'Custom-designed filtration, iron removal, sand filters, activated carbon, and UV sterilizers to remove odors, heavy metals, and microbes.',
      icon: <ShieldCheck className="w-6 h-6" />,
      fullDesc: 'In many parts of Nigeria, groundwater can contain iron, dissolved solids, acidic elements, or bad odors. We install custom water treatment plants including automated backwash pressure sand filters, activated carbon filters, iron aeration chambers, and UV sanitizers.',
      timeline: '1 - 2 Days',
      materials: [
        'FRP Filter vessels filled with manganese greensand, silica sand, & carbon',
        'Automated multiport backwash control valves',
        'Dosing pumps with chlorine/soda-ash solutions',
        'Inline UV sterilizer chamber'
      ],
      features: [
        'Complete removal of orange/brown iron stains',
        'Neutralization of acidic water (pH correction)',
        'Microbiology eradication for safe drinking water'
      ],
      equipment: ['Chemical Dosing Rigs', 'Water Chemistry Test Kit', 'FRP Vessel Setters'],
      imageUrl: 'https://images.unsplash.com/photo-1609172765488-51114539580a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'borehole_rehab',
      title: 'Borehole Rehabilitation & Maintenance',
      category: 'drilling',
      shortDesc: 'Restoring low-yielding, sand-pumping, or abandoned boreholes through high-pressure flushing, casing repair, and pump servicing.',
      icon: <RefreshCw className="w-6 h-6" />,
      fullDesc: 'Is your old borehole pumping dirty water or has the yield dropped? We rehabilitate old wells by performing high-pressure air flushing, chemical scale removal, screen cleaning, and deep casing repairs, saving you 60% of the cost of drilling a new borehole.',
      timeline: '1 - 2 Days',
      materials: [
        'Environment-friendly food-grade well cleaning chemicals',
        'Replacement heavy-duty casing connectors',
        'New electrode cables and control sensors'
      ],
      features: [
        'Deep chemical well descaling',
        'Submersible pump motor rewinding and servicing',
        'Borehole silt extraction and depth restoration'
      ],
      equipment: ['High-Pressure Air Compressor (350 PSI)', 'Downhole CCTV Survey Camera'],
      imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'tank_installation',
      title: 'Tank Installation & Water Reticulation',
      category: 'engineering',
      shortDesc: 'Installation of high-grade plastic/galvanized tanks on structural steel towers and full house piping and plumbing reticulation.',
      icon: <Layers3 className="w-6 h-6" />,
      fullDesc: 'We design and construct heavy-duty structural steel stanchions (tank towers) ranging from 3 meters to 12 meters in height to provide optimal gravity-fed water pressure. We install premium polyethylene reservoirs and lay high-quality PPR/PEX distribution plumbing pipes.',
      timeline: '2 - 3 Days',
      materials: [
        'Structural steel sections (H-beams, angle iron, channels)',
        'High-density anti-UV Polyethylene water storage tanks (2000L - 10000L)',
        'High-pressure PPR, HDPE pipes and brass union gate valves'
      ],
      features: [
        'Strict engineering calculation of weight load structural tolerance',
        'Rust-proof marine-grade epoxy anti-corrosion tower painting',
        'Siphon and backflow prevention design'
      ],
      equipment: ['Heavy-duty Arc Welding machine', 'Concrete mixer', 'PPR Pipe Fusion machine'],
      imageUrl: 'https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'solar_borehole',
      title: 'Solar-Powered Borehole Systems',
      category: 'power',
      shortDesc: 'Eco-friendly and cost-effective borehole operations powered by high-capacity solar panels and solar DC submersible pumps, eliminating generator costs.',
      icon: <Sun className="w-6 h-6" />,
      fullDesc: 'With high fuel costs, running generators to pump water is unsustainable. We install high-efficiency monocrystalline solar panels connected to specialized DC brushless solar pumps that pump water silently during daylight hours, directly charging your overhead tanks automatically.',
      timeline: '1 - 2 Days',
      materials: [
        'A-Grade Tier-1 Monocrystalline Solar Panels (300W - 550W)',
        'Galvanised anti-theft ground or roof solar mounting rails',
        'Smart Solar Pump Inverter/Controller with MPPT technology',
        'High-torque brushless DC water pump'
      ],
      features: [
        'Zero running/fuel cost water supply',
        'Automated daytime pumping without batteries (direct-to-tank)',
        'MPPT controller tracking for continuous pumping even on cloudy days'
      ],
      equipment: ['Solar Irradiation Meter', 'Angle Tilt Finder', 'DC Voltage Clamp Meter'],
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'drilling', name: 'Drilling & Well Construction' },
    { id: 'power', name: 'Pumps & Solar Power' },
    { id: 'treatment', name: 'Water Purity & Filters' },
    { id: 'engineering', name: 'Engineering & Surveys' }
  ];

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
            // OUR AREA OF EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
            Comprehensive Water Engineering &amp; Borehole Solutions
          </h2>
          <p className="mt-4 text-slate-600">
            We cover the entire lifecycle of professional water solutions. From locate-to-drilling, pump rigging, chemical treatment, and eco-friendly solar powering.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tab-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:bg-white hover:border-brand-blue-light hover:shadow-xl hover:shadow-brand-blue-light/5 transition-all flex flex-col justify-between h-full cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedService(service)}
            >
              {/* Card Water droplet hover outline decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-light/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>

              <div>
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-brand-blue-dark group-hover:bg-brand-blue-dark group-hover:text-white transition-colors duration-300 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-5 group-hover:text-brand-blue-dark transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mt-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="border-t border-slate-200/60 mt-6 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="font-mono text-[10px] uppercase text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-md">
                  {service.category}
                </span>
                <span className="flex items-center gap-1 text-brand-blue-dark group-hover:gap-2 transition-all">
                  Details &amp; Tech Specs <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative"
              >
                {/* Header Banner */}
                <div className="relative h-48 bg-slate-100 flex-shrink-0">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <button
                    id="btn-close-service-modal"
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-brand-orange text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full">
                      {selectedService.category} Solutions
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">// OVERVIEW</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {selectedService.fullDesc}
                    </p>
                  </div>

                  {/* Project Timeline & Key Tools */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-brand-orange mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-display font-bold text-sm text-slate-900">Est. Project Timeline</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">{selectedService.timeline}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-brand-blue-dark mb-2">
                        <ClipboardCheck className="w-4 h-4" />
                        <span className="font-display font-bold text-sm text-slate-900">Key Machinery &amp; Tools</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedService.equipment.map((eq, i) => (
                          <span key={i} className="bg-brand-blue-dark/10 text-brand-blue-dark text-[10px] px-2 py-0.5 rounded-md font-mono">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Materials & Components */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">// PREMIUM MATERIALS WE USE</h4>
                    <ul className="space-y-2.5">
                      {selectedService.materials.map((material, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Design Guidelines */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">// ELITE GATE STANDARDS</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedService.features.map((feat, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-light flex-shrink-0"></span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="text-xs text-slate-500 text-center sm:text-left">
                    Professional, sustainable engineering conforming to Nigerian water regulations.
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id="btn-close-service-drawer"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Close Details
                    </button>
                    <button
                      id="btn-select-service-quote"
                      onClick={() => {
                        onSelectServiceForQuote(selectedService.id);
                        setSelectedService(null);
                      }}
                      className="flex-1 sm:flex-none px-5 py-2 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Estimate Cost
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
