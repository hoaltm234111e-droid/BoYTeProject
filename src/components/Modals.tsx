import React, { useState } from 'react';
import { Artwork } from '../types';
import { X, Check, Heart, Share2, MapPin, Calendar, Camera, ShieldCheck, UserCheck, Phone, Info, Upload, Image as ImageIcon, FileCheck } from 'lucide-react';
import { MohLogo } from './MohLogo';

// Toast Notification
export const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#21469A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#2EBDF4]/40 animate-fade-in">
      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
      </div>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// Login Modal (Official Government / Portal Style)
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [method, setMethod] = useState<'phone' | 'vneid'>('phone');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = fullName.trim() || 'Cử tri bình chọn';
    onLoginSuccess(displayName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <MohLogo className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-lg font-extrabold text-[#21469A] uppercase">
            Đăng Nhập Cổng Bình Chọn
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Xác thực danh tính để đảm bảo tính minh bạch và công bằng cho cuộc thi
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMethod('phone')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              method === 'phone' ? 'bg-white text-[#21469A] shadow-xs' : 'text-slate-600'
            }`}
          >
            Số điện thoại / OTP
          </button>
          <button
            type="button"
            onClick={() => setMethod('vneid')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              method === 'vneid' ? 'bg-white text-[#D51517] shadow-xs' : 'text-slate-600'
            }`}
          >
            Tài khoản VNeID
          </button>
        </div>

        {method === 'phone' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Họ và tên người bình chọn
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số điện thoại xác thực
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09xx xxx xxx"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
                />
              </div>
            </div>

            <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 flex items-start gap-2 text-xs text-sky-800">
              <Info className="w-4 h-4 text-[#0984F0] shrink-0 mt-0.5" />
              <span>Mỗi số điện thoại được bình chọn tối đa 01 lần cho mỗi tác phẩm.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0984F0] hover:bg-[#21469A] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Xác nhận và tiếp tục
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-red-50 text-[#D51517] rounded-2xl mx-auto flex items-center justify-center border border-red-200">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-600">
              Đăng nhập bằng tài khoản Định danh điện tử Quốc gia (VNeID mức độ 2) để tự động ghi nhận lượt bình chọn hợp lệ.
            </p>
            <button
              type="button"
              onClick={() => {
                onLoginSuccess('Công dân VNeID');
                onClose();
              }}
              className="w-full py-3 bg-[#D51517] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Đăng nhập qua VNeID
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Preview Modal for Artwork
interface PreviewModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onVote: (artwork: Artwork) => void;
  onShare: (artwork: Artwork) => void;
  hasVoted: boolean;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  artwork,
  onClose,
  onVote,
  onShare,
  hasVoted
}) => {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#F6FBFD]">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#21469A] text-white text-xs font-bold tabular-nums px-2.5 py-1 rounded-md tracking-wide">
              {artwork.code}
            </span>
            <span className="text-xs font-bold text-[#0984F0] uppercase tracking-wider">
              {artwork.categoryLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Photo */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[420px] object-contain mx-auto"
            />
          </div>

          {/* If series: additional images gallery */}
          {artwork.additionalImages && artwork.additionalImages.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Các ảnh khác trong bộ ({artwork.additionalImages.length + 1} ảnh):
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <img
                  src={artwork.imageUrl}
                  alt="Ảnh 1"
                  className="rounded-lg h-24 w-full object-cover border-2 border-[#0984F0]"
                />
                {artwork.additionalImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Ảnh ${idx + 2}`}
                    className="rounded-lg h-24 w-full object-cover border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#21469A] leading-snug">
              {artwork.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Tác giả: <span className="text-[#0984F0]">{artwork.author}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D51517]" />
                <span>{artwork.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0984F0]" />
                <span>Ngày chụp: {artwork.takenDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-slate-400" />
                <span>Đã kiểm duyệt sơ khảo</span>
              </div>
            </div>

            {/* Description / Caption */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Lời tựa tác phẩm
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-3.5 rounded-xl shadow-2xs">
                {artwork.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#F6FBFD] flex items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-slate-500">Tổng bình chọn:</span>{' '}
            <strong className="text-base font-bold text-[#21469A] tabular-nums">
              {artwork.votes.toLocaleString('vi-VN')}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onShare(artwork)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </button>

            <button
              onClick={() => onVote(artwork)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                hasVoted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0984F0] hover:bg-[#21469A] text-white shadow-xs'
              }`}
            >
              {hasVoted ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Đã bình chọn</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>Bình chọn tác phẩm này</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rules Modal (Thể lệ cuộc thi)
interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F6FBFD]">
          <div className="flex items-center gap-3">
            <MohLogo className="w-9 h-9" />
            <div>
              <span className="text-[11px] font-bold text-[#D51517] uppercase">BỘ Y TẾ</span>
              <h3 className="text-base font-extrabold text-[#21469A] uppercase leading-tight">
                THỂ LỆ CUỘC THI ẢNH TIÊM CHỦNG MỞ RỘNG
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-slate-700 text-sm leading-relaxed">
          <section>
            <h4 className="font-bold text-[#21469A] text-base mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0984F0]"></span>
              1. Mục đích và ý nghĩa
            </h4>
            <p>
              Kỷ niệm 40 năm triển khai Chương trình Tiêm chủng mở rộng tại Việt Nam; tôn vinh những cống hiến thầm lặng của đội ngũ y tế dự phòng và y tế cơ sở; nâng cao nhận thức cộng đồng về tầm quan trọng của việc tiêm chủng đầy đủ, đúng lịch vì một Việt Nam khỏe mạnh.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-[#21469A] text-base mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0984F0]"></span>
              2. Đối tượng tham gia
            </h4>
            <p>
              Tất cả công dân Việt Nam từ 18 tuổi trở lên, bao gồm các nhà nhiếp ảnh chuyên nghiệp và không chuyên, cán bộ y tế, phóng viên, nhà báo và người dân trên toàn quốc.
            </p>
          </section>

          <section>
            <h4 className="font-bold text-[#21469A] text-base mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0984F0]"></span>
              3. Quy cách tác phẩm dự thi
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Ảnh đơn:</strong> Mỗi tác phẩm là 01 file ảnh hoàn chỉnh.</li>
              <li><strong>Ảnh bộ:</strong> Từ 05 đến 08 ảnh, kèm chú thích nội dung và lời tựa cho từng ảnh.</li>
              <li>Ảnh định dạng JPG/JPEG, độ phân giải tối thiểu 300 DPI, dung lượng từ 3MB đến 12MB.</li>
              <li>Ảnh chụp thực tế, không chắp ghép làm sai lệch sự thật lịch sử, y khoa. Chấp nhận xử lý hậu kỳ cơ bản (ánh sáng, độ tương phản).</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-[#21469A] text-base mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0984F0]"></span>
              4. Phương thức chấm giải & Bình chọn
            </h4>
            <p>
              Điểm số cuối cùng được tính dựa trên 80% đánh giá chuyên môn của Hội đồng Giám khảo (do Bộ Y tế thành lập) và 20% điểm số bình chọn công khai từ cộng đồng trên Cổng bình chọn trực tuyến chính thức.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F6FBFD] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
          >
            Đã hiểu thể lệ
          </button>
        </div>
      </div>
    </div>
  );
};

// Submission Modal (Nộp sản phẩm dự thi)
interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (title: string) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [phone, setPhone] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'single' | 'series'>('single');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [agreed, setAgreed] = useState(true);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(artworkTitle || 'Tác phẩm dự thi');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-[#F6FBFD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MohLogo className="w-9 h-9 shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#21469A] uppercase tracking-wide">
                Nộp Sản Phẩm Dự Thi
              </h3>
              <p className="text-xs text-slate-500">
                Cuộc thi ảnh Chương trình Tiêm chủng mở rộng - Bộ Y tế
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Họ và tên tác giả / Đại diện nhóm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số điện thoại liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên tác phẩm dự thi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={artworkTitle}
                onChange={(e) => setArtworkTitle(e.target.value)}
                placeholder="Ví dụ: Giọt vắc xin cho bản làng xa"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Thể loại dự thi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'single' | 'series')}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              >
                <option value="single">Ảnh đơn</option>
                <option value="series">Bộ ảnh (5-8 ảnh)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Địa điểm và bối cảnh chụp ảnh <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ví dụ: Trạm Y tế xã Mèo Vạc, Tỉnh Hà Giang"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tải lên file ảnh dự thi (JPG, JPEG, PNG - Tối đa 15MB) <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-sky-300 hover:border-[#0984F0] bg-sky-50/50 hover:bg-sky-50 rounded-xl p-5 text-center transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                <Upload className="w-7 h-7 text-[#0984F0]" />
                {fileName ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Đã chọn file: {fileName}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-slate-700">
                      Kéo thả ảnh vào đây hoặc nhấp để chọn tệp
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Độ phân giải tối thiểu 300 DPI, chấp nhận ảnh đơn hoặc nén zip bộ ảnh
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Câu chuyện / Lời tựa tác phẩm
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Chia sẻ ngắn gọn ý nghĩa, cảm xúc hoặc câu chuyện đằng sau bức ảnh..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0] resize-none"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="copyright-terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded-sm border-slate-300 text-[#0984F0] focus:ring-[#0984F0]"
              required
            />
            <label htmlFor="copyright-terms" className="text-xs text-slate-600 leading-tight">
              Tôi cam kết tác phẩm thuộc quyền sở hữu của tôi, không vi phạm bản quyền và tuân thủ đúng thể lệ do Bộ Y tế ban hành.
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D51517] hover:bg-[#b51214] text-white font-bold text-xs uppercase tracking-wide rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Gửi sản phẩm dự thi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
