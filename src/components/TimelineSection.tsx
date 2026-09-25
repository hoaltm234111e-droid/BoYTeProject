import React from 'react';
import { TIMELINE_DATA } from '../data/contestData';
import { CheckCircle2, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-10 sm:py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#E7F6FC] text-[#0984F0] text-xs font-bold uppercase tracking-wider mb-1.5">
            LỘ TRÌNH TỔ CHỨC
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#21469A] uppercase tracking-tight">
            TIMELINE CUỘC THI
          </h2>
          <div className="w-16 h-1 bg-[#0984F0] mx-auto mt-2 rounded-full"></div>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Lộ trình triển khai 04 giai đoạn chính thức theo Kế hoạch số 414/KH-GDSKTW của Trung tâm Truyền thông - Giáo dục sức khỏe TW (Bộ Y tế).
          </p>
        </motion.div>

        {/* Timeline Grid / Pipeline */}
        <div className="relative">
          {/* Connecting line for desktop behind cards */}
          <div className="hidden lg:block absolute top-[30px] left-6 right-6 h-0.5 bg-slate-200 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 relative z-10 items-stretch">
            {TIMELINE_DATA.map((step, index) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <motion.div
                  key={step.id}
                  id={`timeline-step-${step.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-xl p-4 border transition-all flex flex-col justify-between h-full relative z-10 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#E7F6FC] to-white border-[#0984F0] shadow-md ring-2 ring-[#0984F0]/20'
                      : isCompleted
                      ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
                      : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Step number and status indicator */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isActive
                            ? 'bg-[#0984F0] text-white shadow-2xs'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {index + 1}
                      </span>

                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D51517] text-white animate-pulse shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                          Đang diễn ra
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã xong
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 shrink-0">
                          Sắp diễn ra
                        </span>
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xs sm:text-[13px] font-extrabold text-[#21469A] uppercase tracking-tight mb-1">
                      {step.title}
                    </h3>

                    {/* Date line */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0984F0] mb-2">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.date}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
