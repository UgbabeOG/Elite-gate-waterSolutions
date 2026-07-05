/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'maintenance' | 'solar' | 'water_quality' | 'general';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'maintenance',
    question: 'How often does a borehole require flush-cleaning or physical maintenance?',
    answer: 'For standard residential and agricultural boreholes in Nigeria, we recommend a professional air-flush cleaning every 3 to 5 years. This process clears accumulated silt, clay, and bio-films that naturally build up at the bottom of the well over time, restoring optimal aquifer flow and maximizing the operational lifespan of your submersible water pump.'
  },
  {
    id: 'faq-2',
    category: 'solar',
    question: 'What is the longevity of the solar panels and submersible pumping system?',
    answer: 'Our tier-1 monocrystalline solar panels are engineered with a performance warranty of 25 years (operating at over 80% efficiency). The heavy-duty DC solar submersible pumps typically have an active mechanical lifespan of 8 to 12 years depending on water sediment levels. We integrate built-in dry-run protectors and surge controllers to safeguard the pump motor from dry aquifer states and lightning surges.'
  },
  {
    id: 'faq-3',
    category: 'water_quality',
    question: 'How can I test the chemical and biological safety of my borehole water?',
    answer: 'We recommend conducting a professional laboratory physicochemical and microbiological test immediately after drilling (which we facilitate), and subsequently once every year. Common parameters analyzed include iron concentrations, acidity (pH levels), total dissolved solids (TDS), and coliform bacterial counts. If contaminants are discovered, we design and install custom Sand, Carbon, or Manganese Greensand filtration plants to make it fully potable.'
  },
  {
    id: 'faq-4',
    category: 'maintenance',
    question: 'What are the main causes of borehole pump failure and how can they be prevented?',
    answer: 'The primary causes are low-quality electrical cabling, sand/abrasive sediment clogging the internal impellers, voltage fluctuations, and running the pump dry. Elite Gate prevents this by exclusively using high-thickness 100% pure copper power cables, installing sand-filtration intake sleeves, and installing automatic control boxes equipped with low-water sensors that shut off the pump when the water table falls.'
  },
  {
    id: 'faq-5',
    category: 'solar',
    question: 'Does the solar water pump function during rainy seasons or cloudy days?',
    answer: 'Yes! Modern monocrystalline solar cells are highly sensitive and generate electricity from ambient diffused sunlight even during cloudy or overcast days. While peak water pumping occurs under direct sunlight (typically 10:00 AM to 4:00 PM), our custom solar stanchion systems are sized mathematically to fill your overhead reservoir tanks completely during daylight hours, ensuring you have ample gravity-fed water throughout the night.'
  },
  {
    id: 'faq-6',
    category: 'water_quality',
    question: 'What is the difference between iron water and saline water, and how are they treated?',
    answer: 'Iron water has a metallic smell, stains laundry yellow/brown, and becomes cloudy when exposed to air; it is treated using aeration followed by Manganese Greensand or active carbon filters. Saline water (common in coastal aquifers) contains dissolved salts and has a brackish taste; it is treated using reverse osmosis (RO) desalination plants. Elite Gate conducts professional geological mapping before drilling to minimize salinity risk.'
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'Why does Elite Gate use thick-walled UPVC casing instead of cheaper light casings?',
    answer: 'Using lightweight, thin casing is a major cause of borehole collapse in Nigeria. Geological pressure over time can crush weak pipes, ruining the entire borehole and trapping the submersible pump inside. Elite Gate strictly uses heavy-duty, high-gauge pressure UPVC casings with secure threaded joints to ensure your borehole structure remains rock-solid for over 30 years.'
  }
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'maintenance' | 'solar' | 'water_quality'>('all');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = selectedCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(faq => faq.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'maintenance': return 'Borehole Maintenance';
      case 'solar': return 'Solar Systems & Longevity';
      case 'water_quality': return 'Water Quality & Safety';
      default: return 'General Advice';
    }
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-blue-light/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-0 top-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue-dark/10 text-brand-blue-dark text-xs font-mono font-bold rounded-full border border-brand-blue-dark/15 uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>Expert Water Advisory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight uppercase">
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark via-brand-blue-light to-brand-orange">
              Questions &amp; Guide
            </span>
          </h2>

          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Get clear, honest engineering answers regarding water well lifespan, solar energy reliability, water testing, and routine preventative maintenance.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 justify-center pt-6">
            {(['all', 'maintenance', 'solar', 'water_quality'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  // Auto close open FAQ to prevent out of viewport jump or empty states
                  setOpenId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-blue-light/50 bg-slate-50/50 shadow-xs'
                    : 'border-slate-200/80 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  id={`btn-faq-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-5 py-4.5 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-brand-orange tracking-widest block">
                      {getCategoryLabel(faq.category)}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-xs sm:text-sm group-hover:text-brand-blue-dark transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-brand-orange/10 text-brand-orange border-brand-orange/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Ad-hoc Conversion Banner */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-0.5">
            <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900">
              Have a specific water geology or design question?
            </h4>
            <p className="text-slate-500 text-[11px]">
              Chat directly with our lead water engineer, Samson Alacha, on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/2348037304834?text=Hello%20Elite%20Gate%20Water%20Enterprises%2C%20I%20have%20some%20technical%20questions%20about%20drilling%20depth%2C%20casing%2C%20or%20solar%20longevity.%20Kindly%20advise."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            Ask Engineer on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
