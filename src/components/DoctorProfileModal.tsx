import React from 'react';
import { X, Award, Clock, Globe, BookOpen, Calendar, ShieldCheck } from 'lucide-react';
import { Doctor } from '../data/hospitalData';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBook,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-cyan-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Doctor Photo */}
        <div className="relative bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 sm:p-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/80 shadow-md shrink-0 bg-slate-800">
              <img
                src={doctor.image}
                alt={doctor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-block bg-teal-500/80 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                {doctor.departmentName}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {doctor.name}
              </h2>
              <div className="text-xs text-teal-200 font-medium mb-1">
                {doctor.qualification}
              </div>
              <div className="text-xs text-slate-300">
                {doctor.title} · {doctor.experience}
              </div>
            </div>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[60vh] overflow-y-auto text-xs sm:text-sm">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-teal-700 text-xs mb-1.5">
              Clinical Expertise
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium">
              {doctor.specialty}
            </p>
          </div>

          <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Education & Fellowships</span>
                <span className="text-slate-600">{doctor.education}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Consultation Schedule</span>
                <span className="text-slate-600">{doctor.availability}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Languages Spoken</span>
                <span className="text-slate-600">{doctor.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Board-Certified Attending Physician with Full Clinical Hospital Privileges</span>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(doctor);
              }}
              className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-2.5 px-6 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book with {doctor.name.split(' ')[1] || doctor.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
