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

  const filteredDoctors =
    selectedDeptFilter === 'all'
      ? DOCTORS
      : DOCTORS.filter((d) => d.departmentId === selectedDeptFilter);

  const departmentsList = [
    { id: 'all', label: 'All Specialists' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'surgery', label: 'General Surgery' },
    { id: 'orthopedics', label: 'Orthopedics' },
    { id: 'emergency', label: 'Emergency Care' },
    { id: 'obgyn', label: 'Obstetrics' },
  ];

  return (
    <section id="doctors" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
          Distinguished Medical Faculty
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Our Doctors & Specialists
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Meet our board-certified department chairs and attending physicians, leaders in clinical research, surgical innovation, and empathetic bedside care.
        </p>

        {/* Department Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {departmentsList.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptFilter(dept.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                selectedDeptFilter === dept.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="group bg-white rounded-3xl overflow-hidden border border-cyan-100/80 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:border-cyan-200 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Doctor Photo */}
              <div className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-cyan-50 to-teal-50 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Department Pill Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-xs text-teal-800 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {doc.departmentName}
                  </span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-cyan-200 font-medium">
                    {doc.experience}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-slate-200 font-medium">
                    {doc.qualification}
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
                    Specialty Focus
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {doc.specialty}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{doc.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{doc.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: View Profile & Book Appointment */}
            <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-3">
              <button
                onClick={() => onSelectDoctor(doc)}
                className="py-2.5 px-3 rounded-xl border border-cyan-200 hover:border-teal-400 bg-cyan-50/50 hover:bg-cyan-100/60 text-teal-800 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Profile</span>
              </button>
              <button
                onClick={() => onBookDoctor(doc)}
                className="py-2.5 px-3 rounded-xl bg-[#4ea8b6] hover:bg-[#3d95a3] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
