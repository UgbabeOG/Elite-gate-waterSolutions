/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Eye, Construction, Layers, ShieldCheck, TestTube, Gift, 
  Clock, Hammer, CheckCircle2, ChevronRight, Play 
} from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  duration: string;
  icon: React.ReactNode;
  subtitle: string;
  checklist: string[];
  equipment: string[];
  details: string;
}

export default function ProjectProcessTracker() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: ProcessStep[] = [
    {
      step: 1,
      title: 'Site Inspection & Consultation',
      duration: '1 - 2 Hours',
      icon: <Eye className="w-5 h-5 text-brand-orange" />,
      subtitle: 'Understanding site topography and property boundaries.',
      checklist: [
        'Inspect property access lines for heavy drilling truck entry',
        'Analyze overhead power cables and high-tension wires safety hazards',
        'Locate and isolate proximity to soakaways, septic tanks, and sewer systems (must be at least 15 meters away)',
        'Consult client on desired water volumes, tank locations, and water reticulation'
      ],
      equipment: ['Laser Distance Meter', 'Safety Access Markers', 'Aerial Mapping Drone'],
      details: 'A crucial safety step. We map the site to ensure the drilling location is hygienic, easily accessible by our hydraulic trucks, and far away from any contamination source such as septic soakaways.'
    },
    {
      step: 2,
      title: 'Geophysical Survey (Locate Water)',
      duration: '2 - 3 Hours',
      icon: <Compass className="w-5 h-5 text-brand-blue-light" />,
      subtitle: 'Mapping aquifers and electrical resistivity arrays.',
      checklist: [
        'Setup Vertical Electrical Sounding (VES) electrode configurations',
        'Measure electrical resistance variations across subterranean depths',
        'Plot and analyze geological curves to isolate fractured rock aquifer zones',
        'Mark the high-yield coordinates and generate an official hydrological report'
      ],
      equipment: ['Abem Terrameter SAS 1000', 'Copper Grounding Electrodes', 'VES Cable Reels'],
      details: 'Using electromagnetic and electrical resistivity surveys, we determine the optimal location and depth to hit high-purity water, eliminating the risk of dry wells.'
    },
    {
      step: 3,
      title: 'Borehole Drilling',
      duration: '1 - 2 Days',
      icon: <Construction className="w-5 h-5 text-amber-500" />,
      subtitle: 'Rig setup, hydraulic rotary or pneumatic percussion hammer.',
      checklist: [
        'Securely level and anchor the massive hydraulic drilling rig',
        'Begin drilling, switching from rotary mud-drilling to pneumatic compressor drilling when hitting rock',
        'Regularly extract rock spoils/chips to log the physical geological stratigraphy',
        'Drill past the water table deep into the underlying basement fractured rock to ensure year-round supply'
      ],
      equipment: ['Heavy Hydraulic Crawler Drilling Rig', 'High-Capacity Air Compressor (350 PSI)', 'Drill Rods & Alloy Tricone Bits'],
      details: 'Our operators drill down to the optimal depth. We log the rock and sand strata types as we drill, adapting our tools from clay blades to high-impact pneumatic diamond bits for granite.'
    },
    {
      step: 4,
      title: 'Casing & Gravel Packing',
      duration: '4 - 6 Hours',
      icon: <Layers className="w-5 h-5 text-teal-500" />,
      subtitle: 'Installing food-grade UPVC and sand-arresting filter gravel.',
      checklist: [
        'Lower premium Class-D thick-walled 5" or 6" UPVC casings down the entire drilled depth',
        'Place precision-slotted screen casings precisely inside the water-yielding aquifer zones',
        'Shovel clean, round-grain inert silica river gravel around the casings to pack and filter fine sand',
        'Install rubber casing centralizers to ensure the pipes stay perfectly centered in the hole'
      ],
      equipment: ['Rig Winch System', 'Casing Centralizers', 'Silica River Gravel Shovels'],
      details: 'Casing secures the borehole walls from cave-ins. The slotted screen sections let pure water flow into the pipe while the packed river gravel captures any fine sand particles.'
    },
    {
      step: 5,
      title: 'Pump Installation',
      duration: '3 - 5 Hours',
      icon: <Hammer className="w-5 h-5 text-brand-blue-dark" />,
      subtitle: 'Installing submersible pump, riser pipes, and auto-controllers.',
      checklist: [
        'Solder and seal the heavy submersible electric pump unit with waterproof resin joints',
        'Connect pump to high-pressure galvanized or HDPE riser water-delivery pipes',
        'Lower pump to the calculated dynamic water depth using heavy-duty security safety ropes',
        'Wire the digital control box complete with float switches and voltage surge protectors'
      ],
      equipment: ['Megger Insulation Tester', 'Waterproof Heat Shrink Kit', 'Pipe Wrench & Hoists'],
      details: 'We install premium-brand submersible pumps sized exactly for your well depth. High-quality electrical wiring and sensors protect the motor from voltage surges or running dry.'
    },
    {
      step: 6,
      title: 'Water Testing & Treatment',
      duration: '1 Day',
      icon: <TestTube className="w-5 h-5 text-violet-500" />,
      subtitle: 'Chemical flushing, yield testing, and filtration design.',
      checklist: [
        'Perform high-pressure chemical well development flushing to wash out residual drilling clay/mud',
        'Run a continuous pump yield test (drawdown test) to calculate sustained gallons per hour flow',
        'Take water samples for comprehensive chemical and bacteriological lab analysis',
        'Install and calibrate specific iron-removal, sand, or carbon filtration treatment systems'
      ],
      equipment: ['Water Flow Gauge', 'pH & TDS Handheld Meters', 'Chemical Dosing Pump'],
      details: 'We chemically wash the well to maximize clean flow. Samples are gathered to check for iron, acidity, or pathogens. If needed, we hook up customized water filtration treatment towers.'
    },
    {
      step: 7,
      title: 'Final Commissioning',
      duration: '1 - 2 Hours',
      icon: <Gift className="w-5 h-5 text-emerald-500" />,
      subtitle: 'Client training, documentation, and handover.',
      checklist: [
        'Final check of automated pumping switches and overhead water tank plumbing feeds',
        'Brief and train the client/facility manager on control box operation and safety indicators',
        'Provide Borehole Completion Certificate, Geological Log Sheets, and Pump Warranty cards',
        'Turn on the valves and officially hand over your new personal water independence!'
      ],
      equipment: ['System Documentation Folders', 'Pressure Guage Callibration Tools'],
      details: 'We test the complete automated system and train you on how to monitor your water system. Your borehole completion certificate and technical data log sheets are officially handed over.'
    }
  ];

  const currentStepData = steps.find(s => s.step === activeStep) || steps[0];

  return (
    <section id="process" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
            // RIGOROUS ENGINEERING CYCLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
            Our 7-Step Quality Project Process
          </h2>
          <p className="mt-4 text-slate-600">
            We follow a strictly engineered, systematic workflow to guarantee that your borehole remains highly productive, sand-free, and clean for decades.
          </p>
        </div>

        {/* Stepper Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: 7 Stepper buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((st) => {
              const isSelected = st.step === activeStep;
              const isPassed = st.step < activeStep;
              return (
                <button
                  key={st.step}
                  id={`btn-step-nav-${st.step}`}
                  onClick={() => setActiveStep(st.step)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-left border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                    isSelected 
                      ? 'bg-brand-orange text-white' 
                      : isPassed 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {st.step}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-display text-xs font-bold tracking-wider uppercase ${isSelected ? 'text-brand-orange' : 'text-slate-400'}`}>
                      Phase 0{st.step}
                    </div>
                    <div className={`font-display text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {st.title}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-brand-orange' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Step Detailed Preview Panel */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden"
            >
              {/* Giant backdrop watermark */}
              <div className="absolute right-0 top-0 font-display font-black text-9xl text-slate-100 select-none pointer-events-none transform translate-x-10 -translate-y-6">
                0{currentStepData.step}
              </div>

              <div className="relative z-10">
                
                {/* Header info */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                    {currentStepData.icon}
                  </div>
                  <div>
                    <span className="text-brand-orange font-mono text-[10px] uppercase font-bold tracking-wider">
                      PROJECT PHASE 0{currentStepData.step} / 07
                    </span>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mt-0.5">
                      {currentStepData.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle & Details */}
                <p className="text-slate-800 font-medium text-sm mt-5 leading-relaxed">
                  {currentStepData.subtitle}
                </p>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  {currentStepData.details}
                </p>

                {/* Timeline and Machinery bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 py-4 border-y border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      Step Duration
                    </div>
                    <div className="text-slate-800 font-display font-bold text-sm mt-1">
                      {currentStepData.duration}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Active Safety Tools
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {currentStepData.equipment.map((eq, k) => (
                        <span key={k} className="bg-slate-100 text-slate-600 text-[9px] px-2 py-0.5 rounded-md font-mono">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Quality Checklist */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    // ELITE GATE QUALITY GATE CRITERIA
                  </h4>
                  <ul className="space-y-3">
                    {currentStepData.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                        <span className="text-slate-600 text-xs leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation actions within the process */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-mono">
                    Water solutions engineered to last.
                  </span>
                  
                  {activeStep < 7 ? (
                    <button
                      id="btn-process-next"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-4 py-2 bg-brand-blue-dark hover:bg-brand-blue-dark/95 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Next Phase (0{activeStep + 1})
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="btn-process-restart"
                      onClick={() => setActiveStep(1)}
                      className="px-4 py-2 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      Restart Process Walkthrough
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
