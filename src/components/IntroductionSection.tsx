import React from 'react';
import { FileText, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface IntroductionSectionProps {
  onOpenRules: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onOpenRules }) => {
  return (
    <section id="intro" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Short Text & Button */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E7F6FC] rounded-full text-[#21469A] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0984F0]" />
              <span>Ý NGHĨA & MỤC ĐÍCH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21469A] uppercase tracking-tight">
              GIỚI THIỆU CUỘC THI
            </h2>
            <div className="w-16 h-1 bg-[#0984F0] mt-2 mb-6 rounded-full"></div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Chương trình Tiêm chủng mở rộng (TCMR) tại Việt Nam được triển khai từ năm 1981 với sự hỗ trợ của Tổ chức Y tế Thế giới (WHO) và Quỹ Nhi đồng Liên Hợp Quốc (UNICEF). Trải qua hơn 40 năm đồng hành cùng sự nghiệp bảo vệ sức khỏe nhân dân, chương trình đã thanh toán bệnh bại liệt, loại trừ uốn ván sơ sinh và giảm mạnh hàng chục căn bệnh truyền nhiễm nguy hiểm ở trẻ em.
              </p>
              <p>
                Cuộc thi ảnh “Hành trình tiêm chủng - Vì một Việt Nam khỏe mạnh” do Bộ Y tế phối hợp cùng Trung tâm Truyền thông - Giáo dục Sức khỏe Trung ương (T5G) tổ chức nhằm ghi lại những khoảnh khắc chân thực, giàu cảm xúc về nỗ lực tận tụy của các chiến sĩ áo trắng tại các trạm y tế xã phường, bản làng vùng cao và hải đảo xa xôi.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#F6FBFD] border border-sky-100 px-3.5 py-2 rounded-xl">
                <Award className="w-4 h-4 text-[#0984F0]" />
                <span>Quy mô toàn quốc</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#F6FBFD] border border-sky-100 px-3.5 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bảo trợ chuyên môn Bộ Y tế</span>
              </div>
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
          </div>

          {/* Right Column: Image Collage */}
          <div className="lg:col-span-6">
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
          </div>

        </div>
      </div>
    </section>
  );
};
