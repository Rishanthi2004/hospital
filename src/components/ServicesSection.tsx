import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { SERVICES, Service } from '../data/hospitalData';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
  onBookService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onBookService,
}) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-[#eef9fa]/70 via-[#f4fbfc] to-white border-y border-cyan-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
              Leading Clinical Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Medical Services
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Delivering advanced clinical care with cutting-edge medical equipment, dedicated sub-specialists, and patient-first recovery programs.
          </p>
        </div>

        {/* Services Grid: 4 columns on large screens, 2 on tablet, 1 on small mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-100/80 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:border-cyan-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Rounded Inset matching reference */}
                <div className="relative p-3 pb-0">
                  <div className="relative h-44 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-teal-900 px-2.5 py-1 rounded-md shadow-2xs">
                      {service.department}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with "Learn More" Link / CTA */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-3 rounded-xl bg-cyan-50/70 hover:bg-[#4ea8b6] text-teal-800 hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 group-hover:shadow-xs cursor-pointer"
                >
                  <span>Learn More & Specs</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
