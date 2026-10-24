import React, { useState, useEffect } from 'react';
import {
  Calendar,
  User,
  Phone,
  Building,
  CheckCircle2,
  CalendarPlus,
  RefreshCw
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';

interface AppointmentSectionProps {
  prefillDepartment?: string;
  prefillDoctor?: string;
  prefillDate?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  prefillDepartment,
  prefillDoctor,
  prefillDate,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: prefillDepartment || '',
    doctor: prefillDoctor || '',
    preferredDate: prefillDate || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceId: string;
    patientName: string;
    phone: string;
    departmentName: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    if (prefillDepartment) setFormData((prev) => ({ ...prev, department: prefillDepartment }));
    if (prefillDoctor) setFormData((prev) => ({ ...prev, doctor: prefillDoctor }));
    if (prefillDate) setFormData((prev) => ({ ...prev, preferredDate: prefillDate }));
  }, [prefillDepartment, prefillDoctor, prefillDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Please enter your name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const deptObj = DEPARTMENTS.find((d) => d.id === formData.department);
      const refId = `CP-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingConfirmation({
        referenceId: refId,
        patientName: formData.patientName,
        phone: formData.phone,
        departmentName: deptObj ? deptObj.name : 'General OPD',
        date: formData.preferredDate || 'Tomorrow',
      });
      setIsSubmitting(false);
    }, 500);
  };

  const handleReset = () => {
    setBookingConfirmation(null);
    setFormData({
      patientName: '',
      phone: '',
      department: '',
      doctor: '',
      preferredDate: '',
    });
    setErrors({});
  };

  return (
    <section id="appointment" className="py-10 sm:py-16 bg-gradient-to-b from-white via-[#f0f9fa] to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
            Fast & Easy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Book an Appointment
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Fill your details for quick consultation scheduling.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-cyan-100 shadow-sm">
          {bookingConfirmation ? (
            /* Confirmation Success State */
            <div className="text-center py-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="inline-block px-3 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
                Booking Confirmed
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Reference ID: {bookingConfirmation.referenceId}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Thank you <strong>{bookingConfirmation.patientName}</strong>! Our desk will call you at{' '}
                <strong>{bookingConfirmation.phone}</strong> to confirm your slot for {bookingConfirmation.departmentName}.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-semibold px-4 py-2 rounded-full text-xs cursor-pointer shadow-2xs"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            /* Interactive Booking Form */
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {/* Patient Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.patientName ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.patientName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.patientName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value, doctor: '' })}
                      className="w-full appearance-none rounded-xl py-2.5 pl-9 pr-8 text-xs sm:text-sm font-medium border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    >
                      <option value="">Any Department / OPD</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full rounded-xl py-2 pl-9 pr-3 text-xs sm:text-sm font-medium border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 text-center sm:text-left">
                  24/7 Emergency:{' '}
                  <a href={`tel:${HOSPITAL_INFO.emergencyHotline}`} className="text-rose-600 font-bold hover:underline">
                    {HOSPITAL_INFO.emergencyDisplay}
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-2.5 px-7 rounded-full shadow-md text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
