import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
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
    email: '',
    department: prefillDepartment || '',
    doctor: prefillDoctor || '',
    preferredDate: prefillDate || '',
    preferredTime: '09:00 AM',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceId: string;
    details: typeof formData;
    timestamp: string;
  } | null>(null);

  // Sync props when updated from external controls
  useEffect(() => {
    if (prefillDepartment) {
      setFormData((prev) => ({ ...prev, department: prefillDepartment }));
    }
    if (prefillDoctor) {
      setFormData((prev) => ({ ...prev, doctor: prefillDoctor }));
    }
    if (prefillDate) {
      setFormData((prev) => ({ ...prev, preferredDate: prefillDate }));
    }
  }, [prefillDepartment, prefillDoctor, prefillDate]);

  const availableDoctors = formData.department
    ? DOCTORS.filter((d) => d.departmentId === formData.department)
    : DOCTORS;

  const timeSlots = [
    '08:30 AM',
    '09:00 AM',
    '10:15 AM',
    '11:30 AM',
    '01:30 PM',
    '02:45 PM',
    '04:00 PM',
    '05:15 PM',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Patient full name is required';
    } else if (formData.patientName.trim().length < 2) {
      errs.patientName = 'Please enter a valid full name';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for appointment confirmation';
    } else if (!/^[0-9+()\- ]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.department) {
      errs.department = 'Please select a hospital department';
    }

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred consultation date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate prompt and seamless client-side processing
    setTimeout(() => {
      const generatedRef = `CPM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmation({
        referenceId: generatedRef,
        details: { ...formData },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      `DESCRIPTION:Appointment Reference: ${referenceId}\\nDoctor: ${doctorObj ? doctorObj.name : 'Specialist Assigned'}\\nDepartment: ${deptObj ? deptObj.name : details.department}\\nPatient: ${details.patientName}`,
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

  const handleReset = () => {
    setBookingConfirmation(null);
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      department: '',
      doctor: '',
      preferredDate: '',
      preferredTime: '09:00 AM',
      notes: '',
    });
    setErrors({});
  };

  return (
    <section id="appointment" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#f0f9fa] to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
            Online Patient Intake
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Book an Appointment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Reserve your consultation with our board-certified specialists. Fill out your details below 
            and our admissions team will coordinate your intake.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-cyan-100 shadow-xl shadow-cyan-900/5">
          {bookingConfirmation ? (
            /* Confirmation Success State */
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold mb-2">
                Booking Request Received
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Appointment Reference: {bookingConfirmation.referenceId}
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-slate-800">{bookingConfirmation.details.patientName}</span>. 
                Your appointment request has been scheduled for review.
              </p>

              {/* Appointment Summary Box */}
              <div className="max-w-lg mx-auto bg-cyan-50/60 rounded-2xl p-5 sm:p-6 text-left border border-cyan-100 mb-6">
                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Department</span>
                    <span className="font-bold text-slate-800">
                      {DEPARTMENTS.find((d) => d.id === bookingConfirmation.details.department)?.name || bookingConfirmation.details.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Specialist</span>
                    <span className="font-bold text-slate-800">
                      {DOCTORS.find((d) => d.id === bookingConfirmation.details.doctor)?.name || 'Next Available Attending Physician'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Scheduled Date</span>
                    <span className="font-bold text-slate-800">
                      {bookingConfirmation.details.preferredDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Time Slot</span>
                    <span className="font-bold text-slate-800">
                      {bookingConfirmation.details.preferredTime}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-cyan-100/80">
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Contact Phone & Email</span>
                    <span className="font-semibold text-slate-700">
                      {bookingConfirmation.details.phone} · {bookingConfirmation.details.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Honest Notice */}
              <div className="max-w-lg mx-auto bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-800 mb-8 flex items-start gap-2.5 text-left">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Intake Notice:</strong> This is a demonstration booking on the CarePlus Medical web portal. In clinical deployment, your insurance pre-verification and digital medical records link directly to Epic / Cerner EHR.
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-full text-sm border border-slate-200 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Appointment</span>
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form */
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
                {/* Patient Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full rounded-xl py-3 pl-10 pr-4 text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.patientName
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.patientName && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{errors.patientName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-xl py-3 pl-10 pr-4 text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. sarah.jenkins@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-xl py-3 pl-10 pr-4 text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hospital Department <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          department: e.target.value,
                          doctor: '', // reset doctor if department changes
                        })
                      }
                      className={`w-full appearance-none rounded-xl py-3 pl-10 pr-9 text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                        errors.department
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    >
                      <option value="">-- Choose Medical Department --</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.shortName})
                        </option>
                      ))}
                    </select>
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.department && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{errors.department}</p>
                  )}
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Specialist
                  </label>
                  <div className="relative">
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full appearance-none rounded-xl py-3 pl-10 pr-9 text-sm font-medium border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                    >
                      <option value="">Any Available Board-Certified Doctor</option>
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} – {doc.departmentName}
                        </option>
                      ))}
                    </select>
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                        errors.preferredDate
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-teal-500'
                      }`}
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{errors.preferredDate}</p>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Preferred Consultation Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                        formData.preferredTime === slot
                          ? 'bg-[#4ea8b6] text-white border-[#4ea8b6] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message / Notes */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Symptoms or Medical Notes (Optional)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms, existing prescriptions, or reasons for visit..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl p-3.5 text-sm font-medium border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Need immediate emergency care?</span>{' '}
                  Call our 24/7 trauma desk at{' '}
                  <a href={`tel:${HOSPITAL_INFO.emergencyHotline}`} className="text-rose-600 font-bold hover:underline">
                    {HOSPITAL_INFO.emergencyDisplay}
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4ea8b6] hover:bg-[#3d95a3] text-white font-bold py-3.5 px-8 rounded-full shadow-md shadow-cyan-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Scheduling Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
