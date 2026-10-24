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
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredDepts =
    filterCategory === 'all'
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.category === filterCategory);

  // Show 4 departments by default (first four) for a clean, balanced layout
  const displayedDepts = showAll || filterCategory !== 'all' ? filteredDepts : filteredDepts.slice(0, 4);

  const getDepartmentIcon = (iconName: string) => {
    const props = { className: 'w-8 h-8 sm:w-11 sm:h-11 text-[#2a9aa9]', strokeWidth: 1.75 };
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
    <section id="departments" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
          Specialized Care
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
          Our Key Departments
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Expert doctors and modern facilities across essential clinical specialties.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
          {[
            { id: 'all', label: 'All' },
            { id: 'critical', label: 'Emergency' },
            { id: 'specialized', label: 'Specialized' },
            { id: 'primary', label: 'Family Care' },
            { id: 'diagnostic', label: 'Diagnostics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilterCategory(tab.id);
                if (tab.id !== 'all') setShowAll(true);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards Grid: 2 per row on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayedDepts.map((dept) => (
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
            className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-between text-center border border-cyan-100/80 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all cursor-pointer hover:-translate-y-0.5"
          >
            {/* Top Right Arrow Indicator */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 rounded-full bg-cyan-50/80 text-slate-400 group-hover:text-teal-700 group-hover:bg-cyan-100 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3 h-3" />
            </div>

            {/* Icon Bubble */}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#e8f8fa] to-[#d8f4f7] flex items-center justify-center mb-2.5 sm:mb-4 group-hover:scale-105 transition-transform">
              {getDepartmentIcon(dept.iconName)}
            </div>

            {/* Department Title */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-800 transition-colors mb-1 line-clamp-1">
                {dept.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                {dept.description}
              </p>
            </div>

            {/* Subtle Footer */}
            <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate text-slate-500 font-medium">
                {dept.waitTimesAvg}
              </span>
              <span className="text-teal-600 font-semibold group-hover:underline">
                View &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Toggle (Short & sweet on mobile) */}
      {filterCategory === 'all' && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-teal-200 bg-teal-50/60 hover:bg-teal-100/60 text-teal-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>{showAll ? 'Show Fewer Departments' : `View All ${DEPARTMENTS.length} Departments`}</span>
          </button>
        </div>
      )}
    </section>
  );
};
