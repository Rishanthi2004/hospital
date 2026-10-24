import React from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, Calendar, Activity } from 'lucide-react';
import { Service } from '../data/hospitalData';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBook: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-cyan-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Image & Header */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="bg-teal-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
              {service.department}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[60vh] overflow-y-auto text-xs sm:text-sm">
          <p className="text-slate-600 leading-relaxed">
            {service.description}
          </p>

          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
              Standard Clinical Specifications & Highlights
            </h3>
            <ul className="space-y-2">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cyan-50/70 rounded-2xl p-4 border border-cyan-100 space-y-2 text-xs">
            {service.turnaroundTime && (
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Turnaround Time: <strong>{service.turnaroundTime}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Coverage: <strong>{service.coverage}</strong></span>
            </div>
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
                onBook(service);
              }}
              className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-2.5 px-6 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
