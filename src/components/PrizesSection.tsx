import React from 'react';
import { PRIZE_DATA } from '../data/contestData';
import { Trophy, Medal, Award, Sparkles, Gift, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface TierConfig {
  badgeLabel: string;
  badgeClass: string;
  iconBg: string;
  cardBg: string;
  borderClass: string;
  hoverBorderClass: string;
  shadowClass: string;
  hoverShadowClass: string;
  ringClass?: string;
  totalBadgeClass: string;
  valueBoxClass: string;
  valueTextColor: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const TIER_CONFIGS: Record<string, TierConfig> = {
  p1: {
    badgeLabel: 'GIẢI CAO NHẤT',
    badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-xs',
    iconBg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white shadow-md shadow-amber-400/40 ring-4 ring-amber-100',
    cardBg: 'bg-gradient-to-b from-[#FFFDF7] via-white to-[#FFF8EA]',
    borderClass: 'border-2 border-amber-300',
    hoverBorderClass: 'hover:border-amber-400',
    shadowClass: 'shadow-[0_10px_30px_rgba(245,158,11,0.12)]',
    hoverShadowClass: 'hover:shadow-[0_20px_45px_rgba(245,158,11,0.22)]',
    ringClass: 'ring-2 ring-amber-400/20',
    totalBadgeClass: 'bg-amber-100/80 text-amber-900 border border-amber-200/80',
    valueBoxClass: 'bg-gradient-to-br from-amber-500/10 via-amber-50/70 to-yellow-500/10 border border-amber-200/90 shadow-2xs',
    valueTextColor: 'text-[#D51517]',
    icon: Crown,
    accentColor: '#D97706'
  },
  p2: {
    badgeLabel: 'HẠNG NHÌ',
    badgeClass: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-xs',
    iconBg: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 text-white shadow-md shadow-slate-400/30 ring-4 ring-slate-100',
    cardBg: 'bg-gradient-to-b from-[#FAFBFD] via-white to-[#F1F5F9]',
    borderClass: 'border-2 border-slate-200',
    hoverBorderClass: 'hover:border-slate-300',
    shadowClass: 'shadow-[0_8px_25px_rgba(100,116,139,0.08)]',
    hoverShadowClass: 'hover:shadow-[0_18px_38px_rgba(100,116,139,0.16)]',
    totalBadgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    valueBoxClass: 'bg-slate-50/80 border border-slate-200/80 shadow-2xs',
    valueTextColor: 'text-[#D51517]',
    icon: Medal,
    accentColor: '#475569'
  },
  p3: {
    badgeLabel: 'HẠNG BA',
    badgeClass: 'bg-gradient-to-r from-amber-700 to-orange-800 text-white shadow-xs',
    iconBg: 'bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 text-white shadow-md shadow-amber-800/30 ring-4 ring-amber-100/60',
    cardBg: 'bg-gradient-to-b from-[#FFFBF7] via-white to-[#FDF4EB]',
    borderClass: 'border-2 border-amber-600/25',
    hoverBorderClass: 'hover:border-amber-600/45',
    shadowClass: 'shadow-[0_8px_25px_rgba(180,83,9,0.08)]',
    hoverShadowClass: 'hover:shadow-[0_18px_38px_rgba(180,83,9,0.16)]',
    totalBadgeClass: 'bg-amber-100/70 text-amber-900 border border-amber-200/70',
    valueBoxClass: 'bg-amber-50/60 border border-amber-200/70 shadow-2xs',
    valueTextColor: 'text-[#D51517]',
    icon: Medal,
    accentColor: '#B45309'
  },
  p4: {
    badgeLabel: 'KHUYẾN KHÍCH',
    badgeClass: 'bg-gradient-to-r from-[#0984F0] to-[#21469A] text-white shadow-xs',
    iconBg: 'bg-gradient-to-br from-[#2EBDF4] via-[#0984F0] to-[#21469A] text-white shadow-md shadow-sky-400/30 ring-4 ring-sky-100',
    cardBg: 'bg-gradient-to-b from-[#F4FAFD] via-white to-[#EBF6FC]',
    borderClass: 'border-2 border-sky-200/90',
    hoverBorderClass: 'hover:border-sky-300',
    shadowClass: 'shadow-[0_8px_25px_rgba(14,165,233,0.08)]',
    hoverShadowClass: 'hover:shadow-[0_18px_38px_rgba(14,165,233,0.16)]',
    totalBadgeClass: 'bg-sky-100/80 text-sky-900 border border-sky-200/80',
    valueBoxClass: 'bg-sky-50/60 border border-sky-200/70 shadow-2xs',
    valueTextColor: 'text-[#D51517]',
    icon: Award,
    accentColor: '#0984F0'
  },
  p5: {
    badgeLabel: 'CHUYÊN ĐỀ',
    badgeClass: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs',
    iconBg: 'bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100',
    cardBg: 'bg-gradient-to-b from-[#F0FDF8] via-white to-[#E6F9F0]',
    borderClass: 'border-2 border-emerald-200/90',
    hoverBorderClass: 'hover:border-emerald-300',
    shadowClass: 'shadow-[0_8px_25px_rgba(16,185,129,0.08)]',
    hoverShadowClass: 'hover:shadow-[0_18px_38px_rgba(16,185,129,0.16)]',
    totalBadgeClass: 'bg-emerald-100/80 text-emerald-900 border border-emerald-200/80',
    valueBoxClass: 'bg-emerald-50/60 border border-emerald-200/70 shadow-2xs',
    valueTextColor: 'text-[#D51517]',
    icon: Sparkles,
    accentColor: '#059669'
  }
};

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="py-10 sm:py-14 bg-[#F6FBFD] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-9"
        >
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#E7F6FC] text-[#0984F0] text-xs font-bold uppercase tracking-wider mb-1.5">
            DANH MỤC KHEN THƯỞNG CHÍNH THỨC
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#21469A] uppercase tracking-tight">
            CƠ CẤU GIẢI THƯỞNG
          </h2>
          <div className="w-16 h-1 bg-[#0984F0] mx-auto mt-2 rounded-full"></div>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Cơ cấu giải thưởng gồm 05 mức giải được trao độc lập cho mỗi loại hình (Ảnh đơn và Ảnh bộ) kèm Giấy chứng nhận và Cúp/Kỷ niệm chương của BTC.
          </p>
        </motion.div>

        {/* Prizes Container: 3 in top row, 2 centered in bottom row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto">
          {PRIZE_DATA.map((prize, index) => {
            const config = TIER_CONFIGS[prize.id] || TIER_CONFIGS.p4;
            const IconComponent = config.icon;
            const cleanTitle = prize.title.replace(' (MỖI LOẠI HÌNH)', '');

            return (
              <motion.div
                key={prize.id}
                id={`prize-card-${prize.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.9rem)] max-w-[320px] rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-default relative overflow-hidden ${config.cardBg} ${config.borderClass} ${config.hoverBorderClass} ${config.shadowClass} ${config.hoverShadowClass} ${config.ringClass || ''}`}
              >
                {/* Background ambient corner glow for top prize */}
                {prize.id === 'p1' && (
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-300/25 rounded-full blur-xl pointer-events-none" />
                )}

                <div>
                  {/* Top Bar: Icon & Badges */}
                  <div className="flex items-start justify-between gap-2.5 mb-3">
                    {/* Tier Icon */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Tier Tag & Total Count */}
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${config.badgeClass}`}>
                        {config.badgeLabel}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ${config.totalBadgeClass}`}>
                        Tổng {String(prize.quantity).padStart(2, '0')} giải
                      </span>
                    </div>
                  </div>

                  {/* Prize Title */}
                  <h3 className="text-base sm:text-lg font-black text-[#21469A] uppercase tracking-tight leading-snug">
                    {cleanTitle}
                  </h3>

                  {/* Category Details */}
                  <p className="mt-0.5 text-[11px] sm:text-xs font-semibold text-slate-500">
                    {prize.category}
                  </p>

                  {/* Cash Value Box */}
                  <div className={`mt-3 mb-1 py-2.5 px-3 rounded-xl flex flex-col items-center justify-center text-center ${config.valueBoxClass}`}>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                      Tiền thưởng mỗi giải
                    </span>
                    <span className={`text-xl sm:text-2xl font-black tracking-tight tabular-nums ${config.valueTextColor}`}>
                      {prize.cashValue}
                    </span>
                  </div>
                </div>

                {/* Additional Honors / Certificate Footer */}
                {prize.bonus && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-sky-50 flex items-center justify-center shrink-0 text-[#0984F0]">
                      <Gift className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-snug">
                      {prize.bonus}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
