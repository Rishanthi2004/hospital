import React from 'react';
import { X, MapPin, Clock, User, CheckCircle2, Calendar, Activity } from 'lucide-react';
import { Department } from '../data/hospitalData';

interface DepartmentDetailModalProps {
  department: Department | null;
  onClose: () => void;
  onBook: (departmentId: string) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  onClose,
  onBook,
}) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-cyan-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#dcf4f7] to-[#eef9fa] p-6 border-b border-cyan-100 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-white/80 px-2.5 py-0.5 rounded-full">
                {department.category} Care
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {department.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            {department.description}
          </p>

          {/* Department Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{department.floor}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Average Wait: {department.waitTimesAvg}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 col-span-1 sm:col-span-2 pt-2 border-t border-slate-200/60">
              <User className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Department Chief: <strong>{department.headDoctor}</strong></span>
            </div>
          </div>

          {/* Key Clinical Procedures */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Specialized Procedures & Clinical Units
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {department.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Back to Overview
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(department.id);
              }}
              className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-2.5 px-6 rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book in this Department</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
