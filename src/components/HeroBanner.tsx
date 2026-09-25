import React from 'react';
import { MohLogo } from './MohLogo';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface PhotoItem {
  id: string;
  imgUrl: string;
  alt: string;
  badge?: string;
  caption: string;
}

const LEFT_CLUSTER_PHOTOS: [PhotoItem, PhotoItem, PhotoItem] = [
  {
    id: 'l1',
    imgUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80',
    alt: 'Cán bộ y tế thăm khám tận tình',
    caption: 'Y đức & Tận tụy'
  },
  {
    id: 'l2',
    imgUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    alt: 'Chăm sóc tiêm chủng cho trẻ nhỏ',
    badge: 'Hành trình tiêm chủng',
    caption: 'Bảo vệ mầm non tương lai'
  },
  {
    id: 'l3',
    imgUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80',
    alt: 'Bảo quản vaccine và trang thiết bị an toàn',
    caption: 'Mũi tiêm an toàn'
  }
];

const RIGHT_CLUSTER_PHOTOS: [PhotoItem, PhotoItem, PhotoItem] = [
  {
    id: 'r1',
    imgUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    alt: 'Y bác sĩ kiểm tra và tiêm phòng chu đáo',
    caption: 'Lá chắn cộng đồng'
  },
  {
    id: 'r2',
    imgUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80',
    alt: 'Cán bộ y tế tiêm chủng cho trẻ nhỏ',
    badge: 'Khoảnh khắc thiêng liêng',
    caption: 'Chăm sóc từng mũi tiêm an toàn'
  },
  {
    id: 'r3',
    imgUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
    alt: 'Nụ cười bình an của bé sau tiêm chủng',
    caption: 'Vì một Việt Nam khỏe mạnh'
  }
];

