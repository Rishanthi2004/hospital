import React from 'react';
import {
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram
} from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-8 mb-12">
          {/* Col 1: Brand & Emergency Focus */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                  CAREPLUS
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-teal-400 uppercase mt-0.5">
                  GENERAL HOSPITAL
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              CarePlus Medical is a premier comprehensive general hospital providing 24/7 acute trauma care, 
              innovative surgical procedures, and empathetic outpatient medicine.
            </p>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 max-w-sm space-y-2">
              <div className="text-xs uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Immediate Emergency Help</span>
              </div>
              <div className="text-sm font-semibold text-white">
                Trauma Line: <a href={`tel:${HOSPITAL_INFO.emergencyHotline}`} className="text-teal-300 hover:underline">{HOSPITAL_INFO.emergencyDisplay}</a>
              </div>
              <div className="text-xs text-slate-400">
                Direct ambulance bay open 24 hours daily.
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#home" aria-label="CarePlus on Facebook" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#home" aria-label="CarePlus on Twitter" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#home" aria-label="CarePlus on LinkedIn" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#home" aria-label="CarePlus on YouTube" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#home" aria-label="CarePlus on Instagram" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Hospital Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">Featured Services</a>
              </li>
              <li>
                <a href="#departments" className="hover:text-teal-300 transition-colors">Our Departments</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-teal-300 transition-colors">Find a Doctor</a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">About Our Hospital</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition-colors">Location & Parking</a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  Book Appointment &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Departments */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Clinical Centers
            </h3>
            <ul className="space-y-2.5 text-sm">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <a href="#departments" className="hover:text-teal-300 transition-colors">
                    {dept.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Patient Info & Accreditations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Patient Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 mb-6">
              <li>Patient Portal Sign In</li>
              <li>Insurance & Billing Estimates</li>
              <li>Hospital Visiting Policies</li>
              <li>Medical Records Requests</li>
              <li>Telehealth Consultations</li>
            </ul>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Hospital Accreditation
              </div>
              <div className="text-xs text-teal-300">
                Joint Commission International (JCI) Certified & ISO 9001 Hospital
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CarePlus Medical General Hospital. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Patient Rights & Responsibilities</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
