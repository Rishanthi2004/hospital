import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Calendar, Activity } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface NavbarProps {
  onOpenBooking: (prefill?: { departmentId?: string; doctorId?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Departments', href: '#departments' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-cyan-100/60 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-white/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark with clean medical cross emblem */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-cyan-200 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-800 leading-none">
                CAREPLUS
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-teal-600 uppercase mt-0.5">
                MEDICAL
              </span>
            </div>
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-teal-500"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyHotline}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors"
              title="24/7 Emergency Line"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ER: 911</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 bg-[#4ea8b6] hover:bg-[#3d95a3] active:bg-[#348390] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm shadow-cyan-500/25 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden text-xs font-semibold bg-[#4ea8b6] text-white px-3 py-1.5 rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-teal-700 hover:bg-cyan-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-cyan-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-cyan-50/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#4ea8b6] text-white font-semibold py-3 rounded-xl shadow-md shadow-cyan-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyHotline}`}
              className="w-full flex items-center justify-center gap-2 text-rose-600 bg-rose-50 font-medium py-2.5 rounded-xl text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>24/7 Emergency Hotline ({HOSPITAL_INFO.emergencyDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
