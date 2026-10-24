import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/hospitalData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const targetIdx = Math.max(0, Math.min(index, TESTIMONIALS.length - 1));
    setActiveIndex(targetIdx);
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[targetIdx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % TESTIMONIALS.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    scrollToIndex(prevIdx);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.children[0]?.clientWidth || 280;
      const scrollPos = container.scrollLeft;
      const index = Math.round(scrollPos / (cardWidth + 14));
      if (index >= 0 && index < TESTIMONIALS.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Mobile Next/Prev Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
        <div className="text-center sm:text-left max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1.5 block">
            Patient Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
            What Our Patients Say
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Trusted feedback from families who recovered in our care.
          </p>
        </div>

        {/* Next / Prev Navigation Controls (Visible on mobile & desktop) */}
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-cyan-200 text-slate-700 hover:text-teal-800 hover:bg-cyan-50 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-500 font-semibold sm:hidden px-1">
            {activeIndex + 1} / {TESTIMONIALS.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-cyan-200 text-slate-700 hover:text-teal-800 hover:bg-cyan-50 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Testimonials Container: Next to next (horizontal swipe) on mobile, 3-column grid on desktop */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-3.5 sm:gap-6 snap-x snap-mandatory scroll-smooth pb-3 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={t.id}
            className={`min-w-[85vw] max-w-[320px] sm:min-w-0 sm:max-w-none shrink-0 sm:shrink snap-center bg-white rounded-2xl p-4 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
              idx === activeIndex
                ? 'border-teal-400 shadow-md ring-1 ring-teal-400/20'
                : 'border-cyan-100 shadow-2xs'
            }`}
          >
            <div>
              {/* Star Rating and Department Tag */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-teal-700 bg-cyan-50 px-2 py-0.5 rounded">
                  {t.department}
                </span>
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed mb-4">
                "{t.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 text-xs">{t.author}</div>
                <div className="text-[10px] text-slate-400">{t.location}</div>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium truncate max-w-[140px]">
                {t.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots on Mobile */}
      <div className="flex items-center justify-center gap-1.5 mt-3 sm:hidden">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === activeIndex ? 'w-5 bg-teal-600' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
