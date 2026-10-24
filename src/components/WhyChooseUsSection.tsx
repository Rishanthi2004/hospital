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
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
          Why Choose Us
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Your Health in Safe Hands
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Top doctors, modern equipment, and dedicated patient care.
        </p>
      </div>

      {/* 4 Clean Feature Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {WHY_CHOOSE_US.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-cyan-100/90 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e6f7f9] flex items-center justify-center mb-3 group-hover:scale-105 transition-all">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 group-hover:text-teal-800 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
