import React from 'react';
import { ShieldCheck, Heart, Sparkles, Building, CheckCircle2, Award } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#f0f9fa]/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hospital Interior Image with Trust Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/10 border-4 border-white">
              <img
                src="/src/assets/images/hospital_interior_hall_1792823509439.jpg"
                alt="CarePlus General Hospital Modern Lobby and Reception"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600/90 backdrop-blur-xs text-xs font-semibold mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>JCI Gold Seal of Approval</span>
                </div>
                <div className="text-lg font-bold">CarePlus Medical Main Atrium</div>
                <div className="text-xs text-cyan-100">Meadowbrook Health Campus · Built for Patient Peace & Healing</div>
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 glass-panel rounded-2xl p-4 sm:p-5 shadow-xl border border-cyan-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
                  25+
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Years of Service</div>
                  <div className="text-xs text-slate-500">Over 500,000 Lives Touched with Compassion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision, and Patient-First Philosophy */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
              About CarePlus Medical
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Compassionate, Modern Medicine Centered Entirely Around You
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              CarePlus Medical was founded with a singular purpose: to bring together top-tier clinical specialists, 
              surgical precision, and empathetic patient care in a tranquil, hospitality-inspired environment. 
              We treat the person, not just the ailment.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-cyan-100 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-teal-700 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To deliver accessible, evidence-based medical treatments with utmost transparency, respect, and clinical excellence for every patient.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-cyan-100 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To be the region’s premier healthcare destination where medical breakthroughs meet human warmth and rapid patient recovery.
                </p>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="space-y-3 mb-8">
              {[
                'Patient-First Bedside Philosophy: Every decision places your comfort, dignity, and recovery first.',
                'State-of-the-Art Clean Facilities: HEPA air filtration, single-patient suites, and private family lounges.',
                'Multidisciplinary Tumor & Surgical Boards: Collaborative consults ensure no detail is overlooked.',
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              >
                Schedule a Visit or Consultation
              </button>
              <a
                href="#contact"
                className="text-teal-700 hover:text-teal-800 text-sm font-semibold underline underline-offset-4"
              >
                Campus Location & Visiting Hours &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
