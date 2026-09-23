import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface CountdownSectionProps {
  onSubmitClick?: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onSubmitClick }) => {
  // Target deadline countdown timer: starts at 12d 12h 00m 49s and counts down every second
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 12,
    minutes: 0,
    seconds: 49
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  const handleClick = () => {
    if (onSubmitClick) {
      onSubmitClick();
    } else {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-[#EEF6FA] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center"
      >
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#21469A] font-bold text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-6 sm:mb-8"
        >
          HẠN CHÓT TIẾP NHẬN TÁC PHẨM DỰ THI KẾT THÚC TRONG
        </motion.h2>

        {/* Large Numbers Countdown Display: 12 : 12 : 00 : 49 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 my-2"
        >
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-[#3B82F6] leading-none tabular-nums tracking-tight">
              {formatNum(timeLeft.days)}
            </span>
            <span className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-medium text-slate-600">
              Ngày
            </span>
          </div>

          <span className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#93C5FD] select-none -mt-6 sm:-mt-8">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-[#3B82F6] leading-none tabular-nums tracking-tight">
              {formatNum(timeLeft.hours)}
            </span>
            <span className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-medium text-slate-600">
              Giờ
            </span>
          </div>

          <span className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#93C5FD] select-none -mt-6 sm:-mt-8">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-[#3B82F6] leading-none tabular-nums tracking-tight">
              {formatNum(timeLeft.minutes)}
            </span>
            <span className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-medium text-slate-600">
              Phút
            </span>
          </div>

          <span className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#93C5FD] select-none -mt-6 sm:-mt-8">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-[#3B82F6] leading-none tabular-nums tracking-tight">
              {formatNum(timeLeft.seconds)}
            </span>
            <span className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-medium text-slate-600">
              Giây
            </span>
          </div>
        </motion.div>

        {/* Red CTA Pill Button: NỘP SẢN PHẨM DỰ THI with Wave Ripple Effect */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <div className="relative inline-flex items-center justify-center group">
            {/* Outer radiating wave 2 */}
            <span
              className="absolute inset-0 rounded-full bg-[#E5252A]/25 animate-btn-wave-2 pointer-events-none"
              aria-hidden="true"
            ></span>

            {/* Inner radiating wave 1 */}
            <span
              className="absolute inset-0 rounded-full bg-[#E5252A]/40 animate-btn-wave-1 pointer-events-none"
              aria-hidden="true"
            ></span>

            {/* Main Button */}
            <button
              onClick={handleClick}
              id="countdown-submit-cta"
              className="relative inline-flex items-center justify-center gap-2.5 bg-[#E5252A] hover:bg-[#CC181D] active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:px-10 sm:py-4 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 transform hover:-translate-y-0.5 transition-all duration-200 tracking-wide uppercase cursor-pointer z-10"
            >
              <Heart className="w-4 h-4 fill-white text-white shrink-0 animate-pulse" />
              <span>NỘP SẢN PHẨM DỰ THI</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Small date range below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-slate-600"
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#2E79F4] shrink-0" />
            <span>
              Thời gian tiếp nhận tác phẩm: <strong className="font-bold text-[#1E3A8A]">Từ ngày phát động đến hết ngày 15/10/2026</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
