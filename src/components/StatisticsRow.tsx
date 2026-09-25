import React from 'react';
import { Image as ImageIcon, Layers, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface StatisticsRowProps {
  totalSubmissions?: number;
  singleCount?: number;
  seriesCount?: number;
  totalVotes?: number;
}

export const StatisticsRow: React.FC<StatisticsRowProps> = ({
  totalSubmissions = 128,
  singleCount = 68,
  seriesCount = 60,
  totalVotes = 12580
}) => {
  // Format numbers with Vietnamese thousand dot separator (e.g. 12.580)
  const formatNumber = (num: number) => {
    return num.toLocaleString('vi-VN');
  };

  return (
    <section id="statistics" className="bg-white py-10 sm:py-12 border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center">
          
          {/* LEFT COLUMN: ~40% Width - Hero Primary Metric (128 Sản phẩm đã nộp) */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[40%] lg:border-r lg:border-slate-200 lg:pr-8 xl:pr-12 pb-8 lg:pb-0 flex flex-col items-center justify-center text-center"
          >
            {/* Giant "128" Number - Direct on white background, centered */}
            <span className="text-[64px] sm:text-[72px] lg:text-[80px] font-bold text-[#0984F0] leading-none tracking-tight tabular-nums">
              {formatNumber(totalSubmissions)}
            </span>

            {/* Sub-label: Sản phẩm đã nộp */}
            <h3 className="mt-2.5 text-lg sm:text-xl lg:text-[22px] font-semibold text-[#21469A] tracking-normal">
              Bài dự thi
            </h3>
          </motion.div>

          {/* RIGHT COLUMN: Remaining ~60% Width - 3 Secondary Sub-metrics */}
          <div className="w-full lg:w-[60%] lg:pl-10 xl:pl-14 pt-6 lg:pt-0 border-t border-slate-200 lg:border-t-0">
            <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
              
              {/* 1. Ảnh đơn */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="px-2 sm:px-4 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0984F0] mb-2">
                  <ImageIcon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#21469A] leading-tight tabular-nums">
                  {formatNumber(singleCount)}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  Tác giả
                </span>
              </motion.div>

              {/* 2. Ảnh bộ */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="px-2 sm:px-4 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0984F0] mb-2">
                  <Layers className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#21469A] leading-tight tabular-nums">
                  {formatNumber(seriesCount)}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  Đơn vị tham gia
                </span>
              </motion.div>

              {/* 3. Lượt bình chọn */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="px-2 sm:px-4 flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#D51517] mb-2">
                  <Heart className="w-5 h-5 stroke-[1.75] fill-[#D51517]/10" />
                </div>
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#D51517] leading-tight tabular-nums">
                  {formatNumber(totalVotes)}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  Lượt bình chọn
                </span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

