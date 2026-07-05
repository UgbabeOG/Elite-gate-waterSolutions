/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, Sun, Droplets, ShieldAlert, CheckCircle, 
  Calendar, Info, RefreshCw, ChevronRight, HelpCircle 
} from 'lucide-react';

interface MaintenanceTip {
  id: string;
  category: 'borehole' | 'solar' | 'system';
  title: string;
  frequency: 'Monthly' | 'Quarterly' | 'Bi-Annually' | 'Annually';
  description: string;
  steps: string[];
  importance: 'high' | 'medium' | 'low';
}

const MAINTENANCE_TIPS: MaintenanceTip[] = [
  {
    id: 'tip-1',
    category: 'solar',
    title: 'Solar Panel Dust & Pollutants Removal',
    frequency: 'Monthly',
    importance: 'high',
    description: 'Nasarawa, Abuja, and surrounding northern states experience heavy dust and harmattan haze. Dust accumulation on monocrystalline modules blocks sunlight and can reduce your water pumping yield by up to 35%.',
    steps: [
      'Clean panels early in the morning (6:00 AM - 8:00 AM) or late evening to prevent thermal shock from cold water hitting hot glass.',
      'Use a soft cloth, squeegee, or soft brush paired with clean, low-mineral water to avoid scratching the anti-reflective glass.',
      'Never use abrasive detergents or metal wire sponges. Simple pure water is sufficient to slide off dirt.',
      'Inspect the mounting stanchions to ensure heavy wind gusts haven\'t loosened structural bolt fittings.'
    ]
  },
  {
    id: 'tip-2',
    category: 'borehole',
    title: 'Submersible Pump Overload & Cable Check',
    frequency: 'Quarterly',
    importance: 'medium',
    description: 'Electric pump cables submerged deep inside aquifers can experience natural wear from water vibration or soil friction. Regular control box inspections prevent major motor burnouts.',
    steps: [
      'Check the control panel box readings for stable voltage (usually 220V for single-phase pumps).',
      'Look for any singeing, discoloration, or loose terminals inside the breaker switch box.',
      'Ensure the automatic dry-run sensor probe lights up correctly when testing dry aquifer cut-offs.',
      'Verify that the ground safety wire is securely connected to prevent electrical shock leaks in water taps.'
    ]
  },
  {
    id: 'tip-3',
    category: 'system',
    title: 'Overhead Reservoir Flushing & Disinfection',
    frequency: 'Bi-Annually',
    importance: 'high',
    description: 'Stored water naturally breeds bacterial biofilm, airborne pathogens, and silt sediments on tank walls. Clean reservoirs are mandatory for safe kitchen and domestic consumption.',
    steps: [
      'Isolate the overhead tank by shutting off supply valves to the building outlets.',
      'Drain the tank fully through the scour drain valve to discharge bottom-silt residue.',
      'Scrub the inside walls using clean water and a stiff nylon brush (no toxic domestic chemicals).',
      'Sanitize using a mild chlorine solution, rinse thoroughly, and flush twice before re-opening main distribution pipes.'
    ]
  },
  {
    id: 'tip-4',
    category: 'borehole',
    title: 'Water Yield Monitoring & Sand Intrusion Check',
    frequency: 'Monthly',
    importance: 'medium',
    description: 'A sudden decline in water volume or the presence of fine sand in tap water indicates changes in the aquifer or damage to the casing sand sleeves.',
    steps: [
      'Fill a 20-liter bucket from the direct borehole tap and note how many seconds it takes to fill (tracks GPM decline).',
      'Let the bucket sit undisturbed for 3 hours; inspect the bottom for fine silt or sand granules.',
      'If sand is present regularly, shut off pump operations immediately and call for a camera inspection to prevent pump damage.',
      'Verify that the wellhead sanitary cap is tightly sealed to stop reptiles and surface stormwater from spilling inside.'
    ]
  }
];

export default function MaintenanceTips() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'borehole' | 'solar' | 'system'>('all');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const filteredTips = activeCategory === 'all'
    ? MAINTENANCE_TIPS
    : MAINTENANCE_TIPS.filter(tip => tip.category === activeCategory);

  const getImportanceColor = (imp: string) => {
    switch (imp) {
      case 'high': return 'bg-rose-50 text-rose-700 border-rose-150';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-150';
      default: return 'bg-slate-50 text-slate-600 border-slate-150';
    }
  };

  return (
    <section id="maintenance-tips" className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-brand-blue-light/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold rounded-full border border-brand-orange/15 uppercase">
            <Wrench className="w-3.5 h-3.5" />
            <span>Monthly Care Calendar</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase tracking-tight">
            Preventative <span className="text-brand-orange">Maintenance Tips</span>
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Clean energy and pure water require routine diligence. Follow these expert schedules to extend your system\'s life and maximize return on your investment.
          </p>

          {/* Quick Category switcher */}
          <div className="flex justify-center gap-1.5 pt-4">
            {(['all', 'solar', 'borehole', 'system'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-white'
                    : 'bg-white hover:bg-slate-150 text-slate-600 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'Show All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Layout Grid */}
        <div className="space-y-6">
          {filteredTips.map((tip) => (
            <div 
              key={tip.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 text-left hover:shadow-md transition-all"
            >
              {/* Tip Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-brand-blue-dark/5 text-brand-blue-dark rounded-lg">
                    {tip.category === 'solar' && <Sun className="w-4.5 h-4.5 text-amber-500" />}
                    {tip.category === 'borehole' && <Droplets className="w-4.5 h-4.5 text-sky-500" />}
                    {tip.category === 'system' && <Wrench className="w-4.5 h-4.5 text-indigo-500" />}
                  </span>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
                      Routine Advisory
                    </span>
                    <h3 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm">
                      {tip.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-mono">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1 font-bold">
                    <Calendar className="w-3 h-3 text-brand-orange" />
                    {tip.frequency}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md border font-bold uppercase ${getImportanceColor(tip.importance)}`}>
                    {tip.importance} Priority
                  </span>
                </div>
              </div>

              {/* Tip Content */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                {tip.description}
              </p>

              {/* Interactive Checklist steps */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-150">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Action Steps Checklist (Interactive)
                </span>
                
                <div className="space-y-2">
                  {tip.steps.map((step, idx) => {
                    const stepKey = `${tip.id}-${idx}`;
                    const isDone = completedSteps[stepKey];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleStep(stepKey)}
                        className="w-full text-left flex items-start gap-3 p-1.5 hover:bg-slate-100/50 rounded-lg transition-colors cursor-pointer group"
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          isDone 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}>
                          {isDone && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                        <span className={`text-xs ${
                          isDone ? 'text-slate-400 line-through' : 'text-slate-700'
                        }`}>
                          {step}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ad-hoc Conversion Link to Increase Site Return Audits */}
        <div className="mt-8 text-center p-4 bg-brand-orange/5 border border-brand-orange/15 rounded-xl text-xs flex flex-col sm:flex-row items-center justify-center gap-2 font-medium text-slate-700">
          <Info className="w-4 h-4 text-brand-orange flex-shrink-0" />
          <span>Bookmark this advisor portal! We update care guides monthly matching rainy/dry harmattan seasons.</span>
        </div>

      </div>
    </section>
  );
}
