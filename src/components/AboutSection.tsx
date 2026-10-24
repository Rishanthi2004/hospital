import React from 'react';
import { ShieldCheck, Heart, Sparkles, Building, CheckCircle2, Award } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-10 sm:py-16 bg-gradient-to-b from-white via-[#f0f9fa]/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          {/* Left Column: Hospital Interior Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="/assets/images/hospital_interior_hall_1792823509439.jpg"
                alt="CarePlus General Hospital Modern Lobby"
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-72 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-600/90 text-[11px] font-semibold mb-1">
                  <Award className="w-3 h-3" />
                  NABH & JCI Accredited
                </span>
                <div className="text-sm font-bold">CarePlus Medical Center</div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Trust Points */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
              About Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
              Compassionate Care, Modern Technology
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Over 25 years of trusted healthcare in Tamil Nadu, combining experienced specialists with modern diagnostic and surgical facilities.
            </p>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
              {[
                { title: '24/7 Emergency Care', desc: 'Instant trauma response' },
                { title: '50+ Top Doctors', desc: 'Board-certified specialists' },
                { title: 'Advanced Labs & MRI', desc: 'Rapid accurate reports' },
                { title: 'Affordable Care', desc: 'All major insurance covered' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-3 border border-cyan-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pl-5">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-semibold px-5 py-2.5 rounded-full shadow-xs text-xs sm:text-sm transition-all cursor-pointer"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
