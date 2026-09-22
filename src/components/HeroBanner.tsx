import React from 'react';
import { MohLogo } from './MohLogo';
import { Calendar, MapPin, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#E7F6FC] via-[#F6FBFD] to-white pt-8 pb-14 border-b border-sky-100">
      {/* Background Stylized Waves and Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <svg
          className="absolute -bottom-10 left-0 w-full h-44 text-white"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#2EBDF4]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#0984F0]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Top Ministry Emblem and Authority Identifier */}
        <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/95 rounded-full border border-[#2EBDF4]/40 shadow-xs">
            <MohLogo className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xs sm:text-[13px] font-bold text-[#21469A] tracking-wider uppercase">
              BỘ Y TẾ - TRUNG TÂM TRUYỀN THÔNG GIÁO DỤC SỨC KHỎE TRUNG ƯƠNG
            </span>
          </div>
        </div>

        {/* Hero Grid: Left Visual Heart - Center Titles - Right Healthcare Worker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-1">
          {/* Left Medical Heart Visual */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center">
            <div className="relative group">
              {/* Soft decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2EBDF4]/30 to-[#0984F0]/20 rounded-full blur-xl"></div>
              
              <div className="relative w-64 h-64 rounded-3xl bg-white/90 p-5 shadow-lg border border-sky-100 flex flex-col items-center justify-center text-center">
                {/* Stylized Medical Heart Illustration */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E7F6FC] to-[#2EBDF4]/20 flex items-center justify-center mb-3 relative">
                  <Heart className="w-14 h-14 text-[#D51517] fill-[#D51517]/15 stroke-[1.75]" />
                  <div className="absolute -top-1 -right-1 bg-[#0984F0] text-white p-1 rounded-full shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-[13px] font-bold text-[#21469A] uppercase tracking-wide">
                  Trái Tim Y Tế Cơ Sở
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed px-2">
                  Bảo vệ trọn vẹn từng mầm non Tổ quốc qua từng mũi tiêm an toàn
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#0984F0] bg-[#E7F6FC] px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  <span>40 Năm Bền Bỉ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Contest Main Titles & Information */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            {/* Blue Contest Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] xl:text-[38px] font-extrabold text-[#21469A] uppercase leading-tight tracking-tight max-w-2xl">
              CUỘC THI ẢNH VỀ CHƯƠNG TRÌNH TIÊM CHỦNG MỞ RỘNG
            </h1>

            {/* Red accent line */}
            <div className="w-20 h-1 bg-[#D51517] mx-auto mt-3 mb-2 rounded-full"></div>

            {/* Sub-headline slogan */}
            <h2 className="mt-2 text-base sm:text-xl md:text-2xl font-bold text-[#0984F0] tracking-wide uppercase">
              “HÀNH TRÌNH TIÊM CHỦNG - VÌ MỘT VIỆT NAM KHỎE MẠNH”
            </h2>

            {/* Date & Location Line */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 font-medium bg-white/90 border border-slate-200/80 px-5 py-2 rounded-full shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-4 h-4 text-[#D51517]" />
                <span className="font-semibold">Hà Nội</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-4 h-4 text-[#0984F0]" />
                <span>Năm 2024</span>
              </div>
            </div>

            {/* Quick summary line */}
            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Tôn vinh những khoảnh khắc xúc động, nỗ lực tận tụy của cán bộ y tế và sự đồng hành của nhân dân trên khắp mọi miền Tổ quốc.
            </p>
          </div>

          {/* Right Healthcare Worker Vaccinating Child Visual */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              {/* Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#0984F0]/30 to-[#2EBDF4]/20 rounded-3xl blur-lg"></div>

              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80"
                  alt="Cán bộ y tế tiêm chủng cho trẻ nhỏ"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21469A]/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-semibold text-[#2EBDF4] uppercase tracking-wider">Khoảnh khắc thiêng liêng</p>
                    <p className="text-sm font-bold leading-snug">Chăm sóc từng mũi tiêm cho tương lai khỏe mạnh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
