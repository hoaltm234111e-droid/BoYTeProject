import React from 'react';
import { FileText, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface IntroductionSectionProps {
  onOpenRules: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onOpenRules }) => {
  return (
    <section id="intro" className="py-16 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Short Text & Button */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E7F6FC] rounded-full text-[#21469A] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0984F0]" />
              <span>Ý NGHĨA & MỤC ĐÍCH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#21469A] uppercase tracking-tight">
              GIỚI THIỆU CUỘC THI
            </h2>
            <div className="w-16 h-1 bg-[#0984F0] mt-2 mb-6 rounded-full"></div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Căn cứ Kế hoạch số 414/KH-GDSKTW ngày 29/06/2026 của Trung tâm Truyền thông - Giáo dục sức khỏe Trung ương (Bộ Y tế), Cuộc thi ảnh về Chương trình Tiêm chủng mở rộng: <strong>“Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”</strong> với khẩu hiệu <em>“Lá chắn bảo vệ con bạn và cộng đồng”</em> được tổ chức trên phạm vi toàn quốc từ tháng 10 đến tháng 12 năm 2026.
              </p>
              <p>
                Cuộc thi nhằm phổ biến sâu rộng chủ trương của Đảng, chính sách pháp luật của Nhà nước và ngành Y tế về tiêm chủng mở rộng; khẳng định tiêm chủng là biện pháp dự phòng chủ động, an toàn, bền vững để bảo vệ con trẻ và cộng đồng. Đồng thời, biểu dương và tôn vinh những khoảnh khắc chân thực, nhân văn, người thật - việc thật cùng sự cống hiến thầm lặng của đội ngũ cán bộ y tế cơ sở trên mọi nẻo đường Tổ quốc.
              </p>
            </div>

      

            {/* CTA Button: Xem thể lệ cuộc thi */}
            <div className="mt-8">
              <button
                onClick={onOpenRules}
                id="btn-view-rules"
                className="inline-flex items-center gap-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 uppercase tracking-wide cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Xem thể lệ cuộc thi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              {/* Image 1 - Large Primary */}
              <div className="col-span-2 overflow-hidden rounded-2xl shadow-sm border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Y bác sĩ vận chuyển vắc xin vùng cao"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover object-center hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Image 2 - Care detail */}
              <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=500&q=80"
                  alt="Khám sàng lọc trước tiêm"
                  referrerPolicy="no-referrer"
                  className="w-full h-40 sm:h-44 object-cover object-center hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Image 3 - Cold chain & vaccine */}
              <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80"
                  alt="Bảo quản vắc xin đạt chuẩn GSP"
                  referrerPolicy="no-referrer"
                  className="w-full h-40 sm:h-44 object-cover object-center hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
