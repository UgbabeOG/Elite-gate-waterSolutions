/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Check, ArrowLeft, ArrowRight, FileText, 
  MapPin, ShieldAlert, Zap, Layers3, Info, Droplets, RefreshCw
} from 'lucide-react';
import { ServiceType, ClientType, QuoteInput, QuoteResult } from '../types';

interface QuoteEstimatorProps {
  initialServiceId?: string;
  onApplyQuoteToBooking: (input: QuoteInput, result: QuoteResult) => void;
}

export default function QuoteEstimator({ initialServiceId, onApplyQuoteToBooking }: QuoteEstimatorProps) {
  const [step, setStep] = useState<number>(1);
  
  // State for quote input variables
  const [inputs, setInputs] = useState<QuoteInput>({
    serviceType: 'borehole_drilling',
    clientType: 'residential',
    state: 'Nasarawa',
    soilType: 'mixed',
    estimatedDepthFeet: 150,
    includeTreatment: false,
    includeSolar: false,
    includeTank: false,
    tankSizeLitres: 2000,
  });

  const [result, setResult] = useState<QuoteResult | null>(null);

  // Sync initial service selection if passed down
  useEffect(() => {
    if (initialServiceId) {
      setInputs(prev => ({
        ...prev,
        serviceType: initialServiceId as ServiceType,
        // Match appropriate options
        includeSolar: initialServiceId === 'solar_borehole',
        includeTreatment: initialServiceId === 'water_treatment',
        includeTank: initialServiceId === 'tank_installation',
      }));
      setStep(1); // Reset to step 1
    }
  }, [initialServiceId]);

  // Handle auto-adjusting geological soil profile based on the selected state
  const handleStateChange = (stateName: string) => {
    let soil: 'sandy' | 'clay' | 'rocky' | 'mixed' = 'mixed';
    let depth = 150;

    if (stateName === 'Nasarawa' || stateName === 'Kaduna') {
      soil = 'mixed';
      depth = 180;
    } else if (stateName === 'FCT / Abuja' || stateName === 'Plateau') {
      soil = 'rocky'; // Heavy basement granite rock
      depth = 220;
    } else if (stateName === 'Benue') {
      soil = 'clay';
      depth = 130;
    } else if (stateName === 'Lagos') {
      soil = 'sandy';
      depth = 120; // Coastal water levels are shallow
    } else if (stateName === 'Rivers' || stateName === 'Delta') {
      soil = 'sandy';
      depth = 100;
    }

    setInputs(prev => ({
      ...prev,
      state: stateName,
      soilType: soil,
      estimatedDepthFeet: depth
    }));
  };

  // Perform chemical cost logic calculation
  const calculateQuote = () => {
    // 1. Base Drilling Cost (₦ per foot)
    // Rocky granite requires air compressors & hammer bits - extremely expensive
    let ratePerFoot = 4500;
    if (inputs.soilType === 'rocky') ratePerFoot = 8500;
    else if (inputs.soilType === 'mixed') ratePerFoot = 6000;
    else if (inputs.soilType === 'clay') ratePerFoot = 4000;
    else if (inputs.soilType === 'sandy') ratePerFoot = 3800;

    let baseDrilling = inputs.estimatedDepthFeet * ratePerFoot;
    if (inputs.serviceType === 'borehole_rehab') {
      baseDrilling = 220000; // Flat rehabilitation flushing fee
    } else if (inputs.serviceType === 'water_treatment' || inputs.serviceType === 'tank_installation') {
      baseDrilling = 0; // Drilling doesn't apply to pure auxiliary installs
    }

    // 2. Casing Materials (UPVC high pressure casing)
    let casingCost = 0;
    if (inputs.serviceType === 'borehole_drilling' || inputs.serviceType === 'solar_borehole') {
      // ₦2,200 per foot of premium Class-D pressure casing
      casingCost = inputs.estimatedDepthFeet * 2500;
    }

    // 3. Submersible Pump Cost (scales with client scale)
    let pumpCost = 0;
    if (inputs.serviceType !== 'water_treatment' && inputs.serviceType !== 'tank_installation') {
      if (inputs.clientType === 'residential') {
        pumpCost = 280000; // 1.0 HP Pedrollo/Franklin
      } else if (inputs.clientType === 'agricultural') {
        pumpCost = 550000; // 3.0 HP High Yield solar pump
      } else if (inputs.clientType === 'commercial') {
        pumpCost = 680000; // 3.0 HP High Head Multistage
      } else if (inputs.clientType === 'industrial') {
        pumpCost = 1250000; // 5.5 HP Heavy duty industrial pump
      }
    }

    // 4. Water Treatment Add-on
    let treatmentCost = 0;
    if (inputs.includeTreatment || inputs.serviceType === 'water_treatment') {
      if (inputs.clientType === 'residential') {
        // High iron filtration system
        treatmentCost = inputs.state === 'Rivers' || inputs.state === 'Lagos' ? 380000 : 250000;
      } else if (inputs.clientType === 'commercial' || inputs.clientType === 'agricultural') {
        treatmentCost = 850000; // Automatic backwash double vessel
      } else {
        treatmentCost = 3500000; // Industrial reverse osmosis skid
      }
    }

    // 5. Solar Power Add-on
    let solarCost = 0;
    if (inputs.includeSolar || inputs.serviceType === 'solar_borehole') {
      if (inputs.clientType === 'residential') {
        solarCost = 580000; // 4x 450W Monocrystalline + solar inverter controller
      } else if (inputs.clientType === 'commercial' || inputs.clientType === 'agricultural') {
        solarCost = 1450000; // 10x Panels + MPPT high torque controller
      } else {
        solarCost = 4200000; // Heavy industrial solar array with DC backup
      }
    }

    // 6. Overhead Water Tank Tower Add-on
    let towerCost = 0;
    if (inputs.includeTank || inputs.serviceType === 'tank_installation') {
      const isLarge = inputs.tankSizeLitres > 3000;
      if (inputs.clientType === 'residential') {
        towerCost = isLarge ? 550000 : 380000; // 3m vs 6m galvanized tower + tank
      } else if (inputs.clientType === 'agricultural' || inputs.clientType === 'commercial') {
        towerCost = 850000; // 6m heavy steel H-beam tower + 5000L tank
      } else {
        towerCost = 2800000; // 12m structural space-frame tower + 10,000L reservoirs
      }
    }

    // 7. Geological difficulty surcharge/mobilization
    let geologySurcharge = 0;
    if (inputs.soilType === 'rocky') {
      geologySurcharge = 120000; // Rig compression mobilization surcharge
    } else if (inputs.state === 'Lagos' || inputs.state === 'Rivers' || inputs.state === 'Delta') {
      geologySurcharge = 80000; // Transport logistics to southern sites
    }

    // Calculate totals
    const subtotal = baseDrilling + casingCost + pumpCost + treatmentCost + solarCost + towerCost + geologySurcharge;
    const taxAndRegulatory = Math.round(subtotal * 0.055); // 5.5% Hydrological & local development taxes
    const discount = inputs.includeSolar && inputs.includeTreatment ? Math.round(subtotal * 0.04) : 0; // 4% multi-package discount
    const total = subtotal + taxAndRegulatory - discount;

    // Define estimated project duration
    let timeline = '3 - 5 Days';
    if (inputs.serviceType === 'borehole_rehab' || inputs.serviceType === 'water_treatment') timeline = '1 - 2 Days';
    else if (inputs.soilType === 'rocky') timeline = '4 - 7 Days';
    else if (inputs.clientType === 'industrial') timeline = '7 - 14 Days';

    setResult({
      baseDrillingCost: baseDrilling,
      casingMaterialsCost: casingCost,
      pumpInstallationCost: pumpCost,
      treatmentSystemCost: treatmentCost,
      solarSystemCost: solarCost,
      tankTowerCost: towerCost,
      geologySurcharge,
      subtotal,
      taxAndRegulatory,
      discount,
      total,
      timelineDays: timeline
    });

    setStep(5); // Go to invoice display step
  };

  // List of states in Nigeria we support
  const supportedStates = [
    'Nasarawa', 'FCT / Abuja', 'Kaduna', 'Plateau', 'Benue', 'Lagos', 'Rivers', 'Delta', 'Kano'
  ];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateQuote();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section id="quote-calculator" className="py-20 bg-mesh border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
            // PRICE TRANSPARENCY
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
            Interactive Borehole &amp; Water Cost Estimator
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Get an instant, customized cost calculation based on current Nigerian material pricing, specific state geology, and energy solutions.
          </p>
        </div>

        {/* Wizard Main Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden min-h-[500px] flex flex-col justify-between">
          
          {/* Top Progress bar */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-blue-dark" />
              <span className="font-display font-bold text-sm text-slate-800">
                {step === 5 ? 'Your Estimated Quote' : `Project Configuration (Step ${step} of 4)`}
              </span>
            </div>
            {step < 5 && (
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`w-8 h-1.5 rounded-full transition-colors ${
                      i <= step ? 'bg-brand-blue-dark' : 'bg-slate-200'
                    }`}
                  ></span>
                ))}
              </div>
            )}
          </div>

          {/* Core Body Container */}
          <div className="p-6 sm:p-8 flex-1">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Select Service / Project Scope */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">What service is required for your project?</h3>
                    <p className="text-slate-500 text-xs">Choose the primary water engineering scope needed. This sets our starting engineering calculations.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'borehole_drilling', title: 'New Borehole Drilling', desc: 'Standard complete well casing, packing, flushing, and pump installation.' },
                      { id: 'solar_borehole', title: 'Solar Powered Well System', desc: 'Drilling with advanced solar pump panel rigging for zero grid fuel dependencies.' },
                      { id: 'water_treatment', title: 'Water Treatment Plant only', desc: 'Advanced FRP chemical filtration setup on your existing well or supply.' },
                      { id: 'tank_installation', title: 'Tank Tower & Reticulation only', desc: 'Heavy structural steel stanchions plus distribution plumbing lines.' },
                      { id: 'borehole_rehab', title: 'Borehole Rehabilitation', desc: 'Flushing out mud, descaling screen scales, repairing casing slots, pump service.' }
                    ].map((srv) => (
                      <button
                        key={srv.id}
                        id={`btn-quote-service-${srv.id}`}
                        onClick={() => setInputs(prev => ({ ...prev, serviceType: srv.id as ServiceType }))}
                        className={`p-4 rounded-2xl text-left border cursor-pointer transition-all ${
                          inputs.serviceType === srv.id
                            ? 'bg-brand-blue-dark/5 border-brand-blue-dark shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-slate-900 text-sm">{srv.title}</span>
                          {inputs.serviceType === srv.id && (
                            <span className="w-4 h-4 rounded-full bg-brand-blue-dark flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] leading-relaxed mt-2">{srv.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Client Type / Volume Scale */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">What is the client scale and sector?</h3>
                    <p className="text-slate-500 text-xs">This regulates pump horse-power levels, flow thresholds, and structural casing strength needed.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'residential', title: 'Residential Household', desc: '1HP-1.5HP pump. Family household, garden flow, overhead tank plumbing, 2,000L tank capacity.' },
                      { id: 'commercial', title: 'Commercial Office / Real Estate', desc: '3HP pump. Offices, rental apartments, hotels, high volume daily flush requirements.' },
                      { id: 'agricultural', title: 'Agricultural Farm / Irrigation', desc: '3HP-5HP solar DC pump. Heavy livestock feeding, massive drip irrigation, fish ponds, continuous run.' },
                      { id: 'industrial', title: 'Industrial Plant / Communities', desc: '5.5HP-10HP pump. Large schools, bottling plants, hospital hygiene, central community distribution towers.' }
                    ].map((clt) => (
                      <button
                        key={clt.id}
                        id={`btn-quote-client-${clt.id}`}
                        onClick={() => setInputs(prev => ({ ...prev, clientType: clt.id as ClientType }))}
                        className={`p-4 rounded-2xl text-left border cursor-pointer transition-all ${
                          inputs.clientType === clt.id
                            ? 'bg-brand-blue-dark/5 border-brand-blue-dark shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-slate-900 text-sm">{clt.title}</span>
                          {inputs.clientType === clt.id && (
                            <span className="w-4 h-4 rounded-full bg-brand-blue-dark flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] leading-relaxed mt-2">{clt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location (State) & Geological Strata */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Select site location state in Nigeria</h3>
                    <p className="text-slate-500 text-xs">Soil composition alters drilling mechanics and the type of drilling rig required. Lagos sand is easy to drill but prone to salinity, whereas Abuja and Nasarawa are rocky.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: State Dropdown */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-700 block">Site State Location</label>
                      <select
                        id="select-quote-state"
                        value={inputs.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-sm focus:border-brand-blue-dark focus:ring-1 focus:ring-brand-blue-dark"
                      >
                        {supportedStates.map((st) => (
                          <option key={st} value={st}>{st} State</option>
                        ))}
                      </select>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-2 text-xs text-slate-500 mt-4 leading-relaxed">
                        <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-700">HQ Office Coverage:</span> We mobilize our core heavy fleet from Nasarawa &amp; FCT Abuja. Out-of-state sites require minor logistical adjustments.
                        </div>
                      </div>
                    </div>

                    {/* Right: Geological profile summary cards */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-brand-orange">
                          AUTO-DETECTED GEOLOGY
                        </span>
                        <h4 className="text-base font-display font-bold text-slate-900 capitalize mt-1">
                          {inputs.soilType} Strata Profile
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed mt-2">
                          {inputs.soilType === 'rocky' && 'Requires a pneumatic DTH hammer rig fitted with diamond-studded button bits and high-pressure compressors to break through igneous granite basement rock.'}
                          {inputs.soilType === 'mixed' && 'Combination of clay and hard gravel beds. Requires dual rotary mud-drilling and percussion compressors.'}
                          {inputs.soilType === 'clay' && 'Sedimentary soft layers. Drills faster, but requires dense casing screen pipes to prevent mud collapse.'}
                          {inputs.soilType === 'sandy' && 'Coastal sandy aquifers. Very easy drilling, but high risk of casing clogging and salinity. Requires premium sand gravel packing.'}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Manually override geology:</span>
                        <select
                          id="select-quote-soil"
                          value={inputs.soilType}
                          onChange={(e) => setInputs(prev => ({ ...prev, soilType: e.target.value as any }))}
                          className="p-1 border border-slate-300 rounded-md text-xs bg-white text-slate-800 cursor-pointer"
                        >
                          <option value="sandy">Sandy Soil</option>
                          <option value="clay">Clay Soil</option>
                          <option value="mixed">Mixed/Gravel</option>
                          <option value="rocky">Granite/Rocky</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Drilling Depth & Add-on components */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-1">Depth and Engineering Add-ons</h3>
                    <p className="text-slate-500 text-xs">Configure the physical details of the installation to match your power, storage, and purification goals.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Depth Slider */}
                    {inputs.serviceType !== 'water_treatment' && inputs.serviceType !== 'tank_installation' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">Estimated Drilling Depth:</span>
                          <span className="font-mono font-bold text-brand-blue-dark text-sm bg-brand-blue-dark/10 px-2.5 py-0.5 rounded-md">
                            {inputs.estimatedDepthFeet} Feet ({Math.round(inputs.estimatedDepthFeet * 0.3048)} Meters)
                          </span>
                        </div>
                        <input
                          id="range-quote-depth"
                          type="range"
                          min="100"
                          max="400"
                          step="10"
                          value={inputs.estimatedDepthFeet}
                          onChange={(e) => setInputs(prev => ({ ...prev, estimatedDepthFeet: parseInt(e.target.value) }))}
                          className="w-full accent-brand-blue-dark cursor-ew-resize h-2 bg-slate-200 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>100ft (Shallow aquifer)</span>
                          <span>250ft (Standard bedrock)</span>
                          <span>400ft (Deep pure industrial well)</span>
                        </div>
                      </div>
                    )}

                    {/* Checkboxes Add-ons */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <label className="text-xs font-semibold text-slate-700 block">Select Integration Packages</label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Water treatment add-on */}
                        <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
                          <input
                            id="chk-quote-treatment"
                            type="checkbox"
                            checked={inputs.includeTreatment || inputs.serviceType === 'water_treatment'}
                            disabled={inputs.serviceType === 'water_treatment'}
                            onChange={(e) => setInputs(prev => ({ ...prev, includeTreatment: e.target.checked }))}
                            className="w-4 h-4 mt-0.5 rounded-sm border-slate-300 text-brand-blue-dark focus:ring-brand-blue-dark"
                          />
                          <div>
                            <span className="font-display font-semibold text-xs text-slate-900 block">Water Treatment</span>
                            <span className="text-[10px] text-slate-400">Chemical iron filter, backwash purification</span>
                          </div>
                        </label>

                        {/* Solar pump power add-on */}
                        <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
                          <input
                            id="chk-quote-solar"
                            type="checkbox"
                            checked={inputs.includeSolar || inputs.serviceType === 'solar_borehole'}
                            disabled={inputs.serviceType === 'solar_borehole'}
                            onChange={(e) => setInputs(prev => ({ ...prev, includeSolar: e.target.checked }))}
                            className="w-4 h-4 mt-0.5 rounded-sm border-slate-300 text-brand-blue-dark focus:ring-brand-blue-dark"
                          />
                          <div>
                            <span className="font-display font-semibold text-xs text-slate-900 block">Solar-Powered Pump</span>
                            <span className="text-[10px] text-slate-400">Monocrystalline panels &amp; inverter</span>
                          </div>
                        </label>

                        {/* Tank & Tower add-on */}
                        <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
                          <input
                            id="chk-quote-tank"
                            type="checkbox"
                            checked={inputs.includeTank || inputs.serviceType === 'tank_installation'}
                            disabled={inputs.serviceType === 'tank_installation'}
                            onChange={(e) => setInputs(prev => ({ ...prev, includeTank: e.target.checked }))}
                            className="w-4 h-4 mt-0.5 rounded-sm border-slate-300 text-brand-blue-dark focus:ring-brand-blue-dark"
                          />
                          <div>
                            <span className="font-display font-semibold text-xs text-slate-900 block">Tank &amp; Steel Tower</span>
                            <span className="text-[10px] text-slate-400">Structural stanchion &amp; reservoir</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Expandable Tank Size Slider */}
                    {(inputs.includeTank || inputs.serviceType === 'tank_installation') && (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">Overhead Tank Size:</span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {inputs.tankSizeLitres.toLocaleString()} Litres
                          </span>
                        </div>
                        <select
                          id="select-quote-tank-size"
                          value={inputs.tankSizeLitres}
                          onChange={(e) => setInputs(prev => ({ ...prev, tankSizeLitres: parseInt(e.target.value) }))}
                          className="w-full p-2 border border-slate-300 bg-white rounded-lg text-xs text-slate-800"
                        >
                          <option value={1000}>1,000L Slimline Polyethylene Reservoir</option>
                          <option value={2000}>2,000L Premium Double-wall Tank</option>
                          <option value={5000}>5,000L Heavy Duty Storage Reservoir</option>
                          <option value={10000}>10,000L Commercial/Industrial Grade Tank</option>
                        </select>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Render Estimated Invoice Receipt */}
              {step === 5 && result && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Decorative green badge */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
                    <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-emerald-800">Your Quote Estimate is Ready!</h4>
                      <p className="text-emerald-700 text-[11px] leading-relaxed">
                        Values are derived dynamically from current raw materials and equipment benchmarks in Nasarawa &amp; FCT Abuja.
                      </p>
                    </div>
                  </div>

                  {/* Printable Invoice Card */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    {/* Invoice header logo and state */}
                    <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-brand-orange font-mono font-bold text-xs tracking-wider uppercase">
                          ELITE GATE WATER SOLUTIONS
                        </span>
                        <h4 className="text-lg font-display font-black tracking-tight leading-none mt-1">
                          PROVISIONAL BUDGET ESTIMATE
                        </h4>
                      </div>
                      <div className="text-left sm:text-right text-xs">
                        <div className="text-slate-400 font-mono">Date: July 2026</div>
                        <div className="text-brand-blue-light font-bold">State: {inputs.state} State</div>
                      </div>
                    </div>

                    {/* Invoice details grid */}
                    <div className="p-6 space-y-4 text-xs">
                      
                      {/* Configuration line elements */}
                      <div className="grid grid-cols-2 gap-y-2 pb-4 border-b border-slate-100 text-slate-500">
                        <div>Project Category:</div>
                        <div className="text-right font-semibold text-slate-800 capitalize">
                          {inputs.serviceType.replace('_', ' ')}
                        </div>
                        <div>Client/Volume Scale:</div>
                        <div className="text-right font-semibold text-slate-800 capitalize">{inputs.clientType}</div>
                        <div>Soil/Subsurface Type:</div>
                        <div className="text-right font-semibold text-slate-800 capitalize">{inputs.soilType} geological strata</div>
                        {inputs.serviceType !== 'water_treatment' && inputs.serviceType !== 'tank_installation' && (
                          <>
                            <div>Estimated Well Depth:</div>
                            <div className="text-right font-semibold text-slate-800 font-mono">
                              {inputs.estimatedDepthFeet} Feet ({Math.round(inputs.estimatedDepthFeet * 0.3048)}m)
                            </div>
                          </>
                        )}
                        <div>Est. Engineering Timeline:</div>
                        <div className="text-right font-semibold text-slate-800 font-mono">{result.timelineDays}</div>
                      </div>

                      {/* Financial Line items */}
                      <div className="space-y-2.5 pt-2">
                        {result.baseDrillingCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Borehole Drilling (Drill rods, rig operations):</span>
                            <span className="font-mono font-bold text-slate-800">₦{result.baseDrillingCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.casingMaterialsCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Premium High-pressure Casing &amp; Screens:</span>
                            <span className="font-mono font-bold text-slate-800">₦{result.casingMaterialsCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.pumpInstallationCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Submersible Pump, Cables &amp; Controls:</span>
                            <span className="font-mono font-bold text-slate-800">₦{result.pumpInstallationCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.treatmentSystemCost > 0 && (
                          <div className="flex justify-between text-indigo-700">
                            <span className="font-medium">★ Integrated Water Treatment Plant:</span>
                            <span className="font-mono font-bold">₦{result.treatmentSystemCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.solarSystemCost > 0 && (
                          <div className="flex justify-between text-amber-700">
                            <span className="font-medium">★ Solar-Power Panel Rig &amp; DC MPPT Inverter:</span>
                            <span className="font-mono font-bold">₦{result.solarSystemCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.tankTowerCost > 0 && (
                          <div className="flex justify-between text-teal-700">
                            <span className="font-medium">★ Structural Steel Tower &amp; Reservoir Tank:</span>
                            <span className="font-mono font-bold">₦{result.tankTowerCost.toLocaleString()}</span>
                          </div>
                        )}
                        {result.geologySurcharge > 0 && (
                          <div className="flex justify-between text-slate-500">
                            <span>Surcharge (Geology hammer/Transportation):</span>
                            <span className="font-mono font-semibold">₦{result.geologySurcharge.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Subtotal, Tax and Discount */}
                      <div className="border-t border-slate-100 pt-4 space-y-2 text-slate-500">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-mono">₦{result.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Hydrological Tax &amp; Regulatory Fees (5.5%):</span>
                          <span className="font-mono">₦{result.taxAndRegulatory.toLocaleString()}</span>
                        </div>
                        {result.discount > 0 && (
                          <div className="flex justify-between text-emerald-600 text-[11px]">
                            <span>Multi-integration Package Discount (4%):</span>
                            <span className="font-mono">-₦{result.discount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Final Total Cost */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center mt-4">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 block">ESTIMATED TOTAL OUTLAY</span>
                          <span className="text-xl font-display font-extrabold text-slate-900 font-mono">
                            ₦{result.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-slate-400 block">APPROX. USD EQUIVALENT</span>
                          <span className="text-xs font-semibold text-slate-600 font-mono">
                            ${Math.round(result.total / 1550).toLocaleString()} USD
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Informational Warning */}
                  <div className="flex gap-2 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs leading-relaxed">
                    <Info className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Important Notice:</span> This is a digital cost estimate. Actual aquifer depth and rock strata layers vary locally. An on-site Geophysical Survey is strictly mandatory to establish exact geological depths and confirm official custom pricing.
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom wizard footer buttons */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                id="btn-quote-back"
                onClick={handlePrevStep}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                id="btn-quote-next"
                onClick={handleNextStep}
                className="px-5 py-2 bg-brand-blue-dark hover:bg-brand-blue-dark/95 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ml-auto"
              >
                {step === 4 ? 'Calculate Cost' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
                <button
                  id="btn-quote-recalculate"
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Configure New Well
                </button>
                <button
                  id="btn-quote-book"
                  onClick={() => {
                    if (result) {
                      onApplyQuoteToBooking(inputs, result);
                    }
                  }}
                  className="flex-1 sm:flex-none px-5 py-2 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Schedule Free Site Survey
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
