/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, Activity, Filter, CheckCircle2, Droplet, 
  Sparkles, Compass, HelpCircle, ArrowRight 
} from 'lucide-react';
import { WaterIssue } from '../types';

export default function WaterDiagnostic({ onApplyFilterToQuote }: { onApplyFilterToQuote: () => void }) {
  const [selectedIssueId, setSelectedIssueId] = useState<string>('iron');
  const [isSimulatingFilter, setIsSimulatingFilter] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);

  const waterIssues: WaterIssue[] = [
    {
      id: 'iron',
      symptomName: 'Reddish-Brown Stains',
      problemTitle: 'High Iron & Manganese Contamination',
      description: 'Your water looks clear when pumped but turns orange/brown upon exposure to air, leaving ugly stains on bathroom tiles, sinks, toilet bowls, and destroying white laundry.',
      causes: [
        'Soluble divalent iron (Fe2+) present in subterranean clay beds',
        'Anaerobic soil environment dissolving iron oxides into groundwater',
        'Rusting of carbon-steel casing pipes in low-quality wells'
      ],
      severity: 'high',
      solutionName: 'Manganese Greensand Oxidation Filtration',
      solutionDetails: 'We install custom FRP vessels loaded with catalyst greensand media. The media oxidizes soluble iron into physical rust particles and traps them. The system cleans itself automatically via pressurized backwashing.'
    },
    {
      id: 'odor',
      symptomName: 'Rotten Egg / Foul Smell',
      problemTitle: 'Hydrogen Sulfide Gas & Anaerobic Bacteria',
      description: 'Water has an offensive gas smell resembling rotten eggs, which is highly unappealing for drinking, bathing, or cooking.',
      causes: [
        'Anaerobic sulfur-reducing bacteria digesting organic matter deep underground',
        'Chemical reduction of sulfates in stagnant aquifers',
        'Potential proximity of the borehole to a faulty sewage soakaway'
      ],
      severity: 'high',
      solutionName: 'Aeration + Activated Carbon Purification',
      solutionDetails: 'We install an aeration header that releases the dissolved gases, followed by a heavy-duty Activated Carbon Filter vessel that completely adsorbs organic odors and toxic compounds.'
    },
    {
      id: 'scale',
      symptomName: 'Chalky Limescale Crusts',
      problemTitle: 'High Mineral Hardness (Calcium & Magnesium)',
      description: 'White chalky crusts accumulate inside your water kettles, shower heads, geysers, and pipes. Soap refuses to lather, leaving your skin dry and itchy.',
      causes: [
        'Water flowing through natural underground limestone, gypsum, or dolomite mineral beds',
        'High bicarbonate alkalinity dissolving calcium compounds into the aquifer water'
      ],
      severity: 'medium',
      solutionName: 'Cation-Exchange Resin Water Softener',
      solutionDetails: 'We install an automatic ion-exchange water softener. It replaces calcium and magnesium minerals with harmless sodium ions, completely eliminating scaling and restoring lathering.'
    },
    {
      id: 'muddy',
      symptomName: 'Sandy or Cloudy Water',
      problemTitle: 'High Turbidity & Well Sand Pumping',
      description: 'The water pumped is physically muddy, cloudy, or contains fine yellow sandy grains that settle at the bottom of your tanks, clogging your taps.',
      causes: [
        'Poorly packed river gravel or split casing screen slots',
        'Inadequate well-development/flushing after initial drilling',
        'Drilling rig stopping prematurely in clay strata'
      ],
      severity: 'medium',
      solutionName: 'Multimedia Sand Filtration & Deep Well Flushing',
      solutionDetails: 'First, we air-flush the borehole using 350 PSI air compressors to extract built-up mud. Then we install a multi-stage silica-sand sediment filter vessel to catch micro-particles.'
    },
    {
      id: 'acidic',
      symptomName: 'Bitter Taste / Corrosive Stains',
      problemTitle: 'Low pH (Acidic Groundwater)',
      description: 'Water has an unpleasant, sharp metallic taste. You notice bluish-green stains on copper fittings and your plumbing pipes are developing pinhole leaks.',
      causes: [
        'High levels of dissolved Carbon Dioxide creating carbonic acid',
        'Runoff from local acidic soil tables filtering into shallow aquifers'
      ],
      severity: 'medium',
      solutionName: 'Calcite Neutralizing Filter or Soda-Ash Dosing',
      solutionDetails: 'We install a Calcite neutralizer filter that slowly dissolves harmless calcium carbonate into the water, raising the pH naturally to a neutral, safe level of 7.0 to 7.4.'
    }
  ];

  const currentIssue = waterIssues.find(i => i.id === selectedIssueId) || waterIssues[0];

  const runFilterSimulation = () => {
    setIsSimulatingFilter(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulatingFilter(false);
      setSimulationComplete(true);
    }, 3000);
  };

  return (
    <section id="water-diagnostics" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
              // WATER CHEMISTRY ADVISOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
              Is Your Borehole Water Dirty? Run a Digital Diagnosis
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm">
              Groundwater is not always pure. Depending on your geographical location in Nigeria (like the high-iron aquifers of Rivers or the hard limescale water of local states), your well may require specific treatment.
            </p>
            <p className="mt-2 text-slate-600 leading-relaxed text-sm">
              Select your water's physical symptoms below to explore the scientific cause, severity, and view an interactive demonstration of how Elite Gate filtration restores water purity.
            </p>

            {/* Selector Grid Buttons */}
            <div className="flex flex-col gap-2 mt-8">
              {waterIssues.map((issue) => (
                <button
                  key={issue.id}
                  id={`btn-diag-${issue.id}`}
                  onClick={() => {
                    setSelectedIssueId(issue.id);
                    setSimulationComplete(false);
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                    selectedIssueId === issue.id
                      ? 'bg-brand-orange/5 border-brand-orange shadow-xs font-semibold text-brand-orange'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="font-display text-sm">{issue.symptomName}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${selectedIssueId === issue.id ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostics Panel Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
              {/* Visual Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 space-y-5">
                {/* Severity pill */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-slate-400">
                    <Activity className="w-4 h-4 text-brand-orange" />
                    Aquifer Chemistry Analysis
                  </div>
                  <span className={`text-[9px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    currentIssue.severity === 'high' 
                      ? 'bg-brand-red/20 text-brand-red border border-brand-red/30' 
                      : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                  }`}>
                    Severity: {currentIssue.severity}
                  </span>
                </div>

                {/* Problem details */}
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight">
                    {currentIssue.problemTitle}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {currentIssue.description}
                  </p>
                </div>

                {/* Subsurface causes */}
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">// SCIENTIFIC CAUSES</h4>
                  <ul className="space-y-1.5">
                    {currentIssue.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-brand-orange mt-0.5">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Engineering Setup */}
                <div className="border-t border-slate-800 pt-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-brand-blue-light font-bold uppercase tracking-widest block">RECOMMENDED TREATMENT PLANT</span>
                    <span className="text-sm font-display font-bold text-white mt-0.5 block">{currentIssue.solutionName}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {currentIssue.solutionDetails}
                  </p>
                </div>

                {/* Interactive Filter Simulator Sandbox */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-3">
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase">// FILTER VESSEL SIMULATOR</span>
                    <button
                      id="btn-run-filter-simulation"
                      onClick={runFilterSimulation}
                      disabled={isSimulatingFilter}
                      className="text-[10px] font-bold text-brand-blue-light hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {isSimulatingFilter ? 'Purifying...' : 'Test Purification Flow'}
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Visual animation block */}
                  <div className="h-20 bg-slate-900 rounded-xl flex items-center justify-between p-4 relative overflow-hidden border border-slate-800">
                    
                    {/* Unfiltered Input node */}
                    <div className="text-center z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isSimulatingFilter 
                          ? 'bg-slate-800 border-slate-700' 
                          : simulationComplete 
                            ? 'bg-slate-800 border-slate-700' 
                            : 'bg-amber-950 border-brand-orange animate-pulse'
                      }`}>
                        <Droplet className={`w-4 h-4 ${
                          isSimulatingFilter 
                            ? 'text-slate-500' 
                            : simulationComplete 
                              ? 'text-slate-500' 
                              : 'text-brand-orange'
                        }`} />
                      </div>
                      <span className="text-[8px] text-slate-500 block mt-1 font-mono uppercase">RAW WELL</span>
                    </div>

                    {/* Pipe flow animation */}
                    <div className="flex-1 h-1 bg-slate-800 mx-2 relative overflow-hidden rounded-full">
                      {isSimulatingFilter && (
                        <div className="absolute inset-y-0 bg-brand-orange w-1/3 animate-wave rounded-full"></div>
                      )}
                      {simulationComplete && (
                        <div className="absolute inset-0 bg-brand-blue-light rounded-full"></div>
                      )}
                    </div>

                    {/* Treatment Media Cylinder */}
                    <div className="text-center z-10">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                        isSimulatingFilter 
                          ? 'bg-brand-blue-dark border-brand-blue-light animate-pulse' 
                          : simulationComplete 
                            ? 'bg-slate-800 border-slate-700' 
                            : 'bg-slate-800 border-slate-700'
                      }`}>
                        <Filter className={`w-5 h-5 ${isSimulatingFilter ? 'text-white' : 'text-slate-500'}`} />
                      </div>
                      <span className="text-[8px] text-slate-500 block mt-1 font-mono uppercase">FRP MEDIA</span>
                    </div>

                    {/* Pipe flow output */}
                    <div className="flex-1 h-1 bg-slate-800 mx-2 relative overflow-hidden rounded-full">
                      {isSimulatingFilter && (
                        <div className="absolute inset-y-0 bg-brand-blue-light w-1/4 animate-wave rounded-full" style={{ animationDelay: '1s' }}></div>
                      )}
                      {simulationComplete && (
                        <div className="absolute inset-0 bg-brand-blue-light rounded-full"></div>
                      )}
                    </div>

                    {/* Pure water output node */}
                    <div className="text-center z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        simulationComplete 
                          ? 'bg-brand-blue-light/10 border-brand-blue-light shadow-md shadow-brand-blue-light/20' 
                          : 'bg-slate-800 border-slate-700'
                      }`}>
                        <Droplet className={`w-4 h-4 ${simulationComplete ? 'text-brand-blue-light' : 'text-slate-600'}`} />
                      </div>
                      <span className="text-[8px] text-slate-500 block mt-1 font-mono uppercase">PURE TAP</span>
                    </div>

                    {/* Floating sparkling stars on success */}
                    {simulationComplete && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-12">
                        <Sparkles className="w-4 h-4 text-brand-blue-light animate-bounce" />
                        <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                      </div>
                    )}
                  </div>

                  {simulationComplete && (
                    <p className="text-[10px] text-emerald-400 font-semibold text-center mt-3 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Filter successfully oxidized and trapped dissolved sediment compounds.
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button
                    id="btn-add-treatment-filter"
                    onClick={onApplyFilterToQuote}
                    className="w-full py-2.5 bg-brand-blue-light hover:bg-brand-blue-light/95 text-slate-900 font-display font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    Add This Treatment to My Cost Estimate
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
