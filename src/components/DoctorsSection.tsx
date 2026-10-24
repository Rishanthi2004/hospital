import React, { useState } from 'react';
import { Calendar, UserCheck, Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { DOCTORS, Doctor } from '../data/hospitalData';

interface DoctorsSectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctor,
  onBookDoctor,
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  const [showAllDoctors, setShowAllDoctors] = useState<boolean>(false);

  const filteredDoctors =
    selectedDeptFilter === 'all'
      ? DOCTORS
      : DOCTORS.filter((d) => d.departmentId === selectedDeptFilter);

  const displayedDoctors = showAllDoctors || selectedDeptFilter !== 'all' ? filteredDoctors : filteredDoctors.slice(0, 3);

  const departmentsList = [
    { id: 'all', label: 'All' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'surgery', label: 'Surgery' },
    { id: 'orthopedics', label: 'Orthopedics' },
  ];

  return (
    <section id="doctors" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
          Medical Faculty
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
          Our Senior Specialists
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Experienced doctors providing trusted diagnosis and patient-centered care.
        </p>

        {/* Department Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
          {departmentsList.map((dept) => (
            <button
              key={dept.id}
              onClick={() => {
                setSelectedDeptFilter(dept.id);
                if (dept.id !== 'all') setShowAllDoctors(true);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedDeptFilter === dept.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedDoctors.map((doc) => (
          <div
            key={doc.id}
            className="group bg-white rounded-2xl overflow-hidden border border-cyan-100/80 shadow-2xs hover:shadow-lg hover:border-cyan-200 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Doctor Photo */}
              <div className="relative h-48 sm:h-64 w-full bg-gradient-to-b from-cyan-50 to-teal-50 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                
                {/* Department Pill */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 text-teal-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                    {doc.departmentName}
                  </span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] text-cyan-200 font-medium">
                    {doc.experience}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    {doc.name}
                  </h3>
                  <div className="text-[11px] text-slate-200 font-normal truncate">
                    {doc.qualification}
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-3.5 sm:p-4">
                <p className="text-xs text-slate-700 font-medium line-clamp-1 mb-2">
                  {doc.specialty}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-cyan-50/50 p-2 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate text-[11px] font-medium">{doc.availability}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3.5 sm:p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectDoctor(doc)}
                className="py-2 px-2.5 rounded-lg border border-cyan-200 hover:bg-cyan-50 text-teal-800 text-xs font-semibold transition-colors text-center cursor-pointer"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => onBookDoctor(doc)}
                className="py-2 px-2.5 rounded-lg bg-[#4ea8b6] hover:bg-[#3d95a3] text-white text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Fewer Doctors Toggle */}
      {selectedDeptFilter === 'all' && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShowAllDoctors(!showAllDoctors)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-teal-200 bg-teal-50/60 hover:bg-teal-100/60 text-teal-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>{showAllDoctors ? 'Show Fewer Specialists' : `View All ${DOCTORS.length} Specialists`}</span>
          </button>
        </div>
      )}
    </section>
  );
};
