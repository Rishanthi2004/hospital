import React, { useState } from 'react';
import { Calendar, ChevronDown, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: (prefill?: { departmentId?: string; doctorId?: string; date?: string }) => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreServices }) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Filter doctors based on selected department if any
  const availableDoctors = selectedDept
    ? DOCTORS.filter((d) => d.departmentId === selectedDept)
    : DOCTORS;

  const handleHeroBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      departmentId: selectedDept || undefined,
      doctorId: selectedDoctor || undefined,
      date: selectedDate || undefined,
    });
  };

  return (
    <section id="home" className="pt-24 pb-8 sm:pt-28 sm:pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Hero Card with signature aqua-tinted curved styling from reference */}
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#cbeef2]/80 via-[#dff4f7]/70 to-[#e9f8f9]/90 border border-cyan-100 shadow-xl shadow-cyan-900/5 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
        {/* Background Doctor Consulting Patient Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hospital_hero_consultation_1792823508472.jpg"
            alt="Doctor consulting with patient in modern hospital room"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[70%_25%] sm:object-[65%_center] opacity-90"
          />
          {/* Aqua & White Soft Gradient Overlays for optimal readability matching reference */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d8f2f6]/95 via-[#d8f2f6]/85 to-transparent sm:via-[#d8f2f6]/75 sm:w-3/5 lg:w-1/2" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#cbeef2]/90 via-transparent to-transparent h-48 bottom-0" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-10 sm:pt-16 pb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-cyan-200/60 text-xs font-semibold text-teal-800 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span>Accredited General Hospital & Trauma Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-4 text-balance">
            Your Health, <br className="hidden sm:inline" />
            <span className="text-teal-900">Our Priority</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-lg">
            Compassionate Care for You and Your Family. Experience world-class medical expertise, 
            rapid diagnostic technology, and personalized healing suites.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-semibold px-6 py-3.5 rounded-full shadow-md shadow-cyan-600/20 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
            <button
              onClick={onExploreServices}
              className="bg-white/80 hover:bg-white text-slate-800 font-semibold px-6 py-3.5 rounded-full border border-cyan-200/80 backdrop-blur-sm shadow-xs transition-all hover:shadow-sm hover:text-teal-800 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cyan-200/60 max-w-md">
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">24/7</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Emergency Care</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">120+</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Top Specialists</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">99.4%</div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Patient Relief</div>
            </div>
          </div>
        </div>

        {/* Floating Appointment Booking Panel - Exact UI from Reference Image */}
        <div className="relative z-20 px-4 sm:px-10 lg:px-14 pb-6 sm:pb-8">
          <form
            onSubmit={handleHeroBookingSubmit}
            className="glass-panel-hero rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl shadow-cyan-950/10 border border-white/80"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
              {/* Department Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setSelectedDoctor('');
                    }}
                    className="w-full appearance-none bg-white/95 text-slate-800 text-sm font-medium rounded-xl py-3 pl-3.5 pr-9 border border-cyan-200/80 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs cursor-pointer"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Doctor Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
                  Doctor
                </label>
                <div className="relative">
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full appearance-none bg-white/95 text-slate-800 text-sm font-medium rounded-xl py-3 pl-3.5 pr-9 border border-cyan-200/80 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs cursor-pointer"
                  >
                    <option value="">Any Available Specialist</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.departmentName})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Date Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white/95 text-slate-800 text-sm font-medium rounded-xl py-2.5 px-3.5 border border-cyan-200/80 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Book Now Button matching teal pill in reference */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#4ea8b6] hover:bg-[#3d95a3] active:bg-[#348390] text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-cyan-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer h-[46px]"
                >
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
