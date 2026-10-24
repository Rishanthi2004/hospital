import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { AppointmentModal } from './components/AppointmentModal';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';

import { Department, Doctor, Service } from './data/hospitalData';

export default function App() {
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    departmentId?: string;
    doctorId?: string;
    date?: string;
  } | undefined>(undefined);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // In-page form prefill state (for scrolling to the bottom form)
  const [pageBookingPrefill, setPageBookingPrefill] = useState<{
    departmentId?: string;
    doctorId?: string;
    date?: string;
  }>({
    departmentId: '',
    doctorId: '',
    date: '',
  });

  const handleOpenBooking = (prefill?: { departmentId?: string; doctorId?: string; date?: string }) => {
    setBookingPrefill(prefill);
    setIsBookingModalOpen(true);
  };

  const handleBookFromDepartment = (deptId: string) => {
    setBookingPrefill({ departmentId: deptId });
    setIsBookingModalOpen(true);
  };

  const handleBookFromDoctor = (doctor: Doctor) => {
    setBookingPrefill({
      departmentId: doctor.departmentId,
      doctorId: doctor.id,
    });
    setIsBookingModalOpen(true);
  };

  const handleBookFromService = (service: Service) => {
    // Map service to closest department ID if applicable
    setIsBookingModalOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fbfb] text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Header & Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Consultation Image & Floating Appointment Panel */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExploreServices={handleExploreServices}
        />

        {/* 3. Our Departments Section (12 departments, 4/row desktop, 2/row mobile) */}
        <DepartmentsSection
          onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          onBookDepartment={handleBookFromDepartment}
        />

        {/* 4. Featured Medical Services Section (8 image-based cards) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onBookService={handleBookFromService}
        />

        {/* 5. Our Doctors Section (Photo cards, qualifications, department, experience) */}
        <DoctorsSection
          onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          onBookDoctor={handleBookFromDoctor}
        />

        {/* 6. About Our Hospital Section (2-column layout with hospital interior photo) */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 7. Why Choose Us Section (6 feature cards) */}
        <WhyChooseUsSection />

        {/* 8. Full In-Page Appointment Booking Form */}
        <AppointmentSection
          prefillDepartment={pageBookingPrefill.departmentId}
          prefillDoctor={pageBookingPrefill.doctorId}
          prefillDate={pageBookingPrefill.date}
        />

        {/* 9. Patient Testimonials Section */}
        <TestimonialsSection />

        {/* 10. Contact and Hospital Campus Area with Map */}
        <ContactSection />
      </main>

      {/* 11. Hospital Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Global Modals */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefill={bookingPrefill}
      />

      <DepartmentDetailModal
        department={selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
        onBook={handleBookFromDepartment}
      />

      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={handleBookFromDoctor}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={handleBookFromService}
      />
    </div>
  );
}
