import React from 'react';
import { MohLogo } from './MohLogo';
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenRules: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRules }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#21469A] text-white pt-14 pb-8 border-t-4 border-[#0984F0] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-blue-400/30">
          
          {/* Organizer Info & Emblem */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 bg-white p-1 rounded-2xl shadow-xs flex items-center justify-center shrink-0">
                <MohLogo className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2EBDF4] tracking-wider uppercase">
                  BỘ Y TẾ
                </h3>
                <h4 className="text-base sm:text-lg font-extrabold uppercase leading-snug">
                  TRUNG TÂM TRUYỀN THÔNG - GIÁO DỤC SỨC KHỎE TW (T5G)
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-blue-100/80 leading-relaxed max-w-lg">
              Cơ quan thường trực Ban Tổ chức Cuộc thi ảnh “Hành trình tiêm chủng - Vì một Việt Nam khỏe mạnh” theo Kế hoạch số 414/KH-GDSKTW ngày 29/06/2026 của Trung tâm Truyền thông - Giáo dục sức khỏe Trung ương (Bộ Y tế).
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-[13px] text-blue-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2EBDF4] shrink-0 mt-0.5" />
                <span>366 Đội Cấn, Ngọc Hà, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2EBDF4] shrink-0" />
                <span>Điện thoại: <strong className="text-white font-bold tabular-nums">0933.291.799</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2EBDF4] shrink-0" />
                <span>Email: <a href="mailto:tochucsukient5g@gmail.com" className="hover:underline text-white">tochucsukient5g@gmail.com</a></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#2EBDF4] tracking-wider uppercase pb-1">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-blue-100/90">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trang chủ cuộc thi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('intro')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Giới thiệu cuộc thi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tác phẩm dự thi
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRules}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thể lệ cuộc thi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('prizes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cơ cấu giải thưởng
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('timeline')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tiến độ
                </button>
              </li>
            </ul>
          </div>

          {/* Official Websites & Portals */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#2EBDF4] tracking-wider uppercase pb-1">
              Cổng thông tin ngành
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px]">
              

              <a
                href="http://t5g.org.vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-blue-900/40 hover:bg-blue-900/70 border border-blue-400/20 text-blue-100 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#2EBDF4]" />
                  <span>Trung tâm T5G</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <div className="pt-2 text-[11px] text-blue-200/70">
                Hệ thống xác thực và giám sát bình chọn trực tuyến tuân thủ tiêu chuẩn an toàn thông tin cơ quan nhà nước.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70 text-center sm:text-left">
          <p>@2026 Bản quyền thuộc về Myaloha.vn</p>
        </div>
      </motion.div>
    </footer>
  );
};
