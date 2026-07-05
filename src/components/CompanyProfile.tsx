/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Heart, Award, Users, Trash2, CheckCircle2, ChevronRight, Check } from 'lucide-react';

interface ValueCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function CompanyProfile() {
  const [activeValueIndex, setActiveValueIndex] = useState<number>(0);

  const coreValues: ValueCard[] = [
    {
      title: 'Integrity',
      description: 'We believe in honest pricing, high-quality materials, and absolute transparency in all our borehole survey and drilling depths. No hidden charges.',
      icon: <Shield className="w-6 h-6 text-brand-orange" />,
      color: 'border-brand-orange bg-brand-orange/5',
    },
    {
      title: 'Professionalism',
      description: 'Our licensed geophysicists, certified engineers, and expert drillers handle every site with the highest level of industry expertise and standard operating procedures.',
      icon: <Award className="w-6 h-6 text-brand-blue-light" />,
      color: 'border-brand-blue-light bg-brand-blue-light/5',
    },
    {
      title: 'Quality Service Delivery',
      description: 'We use thick-walled, premium-grade PVC/steel casings, heavy-duty submersible pumps, and optimal gravel packing to ensure your borehole lasts for decades without collapsing.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
      color: 'border-emerald-500 bg-emerald-500/5',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Our job is not finished until you have crystal clear, high-pressure water flowing directly into your tanks. We provide excellent after-sales support and pump maintenance.',
      icon: <Heart className="w-6 h-6 text-brand-red" />,
      color: 'border-brand-red bg-brand-red/5',
    },
    {
      title: 'Environmental Responsibility',
      description: 'We ensure safe drilling practices, proper geological logging, strict waste mud management, and minimal ecosystem disruption during site excavation.',
      icon: <Trash2 className="w-6 h-6 text-teal-500" />,
      color: 'border-teal-500 bg-teal-500/5',
    },
  ];

  const hseStandards = [
    {
      title: 'Safe Drilling Operations',
      desc: 'Our crew operates under strict PPE requirements. We perform rigorous pre-drilling equipment checks and use secure safety barriers around excavation pits.',
      number: '01'
    },
    {
      title: 'Environmental Protection',
      desc: 'We manage and isolate drilling fluid/bentonite slurry, preventing surface runoff into local drainage systems or surrounding soil.',
      number: '02'
    },
    {
      title: 'Proper Waste Mud Management',
      desc: 'Drilling waste and physical spoils are safely collected, backfilled, or disposed of in certified landfills, leaving your property spotless.',
      number: '03'
    },
    {
      title: 'Compliance with Regulatory Standards',
      desc: 'We fully comply with the Nigeria Hydrological Services Agency (NIHSA) and the National Water Resources Institute guidelines.',
      number: '04'
    }
  ];

  const clientSegments = [
    {
      title: 'Individuals & Households',
      desc: 'Secure residential water independence. No more buying expensive water tankers. Continuous flow for kitchens, baths, and lawns.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      badge: 'Residential'
    },
    {
      title: 'Estates & Communities',
      desc: 'High-yield centralized solar-powered boreholes, massive overhead tank reticulation systems, and local distribution piping.',
      image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=600',
      badge: 'Community'
    },
    {
      title: 'Farms & Agricultural Businesses',
      desc: 'Sustainable water solutions for drip irrigation, fisheries, livestock watering, and poultry feeds, powered by high-efficiency solar arrays.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
      badge: 'Agriculture'
    },
    {
      title: 'Schools, Hospitals & Industries',
      desc: 'Industrial-grade deep boreholes, multi-stage filtration towers, and high-volume water distribution that meets regulatory sanitary codes.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
      badge: 'Commercial'
    }
  ];

