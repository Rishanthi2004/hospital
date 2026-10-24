import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  AlertTriangle,
  Car,
  Compass,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const ContactSection: React.FC = () => {
  const [mapMode, setMapMode] = useState<'standard' | 'campus' | 'parking'>('standard');

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-[#eef9fa]/60 to-[#f6fcfc] border-t border-cyan-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
            Location & Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact & Hospital Campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Conveniently situated with dedicated trauma ambulance access, 
            complimentary valet parking, and comprehensive emergency care around the clock.
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-lg shadow-rose-600/15 mb-10 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider font-extrabold text-rose-100">
                24/7 Level 1 Trauma & Cardiac Emergency Desk
              </div>
              <div className="text-lg sm:text-xl font-bold">
                Immediate Ambulance Dispatch & Direct Intake
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyHotline}`}
              className="bg-white hover:bg-rose-50 text-rose-600 font-extrabold px-6 py-3 rounded-full text-sm sm:text-base shadow-md transition-all whitespace-nowrap"
            >
              Emergency Hotline: {HOSPITAL_INFO.emergencyDisplay}
            </a>
          </div>
        </div>

        {/* 2-Column Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards and Hours */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-cyan-100 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Campus Address</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {HOSPITAL_INFO.address}
                </p>
                <div className="mt-2 text-xs font-semibold text-teal-700">
                  Main Entrance: North Meadowbrook Gate 2
                </div>
              </div>
            </div>

            {/* Direct Phone & Email */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-cyan-100 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Phone & Inquiries</h3>
                <div className="text-sm text-slate-700 space-y-1">
                  <div>
                    <span className="text-slate-500">General Switchboard:</span>{' '}
                    <a href={`tel:${HOSPITAL_INFO.phone}`} className="font-semibold text-teal-700 hover:underline">
                      {HOSPITAL_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Patient Appointments:</span>{' '}
                    <a href={`mailto:${HOSPITAL_INFO.appointmentsEmail}`} className="font-semibold text-teal-700 hover:underline">
                      {HOSPITAL_INFO.appointmentsEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-cyan-100 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h3 className="font-bold text-slate-900 text-base mb-2">Hospital Operating Hours</h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Emergency & Trauma Center</span>
                    <span className="font-bold text-teal-700">24 Hours / 7 Days</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Outpatient Consultation</span>
                    <span>Mon - Fri: 7:30 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Weekend Clinics</span>
                    <span>Sat: 8 AM - 6 PM | Sun: 9 AM - 4 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-slate-700">General Visiting Hours</span>
                    <span>Daily: 10:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Integration Area with Campus Guides */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-cyan-100 shadow-sm flex flex-col">
            {/* Map Controls Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-teal-600" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  CarePlus Medical Center Campus View
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setMapMode('standard')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    mapMode === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Map
                </button>
                <button
                  onClick={() => setMapMode('campus')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    mapMode === 'campus' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Campus Wings
                </button>
                <button
                  onClick={() => setMapMode('parking')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    mapMode === 'parking' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Parking & Valet
                </button>
              </div>
            </div>

            {/* Simulated Interactive Vector Map */}
            <div className="relative h-80 sm:h-96 w-full bg-[#e8f2f5] overflow-hidden flex items-center justify-center">
              {/* Stylized Map Grid and Roads */}
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Stylized Arterials */}
                  <path d="M 0 120 Q 250 140 600 110 T 1000 130" stroke="#94a3b8" strokeWidth="18" fill="none" />
                  <path d="M 320 0 Q 340 200 360 400" stroke="#94a3b8" strokeWidth="22" fill="none" />
                  <path d="M 0 120 Q 250 140 600 110 T 1000 130" stroke="#f8fafc" strokeWidth="12" fill="none" />
                  <path d="M 320 0 Q 340 200 360 400" stroke="#f8fafc" strokeWidth="16" fill="none" />
                  {/* Park / Greenery zone */}
                  <circle cx="160" cy="280" r="110" fill="#d1fae5" opacity="0.6" />
                </svg>
              </div>

              {/* Campus Overlay Mode Highlights */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Central Pin */}
                <div className="relative group cursor-pointer animate-bounce">
                  <div className="w-12 h-12 rounded-full bg-teal-600 border-4 border-white shadow-xl flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                    CarePlus Main Hospital
                  </div>
                </div>

                {mapMode === 'campus' && (
                  <div className="mt-14 glass-panel rounded-xl p-3 border border-cyan-200 text-xs text-slate-700 shadow-md max-w-xs text-center animate-in fade-in">
                    <span className="font-bold text-teal-800">Wing A:</span> Emergency & ICU · <span className="font-bold text-teal-800">Wing B:</span> Heart Center · <span className="font-bold text-teal-800">Wing C:</span> Pediatrics
                  </div>
                )}

                {mapMode === 'parking' && (
                  <div className="mt-14 glass-panel rounded-xl p-3 border border-cyan-200 text-xs text-slate-700 shadow-md max-w-xs text-center animate-in fade-in">
                    <span className="font-bold text-teal-800">Visitor Parking Garage:</span> Multi-level (Free for 3 hours) with EV chargers and free valet at Main Drop-off.
                  </div>
                )}
              </div>

              {/* Corner Map Compass */}
              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-xs text-slate-600 border border-slate-200">
                <Compass className="w-5 h-5 text-teal-600" />
              </div>
            </div>

            {/* Driving Directions Footer */}
            <div className="p-4 sm:p-5 bg-cyan-50/40 border-t border-cyan-100/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Car className="w-4 h-4 text-teal-600" />
                <span>Complimentary patient valet at Main Atrium Entrance</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 font-bold hover:text-teal-800 flex items-center gap-1 hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
