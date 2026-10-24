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
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  const displayedServices = showAllServices ? SERVICES : SERVICES.slice(0, 4);

  return (
    <section id="services" className="py-10 sm:py-16 bg-gradient-to-b from-[#eef9fa]/70 via-[#f4fbfc] to-white border-y border-cyan-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
              Advanced Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Medical Services
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-sm">
            High-precision diagnostics, robotic surgery, and round-the-clock emergency care.
          </p>
        </div>

        {/* Services Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-cyan-100/80 shadow-2xs hover:shadow-lg hover:border-cyan-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative p-2.5 pb-0">
                  <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-white/95 text-[10px] sm:text-xs font-semibold text-teal-900 px-2 py-0.5 rounded shadow-2xs">
                      {service.department}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-1.5 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {service.description}
                  </p>

                  {/* Highlights (Only top feature for concise mobile view) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate text-[11px] sm:text-xs font-medium">{service.features[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-50/70 hover:bg-[#4ea8b6] text-teal-800 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle View All Services Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-teal-200 bg-teal-50/60 hover:bg-teal-100/60 text-teal-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>{showAllServices ? 'Show Fewer Services' : `View All ${SERVICES.length} Services`}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