  const stats = [
    { label: 'Boreholes Drilled', value: '450+' },
    { label: 'Success Rate', value: '99.4%' },
    { label: 'States Reached', value: '12+' },
    { label: 'Solar Systems Fitted', value: '180+' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section Header & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
              // ABOUT ELITE GATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
              Nigeria's Reputable Leader in Borehole Drilling &amp; Water Engineering
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              Elite Gate Multi Enterprises Nigeria Ltd is a registered and highly reputable borehole drilling and water engineering company committed to providing reliable, sustainable, and cost-effective water solutions across Nigeria.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We specialize in deep borehole drilling, precise geophysical site investigations, submersible pump installations, and chemical water treatments. Whether it's a household in Mararaba, an agricultural farm in Nasarawa, an estate in Abuja, or an industrial facility across Nigeria, we deliver clean water using advanced hydraulic rigs and skilled water professionals.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-brand-blue-dark">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-mono mt-1 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange to-brand-blue-light rounded-2xl blur-lg opacity-20"></div>
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 bg-brand-blue-light/10 text-brand-blue-dark rounded-xl">
                  <Award className="w-5 h-5 text-brand-blue-dark" />
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900">Our Sacred Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                "Our mission is to deliver clean water to every community and household through modern drilling technology, highly skilled professionals, environmentally compliant practices, and excellent customer service."
              </p>
              <div className="border-t border-slate-100 my-6"></div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-brand-orange rounded-full"></span>
                  Modern Rigs
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-brand-blue-light rounded-full"></span>
                  Clean Water
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  100% Reliable
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Core Values Interactive Dial */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-blue-light font-mono font-semibold tracking-wider text-sm uppercase">
              // VALUE SYSTEM
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-2">
              Our Core Values
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Click on each value to see how it drives our commitment to excellence and water purity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left selector menu */}
            <div className="lg:col-span-5 flex flex-col gap-2 justify-center">
              {coreValues.map((val, idx) => (
                <button
                  key={idx}
                  id={`btn-value-${idx}`}
                  onClick={() => setActiveValueIndex(idx)}
                  className={`flex items-center justify-between p-4 rounded-xl text-left transition-all border ${
                    activeValueIndex === idx
                      ? 'bg-white border-brand-blue-dark shadow-md translate-x-1 font-semibold text-brand-blue-dark'
                      : 'bg-transparent border-transparent hover:bg-white/60 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{idx + 1}.</span>
                    <span className="font-display">{val.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeValueIndex === idx ? 'rotate-90 text-brand-blue-dark' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>

            {/* Right details content */}
            <div className="lg:col-span-7 flex">
              <motion.div
                key={activeValueIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-full p-8 rounded-2xl border flex flex-col justify-between shadow-sm relative overflow-hidden bg-white ${coreValues[activeValueIndex].color}`}
              >
                {/* Visual Water Wave Background Accent */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4">
                  <div className="w-64 h-64 rounded-full bg-brand-blue-light"></div>
                </div>

                <div>
                  <div className="p-3 bg-white rounded-xl shadow-sm inline-block border border-slate-200/55 mb-6">
                    {coreValues[activeValueIndex].icon}
                  </div>
                  <h4 className="text-2xl font-display font-bold text-slate-900 mb-4">
                    {coreValues[activeValueIndex].title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {coreValues[activeValueIndex].description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
                  <span className="w-5 h-5 bg-brand-blue-dark/10 flex items-center justify-center rounded-full">
                    <Check className="w-3 h-3 text-brand-blue-dark" />
                  </span>
                  Elite Gate Quality Guarantee
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Health, Safety & Environment Section */}
        <div className="my-20 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-semibold bg-brand-orange/10 px-3 py-1 rounded-full">
                HSE Compliance
              </span>
              <h3 className="text-3xl font-display font-bold tracking-tight mt-4">
                Health, Safety &amp; Environment (HSE)
              </h3>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Water is life, and safety is our priority. We are fiercely committed to safe drilling operations, protecting subterranean aquifers from contamination, and leaving a clean surface footprint.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-brand-orange shrink-0" />
                <div>
                  <div className="font-semibold text-white">ISO Compliant Practices</div>
                  <div className="text-xs text-slate-400">Environmentally Sound Methods</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hseStandards.map((std, i) => (
                <div key={i} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-brand-orange/30 transition-colors">
                  <div className="text-lg font-mono font-bold text-brand-orange mb-3">{std.number}</div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2">{std.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Target Clients */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-orange font-mono font-semibold tracking-wider text-sm uppercase">
              // OUR DEMOGRAPHICS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-2">
              Who We Serve Across Nigeria
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              From residential backyards in Nasarawa to massive multi-hectare industrial sites and community solar projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientSegments.map((segment, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={segment.image}
                    alt={segment.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full">
                      {segment.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-900 mb-2">{segment.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{segment.desc}</p>
                  </div>
                  <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs text-brand-blue-dark font-medium">
                    <span>Explore Solutions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
