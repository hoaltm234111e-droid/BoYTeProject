import React from 'react';
import { PRIZE_DATA } from '../data/contestData';
import { Trophy, Award, Gift } from 'lucide-react';

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="py-16 bg-[#F6FBFD] border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#E7F6FC] text-[#0984F0] text-xs font-bold uppercase tracking-wider mb-2">
            DANH MỤC KHEN THƯỞNG CHÍNH THỨC
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#21469A] uppercase tracking-tight">
            CƠ CẤU GIẢI THƯỞNG
          </h2>
          <div className="w-20 h-1 bg-[#0984F0] mx-auto mt-2.5 rounded-full"></div>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            Tổng giá trị giải thưởng tiền mặt và hiện vật lên đến hơn 150 triệu đồng cùng Bằng khen danh dự của Bộ Y tế.
          </p>
        </div>

        {/* Prizes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIZE_DATA.map((prize) => {
            return (
              <div
                key={prize.id}
                id={`prize-card-${prize.id}`}
                className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between border ${
                  prize.isSpecial
                    ? 'bg-gradient-to-b from-white to-amber-50/40 border-amber-300 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Category Label */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        prize.isSpecial
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-[#E7F6FC] text-[#0984F0]'
                      }`}
                    >
                      {prize.isSpecial ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {prize.category}
                    </span>
                  </div>

                  {/* Prize Title */}
                  <h3 className="text-base font-extrabold text-[#21469A] uppercase tracking-tight">
                    {prize.title}
                  </h3>

                  {/* Cash Value */}
                  <div className="mt-2 mb-3">
                    <span className="text-2xl font-extrabold text-[#D51517] tabular-nums tracking-tight">
                      {prize.cashValue}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {prize.description}
                  </p>
                </div>

                {/* Additional Honors / Certificates */}
                {prize.bonus && (
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-start gap-2">
                    <Gift className="w-4 h-4 text-[#0984F0] shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700">
                      {prize.bonus}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
