import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  CalendarPlus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    departmentId?: string;
    doctorId?: string;
    date?: string;
  };
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    preferredDate: '',
    preferredTime: '10:15 AM',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceId: string;
    details: typeof formData;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        patientName: '',
        phone: '',
        email: '',
        department: prefill?.departmentId || '',
        doctor: prefill?.doctorId || '',
        preferredDate: prefill?.date || '',
        preferredTime: '10:15 AM',
        notes: '',
      });
      setBookingConfirmation(null);
      setErrors({});
    }
  }, [isOpen, prefill]);

  if (!isOpen) return null;

  const availableDoctors = formData.department
    ? DOCTORS.filter((d) => d.departmentId === formData.department)
    : DOCTORS;

  const timeSlots = ['08:30 AM', '10:15 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Patient full name is required';
    } else if (formData.patientName.trim().length < 2) {
      errs.patientName = 'Please enter a valid full name';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+()\- ]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.department) {
      errs.department = 'Please choose a department';
    }

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `CPM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmation({
        referenceId: generatedRef,
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleDownloadCalendar = () => {
    if (!bookingConfirmation) return;
    const { details, referenceId } = bookingConfirmation;
    const deptObj = DEPARTMENTS.find((d) => d.id === details.department);
    const doctorObj = DOCTORS.find((d) => d.id === details.doctor);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CarePlus Medical//Appointment Schedule//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Medical Appointment - CarePlus ${deptObj ? deptObj.name : 'Hospital'}`,
      `DESCRIPTION:Appointment Reference: ${referenceId}\\nDoctor: ${doctorObj ? doctorObj.name : 'Specialist Assigned'}\\nDepartment: ${deptObj ? deptObj.name : details.department}`,
      `LOCATION:${HOSPITAL_INFO.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CarePlus_Appointment_${referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-cyan-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#dcf4f7] via-[#eaf7f9] to-white p-5 sm:p-6 border-b border-cyan-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4ea8b6] text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {bookingConfirmation ? 'Appointment Confirmed' : 'Book an Appointment'}
              </h2>
              <p className="text-xs text-slate-500">
                CarePlus General Hospital · Meadowbrook Campus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {bookingConfirmation ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                Ref: {bookingConfirmation.referenceId}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold">{bookingConfirmation.details.patientName}</span>. Your appointment request has been securely registered.
              </p>

              <div className="bg-cyan-50/70 rounded-2xl p-4 text-left border border-cyan-100 text-xs sm:text-sm space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-bold text-slate-800">
                    {DEPARTMENTS.find((d) => d.id === bookingConfirmation.details.department)?.name || bookingConfirmation.details.department}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Physician:</span>
                  <span className="font-bold text-slate-800">
                    {DOCTORS.find((d) => d.id === bookingConfirmation.details.doctor)?.name || 'Next Available Attending Doctor'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Date & Time:</span>
                  <span className="font-bold text-slate-800">
                    {bookingConfirmation.details.preferredDate} at {bookingConfirmation.details.preferredTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm border border-slate-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.patientName ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  />
                  {errors.patientName && <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.phone ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full rounded-xl py-2.5 px-3.5 text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value, doctor: '' })}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.department ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && <p className="text-xs text-rose-500 mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Doctor
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full rounded-xl py-2.5 px-3.5 text-sm border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Any Available Doctor</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full rounded-xl py-2 px-3.5 text-sm border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.preferredDate ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-xs text-rose-500 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full rounded-xl py-2.5 px-3.5 text-sm border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reason for Visit (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Primary symptoms or questions for physician..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl p-3 text-sm border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-2.5 px-6 rounded-full text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
