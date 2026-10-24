import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/hospitalData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 block">
          Healing Journeys
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          What Our Patients Say
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Read genuine feedback from patients and their families regarding their care experiences, recovery timelines, and hospital stays.
        </p>
      </div>

      {/* Testimonials Carousel / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={t.id}
            className={`bg-white rounded-3xl p-6 sm:p-8 border border-cyan-100/90 shadow-sm transition-all duration-300 flex flex-col justify-between ${
              idx === activeIndex ? 'ring-2 ring-teal-500/30 shadow-md' : ''
            }`}
          >
            <div>
              {/* Star Rating and Department Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-teal-700 bg-cyan-50 px-2.5 py-1 rounded-md">
                  {t.department}
                </span>
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
            </div>

            {/* Author info & clinical outcome */}
            <div className="pt-4 border-t border-slate-100">
              <div className="font-bold text-slate-900 text-sm">{t.author}</div>
              <div className="text-xs text-slate-500 mb-2">{t.location} · {t.date}</div>
              <div className="inline-flex items-center gap-1.5 text-xs text-teal-800 bg-teal-50/80 px-2.5 py-1 rounded-md font-medium">
                <Heart className="w-3 h-3 text-teal-600 shrink-0" />
                <span className="truncate">{t.outcome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        Demo Patient Records · Names and accounts published with patient consent for preview illustration.
      </div>
    </section>
  );
};