const PhotoFanCluster: React.FC<{ photos: [PhotoItem, PhotoItem, PhotoItem]; alignment?: 'left' | 'right' }> = ({
  photos,
  alignment = 'left'
}) => {
  const [leftPhoto, centerPhoto, rightPhoto] = photos;
  const isLeft = alignment === 'left';

  return (
    <div className="relative group w-full max-w-[360px] sm:max-w-[400px] xl:max-w-[440px] h-[410px] sm:h-[450px] xl:h-[480px] flex items-center justify-center mx-auto select-none overflow-visible cursor-pointer">
      {/* Background Soft Glow */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-[#2EBDF4]/25 via-[#0984F0]/18 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

      {/* 1. Left Fanned Photo Card */}
      <div
        className={`absolute -left-2 sm:-left-3 xl:-left-5 top-5 sm:top-6 w-52 sm:w-58 xl:w-64 h-78 sm:h-86 xl:h-[385px] z-10
                   -rotate-[10deg] xl:-rotate-[12deg] -translate-x-3 sm:-translate-x-5
                   bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-200/60
                   transition-all duration-500 ease-out ${
                     isLeft
                       ? 'group-hover:-rotate-[18deg] group-hover:-translate-x-9 group-hover:-translate-y-3 group-hover:shadow-2xl'
                       : 'group-hover:-rotate-[8deg] group-hover:-translate-x-2 group-hover:-translate-y-1.5'
                   }`}
      >
        <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
          <img
            src={leftPhoto.imgUrl}
            alt={leftPhoto.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-2 sm:p-2.5">
            <span className="text-[11px] sm:text-xs font-semibold text-white truncate drop-shadow-sm">
              {leftPhoto.caption}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Right Fanned Photo Card */}
      <div
        className={`absolute -right-2 sm:-right-3 xl:-right-5 top-5 sm:top-6 w-52 sm:w-58 xl:w-64 h-78 sm:h-86 xl:h-[385px] z-10
                   rotate-[10deg] xl:rotate-[12deg] translate-x-3 sm:translate-x-5
                   bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-200/60
                   transition-all duration-500 ease-out ${
                     !isLeft
                       ? 'group-hover:rotate-[18deg] group-hover:translate-x-9 group-hover:-translate-y-3 group-hover:shadow-2xl'
                       : 'group-hover:rotate-[8deg] group-hover:translate-x-2 group-hover:-translate-y-1.5'
                   }`}
      >
        <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
          <img
            src={rightPhoto.imgUrl}
            alt={rightPhoto.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-2 sm:p-2.5">
            <span className="text-[11px] sm:text-xs font-semibold text-white truncate drop-shadow-sm">
              {rightPhoto.caption}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Center Photo Card (Upright & In Front within cluster) */}
      <div
        className="relative z-15 w-56 sm:w-64 xl:w-70 h-82 sm:h-92 xl:h-[415px]
                   rotate-0 bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl
                   shadow-[0_22px_48px_rgba(15,23,42,0.26)] border border-slate-200/60
                   transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(15,23,42,0.32)]"
      >
        <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
          <img
            src={centerPhoto.imgUrl}
            alt={centerPhoto.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#21469A]/90 via-[#21469A]/30 to-transparent flex items-end p-2.5 sm:p-3">
            <div className="text-white">
              {centerPhoto.badge && (
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#0984F0] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 shadow-xs">
                  {centerPhoto.badge}
                </span>
              )}
              <p className="text-xs sm:text-[13px] font-bold leading-tight drop-shadow-sm line-clamp-2">
                {centerPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroBanner: React.FC = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#E7F6FC] via-[#F6FBFD] to-white flex flex-col justify-center py-14 sm:py-16 md:py-20 lg:py-22 min-h-[620px] md:min-h-[680px] border-b border-sky-100"
    >
      {/* Background Stylized Waves and Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <svg
          className="absolute -bottom-6 left-0 w-full h-36 md:h-48 text-white"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-[#2EBDF4]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-[#0984F0]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1380px] mx-auto px-2 sm:px-4 lg:px-6 w-full">
        {/* Top Ministry Emblem and Authority Identifier */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center mb-4 sm:mb-6 relative z-30"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-white/95 rounded-full border border-[#2EBDF4]/40 shadow-xs">
            <MohLogo className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="text-[11px] sm:text-xs font-bold text-[#21469A] tracking-wider uppercase">
              BỘ Y TẾ - TRUNG TÂM TRUYỀN THÔNG GIÁO DỤC SỨC KHỎE TRUNG ƯƠNG
            </span>
          </div>
        </motion.div>

        {/* Hero Grid: Left 3-Photo Cluster - Center Titles - Right 3-Photo Cluster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-6 items-center relative">
          {/* Left 3-Photo Cluster Visual - Behind Content (z-10) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative z-10"
          >
            <PhotoFanCluster photos={LEFT_CLUSTER_PHOTOS} alignment="left" />
          </motion.div>

          {/* Center Contest Main Titles & Information - In Front (z-30) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-center text-center relative z-30 px-3 sm:px-6 xl:px-8"
          >
            {/* Blue Contest Main Title */}
            <h1 className="text-xl sm:text-2xl md:text-[30px] xl:text-[36px] font-extrabold text-[#21469A] uppercase leading-tight tracking-tight max-w-2xl">
              CUỘC THI ẢNH VỀ CHƯƠNG TRÌNH TIÊM CHỦNG MỞ RỘNG
            </h1>

            {/* Red accent line */}
            <div className="w-20 h-1 bg-[#D51517] mx-auto mt-2.5 mb-2 rounded-full"></div>

            {/* Sub-headline slogan */}
            <h2 className="mt-1 text-base sm:text-lg md:text-[21px] xl:text-[23px] font-bold text-[#0984F0] tracking-wide uppercase">
              “HÀNH TRÌNH TIÊM CHỦNG - VÌ MỘT VIỆT NAM KHỎE MẠNH”
            </h2>

            {/* Official Slogan */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-50 border border-amber-200/80 rounded-full text-amber-800 text-xs sm:text-[13px] font-bold">
              <span>Khẩu hiệu:</span>
              <span className="text-[#D51517]">“Lá chắn bảo vệ con bạn và cộng đồng”</span>
            </div>

            {/* Date & Location Line */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm text-slate-600 font-medium bg-white/90 border border-slate-200/80 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xs">
              <div className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#D51517]" />
                <span className="font-semibold">Hà Nội</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-1 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-[#0984F0]" />
                <span>Năm 2026</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <div className="text-slate-500 font-medium text-[11px] sm:text-xs">
                Kế hoạch số 414/KH-GDSKTW
              </div>
            </div>

            {/* Quick summary line */}
            <p className="mt-3 text-slate-600 text-xs sm:text-sm md:text-[15px] max-w-xl leading-relaxed">
              Tôn vinh những khoảnh khắc nhân văn, chân thực, người thật việc thật và sự tận tụy của cán bộ y tế cơ sở trên khắp mọi miền Tổ quốc.
            </p>
          </motion.div>

          {/* Right 3-Photo Cluster Visual - Behind Content (z-10) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 flex justify-center relative z-10"
          >
            <PhotoFanCluster photos={RIGHT_CLUSTER_PHOTOS} alignment="right" />
          </motion.div>
        </div>

        {/* Mobile / Tablet preview (on screens smaller than lg) */}
        <div className="lg:hidden mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
          <div className="sm:hidden text-center text-xs font-semibold text-slate-500 mb-1">
            Một số khoảnh khắc tiêu biểu từ cuộc thi
          </div>
          <div className="hidden sm:block">
            <PhotoFanCluster photos={LEFT_CLUSTER_PHOTOS} alignment="left" />
          </div>
        </div>
      </div>
    </section>
  );
};
