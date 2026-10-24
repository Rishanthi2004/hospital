import React, { useState } from 'react';
import {
  Ambulance,
  HeartPulse,
  Baby,
  Stethoscope,
  Bone,
  Syringe,
  Sparkles,
  ShieldPlus,
  Headphones,
  Eye,
  Smile,
  Scan,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { DEPARTMENTS, Department } from '../data/hospitalData';

interface DepartmentsSectionProps {
  onSelectDepartment: (dept: Department) => void;
  onBookDepartment: (deptId: string) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  onSelectDepartment,
  onBookDepartment,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredDepts =
    filterCategory === 'all'
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.category === filterCategory);

  const getDepartmentIcon = (iconName: string) => {
    const props = { className: 'w-10 h-10 sm:w-12 sm:h-12 text-[#2a9aa9]', strokeWidth: 1.75 };
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance {...props} />;
      case 'Baby':
        return <Baby {...props} />;
      case 'HeartPulse':
        return <HeartPulse {...props} />;
      case 'Stethoscope':
        return <Stethoscope {...props} />;
      case 'Bone':
        return <Bone {...props} />;
      case 'Syringe':
        return <Syringe {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'ShieldPlus':
        return <ShieldPlus {...props} />;
      case 'Headphones':
        return <Headphones {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'Smile':
        return <Smile {...props} />;
      case 'Scan':
        return <Scan {...props} />;
      default:
        return <HeartPulse {...props} />;
    }
  };

  return (
    <section id="departments" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
          Comprehensive Clinical Centers
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Our Departments
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From round-the-clock emergency trauma response to specialized pediatric and cardiovascular care, 
          our 12 clinical centers are staffed by world-renowned specialists.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Departments' },
            { id: 'critical', label: 'Emergency & Critical' },
            { id: 'specialized', label: 'Specialized Centers' },
            { id: 'primary', label: 'Primary & Family' },
            { id: 'diagnostic', label: 'Diagnostics & Lab' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/25 scale-[1.02]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards Grid: 4 per row on desktop, 2 per row on mobile (per reference specification) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment(dept)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectDepartment(dept);
              }
            }}
            className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col items-center justify-between text-center border border-cyan-100/80 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:border-cyan-300/80 transition-all duration-200 cursor-pointer hover:-translate-y-1"
          >
            {/* Top Right Quick Book / View Indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 rounded-full bg-cyan-50/70 text-slate-400 group-hover:text-teal-700 group-hover:bg-cyan-100 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>

            {/* Icon Bubble with Soft Aqua Gradient matching the Reference Image */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#e8f8fa] to-[#d8f4f7] flex items-center justify-center mb-4 sm:mb-6 shadow-inner group-hover:scale-105 transition-transform">
              {getDepartmentIcon(dept.iconName)}
            </div>

            {/* Department Title */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-1 line-clamp-2">
                {dept.name}
              </h3>
              <p className="hidden sm:block text-xs text-slate-500 line-clamp-2 mb-3">
                {dept.description}
              </p>
            </div>

            {/* Subtle Footer with Floor or Service Count */}
            <div className="w-full pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate max-w-[110px] sm:max-w-none text-slate-500 font-medium">
                {dept.waitTimesAvg}
              </span>
              <span className="text-teal-600 font-semibold group-hover:underline">
                Details &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
