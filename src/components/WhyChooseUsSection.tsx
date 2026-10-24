import React from 'react';
import {
  Stethoscope,
  Cpu,
  Clock,
  HeartHandshake,
  Building2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/hospitalData';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-teal-600', strokeWidth: 2 };
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
          The CarePlus Difference
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Why Choose CarePlus General Hospital
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We combine internationally recognized medical talent with thoughtful patient amenities 
          to ensure you receive the safest, most comforting hospital experience.
        </p>
      </div>

      {/* 6 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {WHY_CHOOSE_US.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-cyan-100/90 shadow-sm hover:shadow-lg hover:shadow-cyan-900/5 hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-[#e6f7f9] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#d4f2f5] transition-all">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-teal-700">
              <span>CarePlus Standard of Excellence</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
