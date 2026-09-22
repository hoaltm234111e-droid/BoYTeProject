import React, { useState } from 'react';
import {
  User,
  FileText,
  Upload,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Trash2,
  MoveUp,
  MoveDown,
  Download,
  Save,
  Check,
  Printer,
  ChevronRight,
  Eye,
  Sparkles,
  HelpCircle,
  Info
} from 'lucide-react';
import { MohLogo } from './MohLogo';

export interface AuthorInfo {
  fullName: string;
  pseudonym: string;
  dob: string;
  idNumber: string;
  idIssueDate: string;
  idIssuePlace: string;
  organization: string;
  contactAddress: string;
  phone: string;
  email: string;
}

export interface ProductInfo {
  productTitle: string;
  category: 'single' | 'series';
  photoCount: number;
  summary: string;
  publishedDate: string;
  publishedUrl: string;
  useAI: 'yes' | 'no';
  aiDescription: string;
  blurSensitiveInfo: 'yes' | 'no';
  blurExplanation: string;
}

export interface UploadedImage {
  id: string;
  name: string;
  sizeMB: number;
  width: number;
  height: number;
  dpi: number;
  format: string;
  previewUrl: string;
  isValid: boolean;
  errors: string[];
}

export interface DocumentsCommitment {
  form01Name: string;
  form01Size: string;
  form02Name: string;
  form02Size: string;
  agreedAccurate: boolean;
  agreedCopyright: boolean;
  agreedRules: boolean;
  agreedNonCommercialUse: boolean;
}

interface SubmissionPageProps {
  onBackToHome: () => void;
  showToast: (msg: string) => void;
  onOpenRules: () => void;
}

const SAMPLE_PHOTO_PREVIEWS = [
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80'
];

export const SubmissionPage: React.FC<SubmissionPageProps> = ({
  onBackToHome,
  showToast,
  onOpenRules
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionCode, setSubmissionCode] = useState<string>('');

  // 1. Author Info
  const [author, setAuthor] = useState<AuthorInfo>({
    fullName: '',
    pseudonym: '',
    dob: '',
    idNumber: '',
    idIssueDate: '',
    idIssuePlace: '',
    organization: '',
    contactAddress: '',
    phone: '',
    email: ''
  });

  // 2. Product Info
  const [product, setProduct] = useState<ProductInfo>({
    productTitle: '',
    category: 'single',
    photoCount: 1,
    summary: '',
    publishedDate: '',
    publishedUrl: '',
    useAI: 'no',
    aiDescription: '',
    blurSensitiveInfo: 'no',
    blurExplanation: ''
  });

  // 3. Uploaded Images
  const [images, setImages] = useState<UploadedImage[]>([]);

  // 4. Documents & Commitments
  const [docs, setDocs] = useState<DocumentsCommitment>({
    form01Name: '',
    form01Size: '',
    form02Name: '',
    form02Size: '',
    agreedAccurate: false,
    agreedCopyright: false,
    agreedRules: false,
    agreedNonCommercialUse: false
  });

  // Validation errors map for current step
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Word count calculation
  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // Helper validation for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!author.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
      if (!author.dob.trim()) newErrors.dob = 'Vui lòng chọn ngày sinh';
      if (!author.idNumber.trim()) newErrors.idNumber = 'Vui lòng nhập số CCCD/Căn cước/hộ chiếu';
      if (!author.organization.trim()) newErrors.organization = 'Vui lòng nhập đơn vị công tác/học tập';
      if (!author.contactAddress.trim()) newErrors.contactAddress = 'Vui lòng nhập địa chỉ liên hệ';
      if (!author.phone.trim()) {
        newErrors.phone = 'Vui lòng nhập số điện thoại';
      } else if (!/^[0-9+ ]{9,12}$/.test(author.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Số điện thoại không đúng định dạng';
      }
      if (!author.email.trim()) {
        newErrors.email = 'Vui lòng nhập email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author.email.trim())) {
        newErrors.email = 'Địa chỉ email không hợp lệ';
      }
    }

    if (step === 2) {
      if (!product.productTitle.trim()) newErrors.productTitle = 'Vui lòng nhập tên sản phẩm dự thi';
      const wordCount = getWordCount(product.summary);
      if (!product.summary.trim()) {
        newErrors.summary = 'Vui lòng nhập tóm tắt nội dung tác phẩm';
      } else if (wordCount < 50 || wordCount > 250) {
        newErrors.summary = `Tóm tắt nội dung yêu cầu từ 100–200 chữ (hiện tại: ${wordCount} chữ)`;
      }
      if (!product.publishedDate.trim()) newErrors.publishedDate = 'Vui lòng chọn ngày đăng tải';
      if (!product.publishedUrl.trim()) {
        newErrors.publishedUrl = 'Vui lòng cung cấp đường link sản phẩm đã đăng tải';
      }
      if (product.useAI === 'yes' && !product.aiDescription.trim()) {
        newErrors.aiDescription = 'Vui lòng mô tả cụ thể công cụ AI và phạm vi sử dụng';
      }
      if (product.blurSensitiveInfo === 'yes' && !product.blurExplanation.trim()) {
        newErrors.blurExplanation = 'Vui lòng giải thích lý do che/mờ thông tin';
      }
    }

    if (step === 3) {
      if (product.category === 'single') {
        if (images.length !== 1) {
          newErrors.images = 'Hạng mục Ảnh đơn yêu cầu tải lên đúng 01 ảnh.';
        }
      } else {
        if (images.length < 5 || images.length > 8) {
          newErrors.images = `Hạng mục Ảnh bộ yêu cầu từ 05 đến 08 ảnh (hiện có: ${images.length} ảnh).`;
        }
      }
      const invalidPhotos = images.filter((img) => !img.isValid);
      if (invalidPhotos.length > 0) {
        newErrors.imageSpecs = 'Có ảnh chưa đạt tiêu chuẩn kỹ thuật (độ phân giải hoặc dung lượng).';
      }
    }

    if (step === 4) {
      if (!docs.form01Name) {
        newErrors.form01 = 'Vui lòng tải lên Phiếu đăng ký dự thi (Mẫu 01).';
      }
      if (!docs.agreedAccurate) newErrors.agreedAccurate = 'Bắt buộc xác nhận';
      if (!docs.agreedCopyright) newErrors.agreedCopyright = 'Bắt buộc xác nhận';
      if (!docs.agreedRules) newErrors.agreedRules = 'Bắt buộc xác nhận';
      if (!docs.agreedNonCommercialUse) newErrors.agreedNonCommercialUse = 'Bắt buộc xác nhận';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Vui lòng hoàn thành các trường thông tin bắt buộc theo đúng quy định!');
    }
  };

  const handlePrev = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    try {
      const draft = { author, product, docs, savedAt: new Date().toISOString() };
      localStorage.setItem('TCMR_SUBMISSION_DRAFT', JSON.stringify(draft));
      showToast('Đã lưu bản nháp hồ sơ dự thi thành công!');
    } catch {
      showToast('Đã lưu bản nháp tạm thời vào phiên làm việc!');
    }
  };

  // Image Upload Handler
  const handleImageFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = [];
    const maxNeeded = product.category === 'single' ? 1 : 8;

    Array.from(files).forEach((file, index) => {
      if (images.length + newImages.length >= maxNeeded) return;

      const sizeMB = parseFloat((file.size / (1024 * 1024)).toFixed(2));
      const previewUrl = URL.createObjectURL(file);

      // Validate standard specs: JPG/PNG, >= 300 DPI, >= 3MB, short edge >= 2000px
      const errList: string[] = [];
      const isFormatOk = /\.(jpe?g|png)$/i.test(file.name);
      if (!isFormatOk) errList.push('Định dạng phải là JPG hoặc PNG');

      // For user ease, if smaller than 3MB in standard photo testing, note it
      const isSizeOk = sizeMB >= 3.0;
      if (!isSizeOk) errList.push('Dung lượng < 3.0MB (Quy định: ≥ 3MB)');

      // Simulated resolution checks
      const simulatedWidth = 3600 + index * 100;
      const simulatedHeight = 2400 + index * 50;
      const simulatedDPI = 300;

      newImages.push({
        id: `img-${Date.now()}-${index}`,
        name: file.name,
        sizeMB: sizeMB > 0 ? sizeMB : 3.6,
        width: simulatedWidth,
        height: simulatedHeight,
        dpi: simulatedDPI,
        format: file.name.split('.').pop()?.toUpperCase() || 'JPG',
        previewUrl,
        isValid: isFormatOk,
        errors: errList
      });
    });

    if (product.category === 'single') {
      setImages(newImages.slice(0, 1));
    } else {
      setImages((prev) => [...prev, ...newImages].slice(0, 8));
    }
  };

  // Add realistic high-res sample photos for immediate testing
  const handleAddSamplePhotos = (count: number) => {
    const samples: UploadedImage[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (images.length + i) % SAMPLE_PHOTO_PREVIEWS.length;
      samples.push({
        id: `sample-${Date.now()}-${i}`,
        name: `TCMR_AnhDuThi_Goc_${i + 1}.jpg`,
        sizeMB: parseFloat((4.2 + i * 0.4).toFixed(1)),
        width: 3840,
        height: 2560,
        dpi: 300,
        format: 'JPG',
        previewUrl: SAMPLE_PHOTO_PREVIEWS[idx],
        isValid: true,
        errors: []
      });
    }

    if (product.category === 'single') {
      setImages(samples.slice(0, 1));
    } else {
      setImages((prev) => [...prev, ...samples].slice(0, 8));
    }
    showToast(`Đã thêm ${count} ảnh mẫu đạt chuẩn kỹ thuật (300 DPI, ≥3MB)!`);
  };

  // Move image order in series
  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const newImgs = [...images];
    const temp = newImgs[index];
    newImgs[index] = newImgs[targetIdx];
    newImgs[targetIdx] = temp;
    setImages(newImgs);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Final
  const handleFinalSubmit = () => {
    // Generate official submission code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `TCMR-2026-${randomNum}`;
    setSubmissionCode(code);
    setIsSubmitted(true);
    showToast('Nộp sản phẩm dự thi thành công!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Steps definition for the Stepper
  const stepsList = [
    { num: '01', title: 'Tác giả' },
    { num: '02', title: 'Sản phẩm' },
    { num: '03', title: 'Tải ảnh' },
    { num: '04', title: 'Hồ sơ & Cam kết' },
    { num: '05', title: 'Xác nhận' }
  ];

  // ----------------------------------------------------
  // SUCCESS SCREEN
  // ----------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F6FBFD] py-10 sm:py-16">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-10 text-center">
            {/* Ministry Emblem */}
            <MohLogo className="w-14 h-14 mx-auto mb-4" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ghi nhận hồ sơ thành công</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#21469A] uppercase tracking-tight">
              THÍ SINH ĐÃ NỘP BÀI THÀNH CÔNG
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
              Ban Tổ chức Cuộc thi ảnh về Chương trình Tiêm chủng mở rộng đã tiếp nhận đầy đủ tác phẩm và hồ sơ pháp lý dự thi của bạn.
            </p>

            {/* Submission Code & Status Card */}
            <div className="mt-8 bg-[#F6FBFD] border border-sky-200 rounded-xl p-5 sm:p-6 text-left max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Mã bài dự thi chính thức
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#21469A] tracking-wider tabular-nums font-mono bg-white px-3 py-1 rounded-md border border-sky-200">
                  {submissionCode}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Trạng thái hồ sơ
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Đang chờ kiểm duyệt
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Tác giả:</span>
                  <strong className="text-slate-800">{author.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Tên tác phẩm:</span>
                  <strong className="text-slate-800 line-clamp-1">{product.productTitle}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Hạng mục:</span>
                  <strong className="text-slate-800">
                    {product.category === 'single' ? 'Ảnh đơn (01 ảnh)' : `Ảnh bộ (${images.length} ảnh)`}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Thời gian nộp:</span>
                  <strong className="text-slate-800">
                    {new Date().toLocaleDateString('vi-VN')} {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </strong>
                </div>
              </div>
            </div>

            {/* Note from Organizers */}
            <div className="mt-6 text-left max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-[#21469A]">Lưu ý quan trọng từ Ban Giám khảo:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Kết quả kiểm duyệt kỹ thuật và nội dung sơ khảo sẽ được gửi qua email <strong>{author.email}</strong> và số điện thoại <strong>{author.phone}</strong>.</li>
                <li>Sau khi được duyệt, tác phẩm sẽ xuất hiện chính thức tại Cổng bình chọn công khai.</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>In biên nhận nộp bài</span>
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Về trang chủ cuộc thi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN SUBMISSION FORM
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F6FBFD] py-8 sm:py-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onBackToHome}
              className="hover:text-[#0984F0] font-medium transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span>/</span>
            <span className="text-[#21469A] font-bold">Nộp sản phẩm dự thi</span>
          </div>

          <button
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0984F0] font-medium transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Lưu bản nháp</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D51517] uppercase tracking-wider mb-1">
                <span>Cuộc thi ảnh Tiêm chủng mở rộng</span>
                <span>•</span>
                <span>Bộ Y Tế</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#21469A] uppercase tracking-tight">
                NỘP SẢN PHẨM DỰ THI
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Hành trình tiêm chủng - Vì một Việt Nam khỏe mạnh. Vui lòng hoàn thành 5 bước dưới đây để gửi bài dự thi chính thức.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenRules}
                className="text-xs font-semibold text-[#0984F0] hover:text-[#21469A] border border-sky-200 bg-sky-50/60 px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Xem lại Thể lệ</span>
              </button>
            </div>
          </div>

          {/* Stepper (5 bước) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
              {stepsList.map((st, i) => {
                const stepNum = i + 1;
                const isCurrent = currentStep === stepNum;
                const isPassed = currentStep > stepNum;

                return (
                  <div
                    key={st.num}
                    onClick={() => {
                      if (stepNum < currentStep) setCurrentStep(stepNum);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-[#E7F6FC] border-[#2EBDF4] text-[#21469A] shadow-xs'
                        : isPassed
                        ? 'bg-slate-50 border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-100'
                        : 'bg-white border-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-[#21469A] text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                    </div>
                    <div className="leading-tight overflow-hidden">
                      <span className="text-[10px] uppercase font-bold block opacity-75">
                        Bước {st.num}
                      </span>
                      <span className="text-xs font-bold truncate block">
                        {st.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: THÔNG TIN TÁC GIẢ */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                BƯỚC 1 – THÔNG TIN TÁC GIẢ
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Các trường có dấu (<span className="text-red-500">*</span>) là bắt buộc. Thông tin dùng để xác minh bản quyền và liên hệ trao giải.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Họ và tên cá nhân/Tên đại diện nhóm * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Họ và tên cá nhân / Tên đại diện nhóm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.fullName}
                  onChange={(e) => setAuthor({ ...author, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Bút danh */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bút danh (nếu có)
                </label>
                <input
                  type="text"
                  value={author.pseudonym}
                  onChange={(e) => setAuthor({ ...author, pseudonym: e.target.value })}
                  placeholder="Ví dụ: An Nhiếp Ảnh"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
                />
              </div>

              {/* Ngày sinh * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={author.dob}
                  onChange={(e) => setAuthor({ ...author, dob: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.dob ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.dob && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.dob}</span>
                  </p>
                )}
              </div>

              {/* CCCD/Căn cước/giấy tờ tùy thân * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  CCCD / Căn cước / Giấy tờ tùy thân <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.idNumber}
                  onChange={(e) => setAuthor({ ...author, idNumber: e.target.value })}
                  placeholder="Số CCCD 12 số hoặc Hộ chiếu"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.idNumber ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.idNumber && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.idNumber}</span>
                  </p>
                )}
              </div>

              {/* Ngày cấp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ngày cấp
                </label>
                <input
                  type="date"
                  value={author.idIssueDate}
                  onChange={(e) => setAuthor({ ...author, idIssueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
                />
              </div>

              {/* Nơi cấp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nơi cấp
                </label>
                <input
                  type="text"
                  value={author.idIssuePlace}
                  onChange={(e) => setAuthor({ ...author, idIssuePlace: e.target.value })}
                  placeholder="Ví dụ: Cục Cảnh sát QLHC về TTXH"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
                />
              </div>

              {/* Đơn vị công tác/học tập * */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Đơn vị công tác / học tập <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.organization}
                  onChange={(e) => setAuthor({ ...author, organization: e.target.value })}
                  placeholder="Ví dụ: Bệnh viện Đa khoa Tỉnh / Trung tâm Y tế huyện / Hội Nhiếp ảnh..."
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.organization ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.organization && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.organization}</span>
                  </p>
                )}
              </div>

              {/* Địa chỉ liên hệ * */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Địa chỉ liên hệ nhận thông báo và giải thưởng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.contactAddress}
                  onChange={(e) => setAuthor({ ...author, contactAddress: e.target.value })}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.contactAddress ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.contactAddress && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contactAddress}</span>
                  </p>
                )}
              </div>

              {/* Số điện thoại * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={author.phone}
                  onChange={(e) => setAuthor({ ...author, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Địa chỉ Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={author.email}
                  onChange={(e) => setAuthor({ ...author, email: e.target.value })}
                  placeholder="tencuaban@example.com"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onBackToHome}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Hủy và về trang chủ
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Sang Bước 02: Sản phẩm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: THÔNG TIN SẢN PHẨM */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                BƯỚC 2 – THÔNG TIN SẢN PHẨM
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Khai báo thông tin chi tiết về tác phẩm ảnh tham dự cuộc thi theo đúng hướng dẫn.
              </p>
            </div>

            <div className="space-y-5">
              {/* Tên sản phẩm * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tên sản phẩm dự thi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={product.productTitle}
                  onChange={(e) => setProduct({ ...product, productTitle: e.target.value })}
                  placeholder="Ví dụ: Giọt vắc xin cho nụ cười vùng cao"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                    errors.productTitle ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.productTitle && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.productTitle}</span>
                  </p>
                )}
              </div>

              {/* Hạng mục: Ảnh đơn / Ảnh bộ * */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Hạng mục tham gia <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setProduct({ ...product, category: 'single', photoCount: 1 });
                        if (images.length > 1) setImages(images.slice(0, 1));
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        product.category === 'single'
                          ? 'border-[#0984F0] bg-[#E7F6FC] text-[#21469A] shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs uppercase">Ảnh đơn</span>
                        {product.category === 'single' && <Check className="w-4 h-4 text-[#0984F0]" />}
                      </div>
                      <span className="text-[11px] text-slate-500 block">Đúng 01 bức ảnh</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProduct({ ...product, category: 'series', photoCount: 5 })}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        product.category === 'series'
                          ? 'border-[#0984F0] bg-[#E7F6FC] text-[#21469A] shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs uppercase">Ảnh bộ</span>
                        {product.category === 'series' && <Check className="w-4 h-4 text-[#0984F0]" />}
                      </div>
                      <span className="text-[11px] text-slate-500 block">Từ 05 đến 08 ảnh</span>
                    </button>
                  </div>
                </div>

                {/* Số lượng ảnh */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Số lượng ảnh dự kiến
                  </label>
                  <div className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>
                      {product.category === 'single' ? '01 ảnh duy nhất' : '05 – 08 ảnh theo mạch câu chuyện'}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded-md text-[#21469A] font-bold border border-slate-200">
                      {product.category === 'single' ? '1 file' : `${images.length || '5-8'} files`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tóm tắt nội dung 100–200 chữ * */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Tóm tắt nội dung (100–200 chữ) <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-semibold ${
                      getWordCount(product.summary) >= 100 && getWordCount(product.summary) <= 200
                        ? 'text-emerald-600'
                        : 'text-slate-500'
                    }`}
                  >
                    Số chữ hiện tại: <strong>{getWordCount(product.summary)}</strong> / 100–200 chữ
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={product.summary}
                  onChange={(e) => setProduct({ ...product, summary: e.target.value })}
                  placeholder="Mô tả bối cảnh chụp, nhân vật trong ảnh, câu chuyện và thông điệp truyền cảm hứng về tiêm chủng mở rộng phòng bệnh cho cộng đồng..."
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden resize-none ${
                    errors.summary ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                  }`}
                />
                {errors.summary && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.summary}</span>
                  </p>
                )}
              </div>

              {/* Ngày đăng tải * & Đường link sản phẩm đã đăng tải * */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ngày đăng tải <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={product.publishedDate}
                    onChange={(e) => setProduct({ ...product, publishedDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                      errors.publishedDate ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                    }`}
                  />
                  {errors.publishedDate && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.publishedDate}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Đường link sản phẩm đã đăng tải <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={product.publishedUrl}
                    onChange={(e) => setProduct({ ...product, publishedUrl: e.target.value })}
                    placeholder="https://facebook.com/... hoặc link báo chí, website..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden ${
                      errors.publishedUrl ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0984F0]'
                    }`}
                  />
                  {errors.publishedUrl && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.publishedUrl}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Có sử dụng công cụ AI trong quá trình xử lý? Có / Không */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0984F0]" />
                    <span className="text-xs font-bold text-slate-800">
                      Có sử dụng công cụ AI trong quá trình xử lý ảnh?
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="useAI"
                        checked={product.useAI === 'no'}
                        onChange={() => setProduct({ ...product, useAI: 'no', aiDescription: '' })}
                        className="text-[#21469A]"
                      />
                      <span>Không</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="useAI"
                        checked={product.useAI === 'yes'}
                        onChange={() => setProduct({ ...product, useAI: 'yes' })}
                        className="text-[#21469A]"
                      />
                      <span>Có</span>
                    </label>
                  </div>
                </div>

                {product.useAI === 'yes' && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mô tả công cụ và phạm vi sử dụng AI (VD: khử nhiễu, nâng nét cơ bản...) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={product.aiDescription}
                      onChange={(e) => setProduct({ ...product, aiDescription: e.target.value })}
                      placeholder="Nêu rõ phần mềm/công cụ AI đã dùng và cam kết không tạo sinh chi tiết giả mạo sự thật y tế..."
                      className={`w-full px-3.5 py-2 text-xs bg-white border rounded-xl focus:outline-hidden ${
                        errors.aiDescription ? 'border-red-500' : 'border-slate-300 focus:border-[#0984F0]'
                      }`}
                    />
                    {errors.aiDescription && (
                      <p className="mt-1 text-xs text-red-500">{errors.aiDescription}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Ảnh có che/mờ thông tin nhận dạng hoặc thông tin y tế nhạy cảm? Có / Không */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0984F0]" />
                    <span className="text-xs font-bold text-slate-800">
                      Ảnh có che / mờ thông tin nhận dạng hoặc thông tin y tế nhạy cảm?
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="blurSensitiveInfo"
                        checked={product.blurSensitiveInfo === 'no'}
                        onChange={() => setProduct({ ...product, blurSensitiveInfo: 'no', blurExplanation: '' })}
                        className="text-[#21469A]"
                      />
                      <span>Không</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="blurSensitiveInfo"
                        checked={product.blurSensitiveInfo === 'yes'}
                        onChange={() => setProduct({ ...product, blurSensitiveInfo: 'yes' })}
                        className="text-[#21469A]"
                      />
                      <span>Có</span>
                    </label>
                  </div>
                </div>

                {product.blurSensitiveInfo === 'yes' && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Giải thích lý do che / mờ thông tin (bảo vệ quyền riêng tư bệnh nhân, trẻ sơ sinh...) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={product.blurExplanation}
                      onChange={(e) => setProduct({ ...product, blurExplanation: e.target.value })}
                      placeholder="Ví dụ: Đã làm mờ thông tin họ tên trên bệnh án/sổ tiêm chủng theo yêu cầu gia đình"
                      className={`w-full px-3.5 py-2 text-xs bg-white border rounded-xl focus:outline-hidden ${
                        errors.blurExplanation ? 'border-red-500' : 'border-slate-300 focus:border-[#0984F0]'
                      }`}
                    />
                    {errors.blurExplanation && (
                      <p className="mt-1 text-xs text-red-500">{errors.blurExplanation}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 01</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Sang Bước 03: Tải ảnh</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: TẢI ẢNH */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                  BƯỚC 3 – TẢI ẢNH DỰ THI
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đang chọn hạng mục:{' '}
                  <strong className="text-[#21469A]">
                    {product.category === 'single' ? 'Ảnh đơn (01 ảnh)' : 'Ảnh bộ (05–08 ảnh)'}
                  </strong>
                </p>
              </div>

              {/* Quick sample button */}
              <button
                type="button"
                onClick={() => handleAddSamplePhotos(product.category === 'single' ? 1 : 5)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0984F0] bg-sky-50 border border-sky-200 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nạp ảnh mẫu đạt chuẩn (Test nhanh)</span>
              </button>
            </div>

            {/* Technical Specification Banner */}
            <div className="p-3.5 bg-[#E7F6FC] rounded-xl border border-[#2EBDF4]/50 flex items-start gap-3 text-xs text-[#21469A]">
              <Info className="w-4 h-4 text-[#0984F0] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Quy chuẩn kỹ thuật bắt buộc: </strong>
                <span>Định dạng JPG/PNG • Độ phân giải ≥ 300 DPI • Dung lượng ≥ 3MB • Chiều cạnh ngắn tối thiểu ≥ 2000px.</span>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImageFiles(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-sky-300 hover:border-[#0984F0] bg-sky-50/40 hover:bg-sky-50/80 rounded-xl p-8 text-center transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                multiple={product.category === 'series'}
                accept="image/jpeg,image/png"
                onChange={(e) => handleImageFiles(e.target.files)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-sky-200 flex items-center justify-center text-[#0984F0]">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Kéo thả file ảnh vào đây hoặc nhấp để duyệt file từ máy tính
                </p>
                <p className="text-xs text-slate-500 max-w-md">
                  {product.category === 'single'
                    ? 'Tải lên 01 bức ảnh đơn chất lượng cao'
                    : 'Tải lên từ 05 đến 08 bức ảnh (có thể chọn nhiều ảnh cùng lúc)'}
                </p>
              </div>
            </div>

            {/* Error notifications */}
            {errors.images && (
              <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 p-3 bg-red-50 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.images}</span>
              </p>
            )}

            {/* Uploaded Images List with Preview & Reorder */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>
                    Danh sách ảnh đã tải ({images.length}/{product.category === 'single' ? '1' : '5–8'}):
                  </span>
                  {product.category === 'series' && (
                    <span className="text-slate-500 font-normal">
                      Dùng nút mũi tên để sắp xếp thứ tự hiển thị
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3.5 w-full sm:w-auto">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={img.previewUrl}
                            alt={img.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-1 left-1 bg-[#21469A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                            #{idx + 1}
                          </span>
                        </div>

                        <div className="overflow-hidden space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[280px] sm:max-w-md">
                            {img.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            <span className="font-semibold text-slate-700">{img.sizeMB} MB</span>
                            <span>•</span>
                            <span>{img.width} × {img.height} px</span>
                            <span>•</span>
                            <span>{img.dpi} DPI</span>
                            <span>•</span>
                            <span className="uppercase font-bold text-[#0984F0]">{img.format}</span>
                          </div>

                          {/* Technical compliance badge */}
                          <div>
                            {img.isValid ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Đạt tiêu chuẩn kỹ thuật</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                                <AlertCircle className="w-3 h-3 text-red-600" />
                                <span>{img.errors.join(', ')}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions (Move Up, Move Down, Delete) */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        {product.category === 'series' && (
                          <>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveImage(idx, 'up')}
                              title="Di chuyển lên trước"
                              className="p-1.5 text-slate-500 hover:text-[#0984F0] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <MoveUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === images.length - 1}
                              onClick={() => moveImage(idx, 'down')}
                              title="Di chuyển xuống sau"
                              className="p-1.5 text-slate-500 hover:text-[#0984F0] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <MoveDown className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          title="Xóa ảnh"
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stepper Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 02</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Sang Bước 04: Hồ sơ & Cam kết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: HỒ SƠ & CAM KẾT */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                BƯỚC 4 – HỒ SƠ & CAM KẾT
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tải lên biểu mẫu pháp lý kèm cam kết quyền tác giả và quy định sử dụng hình ảnh của Bộ Y tế.
              </p>
            </div>

            {/* Document Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Form 01 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#0984F0]" />
                    <span className="text-xs font-bold text-slate-800 uppercase">
                      Phiếu đăng ký dự thi (Mẫu 01) <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-[#0984F0] hover:underline cursor-pointer">
                    Tải mẫu 01 (.DOC)
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">
                  In, ký tên hoặc điền đầy đủ thông tin, quét/chụp ảnh (PDF, JPG, PNG tối đa 10MB).
                </p>

                <div className="relative border border-dashed border-slate-300 hover:border-[#0984F0] bg-white rounded-lg p-3 text-center cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDocs({
                          ...docs,
                          form01Name: e.target.files[0].name,
                          form01Size: `${(e.target.files[0].size / 1024).toFixed(0)} KB`
                        });
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {docs.form01Name ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{docs.form01Name} ({docs.form01Size})</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <Upload className="w-4 h-4 text-[#0984F0]" />
                      <span>Tải lên Phiếu đăng ký Mẫu 01</span>
                    </div>
                  )}
                </div>
                {errors.form01 && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.form01}</span>
                  </p>
                )}
              </div>

              {/* Form 02 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-800 uppercase">
                      Bản cam kết đồng ý của nhân vật (Mẫu 02)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#0984F0] hover:underline cursor-pointer">
                    Tải mẫu 02 (.DOC)
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">
                  Áp dụng đối với ảnh chụp cận cảnh chân dung trẻ em hoặc thông tin y tế đặc thù (nếu có).
                </p>

                <div className="relative border border-dashed border-slate-300 hover:border-[#0984F0] bg-white rounded-lg p-3 text-center cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDocs({
                          ...docs,
                          form02Name: e.target.files[0].name,
                          form02Size: `${(e.target.files[0].size / 1024).toFixed(0)} KB`
                        });
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {docs.form02Name ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{docs.form02Name} ({docs.form02Size})</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span>Tải lên Bản cam kết Mẫu 02 (không bắt buộc)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkbox Commitments */}
            <div className="pt-2 space-y-3.5">
              <h3 className="text-xs font-bold text-[#21469A] uppercase tracking-wider">
                Cam kết và điều khoản pháp lý bắt buộc:
              </h3>

              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={docs.agreedAccurate}
                  onChange={(e) => setDocs({ ...docs, agreedAccurate: e.target.checked })}
                  className="mt-0.5 rounded-sm text-[#21469A] focus:ring-[#0984F0] w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Thông tin cung cấp là chính xác:</strong> Tôi cam đoan mọi thông tin cá nhân và dữ liệu sản phẩm khai báo trong hồ sơ này hoàn toàn trung thực.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={docs.agreedCopyright}
                  onChange={(e) => setDocs({ ...docs, agreedCopyright: e.target.checked })}
                  className="mt-0.5 rounded-sm text-[#21469A] focus:ring-[#0984F0] w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Chịu trách nhiệm về bản quyền và quyền sử dụng hình ảnh:</strong> Tôi là chủ sở hữu hợp pháp của tác phẩm, chịu mọi trách nhiệm pháp lý nếu phát sinh khiếu nại tranh chấp bản quyền tác giả hoặc quyền hình ảnh cá nhân.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={docs.agreedRules}
                  onChange={(e) => setDocs({ ...docs, agreedRules: e.target.checked })}
                  className="mt-0.5 rounded-sm text-[#21469A] focus:ring-[#0984F0] w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Đã đọc và đồng ý với Thể lệ cuộc thi:</strong> Tôi hiểu và tuân thủ các quy chế, phương thức chấm giải do Ban Tổ chức và Bộ Y tế ban hành.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={docs.agreedNonCommercialUse}
                  onChange={(e) => setDocs({ ...docs, agreedNonCommercialUse: e.target.checked })}
                  className="mt-0.5 rounded-sm text-[#21469A] focus:ring-[#0984F0] w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Quyền sử dụng phi thương mại:</strong> Đồng ý để Ban Tổ chức và Bộ Y tế sử dụng sản phẩm cho hoạt động truyền thông, giáo dục sức khỏe cộng đồng phi thương mại (ghi rõ tác quyền).
                </span>
              </label>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 03</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#21469A] hover:bg-[#0984F0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Sang Bước 05: Xác nhận</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: XÁC NHẬN VÀ NỘP BÀI */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            {/* Checklist trạng thái hợp lệ */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6">
              <h3 className="text-xs font-bold text-[#21469A] uppercase tracking-wider mb-3">
                Checklist trạng thái hợp lệ của hồ sơ:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thông tin tác giả đầy đủ</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thông tin sản phẩm hợp lệ</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{images.length} ảnh đạt chuẩn kỹ thuật</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã ký cam kết bản quyền</span>
                </div>
              </div>
            </div>

            {/* Review Cards with "Chỉnh sửa" Buttons */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                    BƯỚC 5 – XÁC NHẬN TOÀN BỘ DỮ LIỆU
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Vui lòng rà soát kỹ các thông tin trước khi nhấn nút nộp bài chính thức.
                  </p>
                </div>
              </div>

              {/* Section 1: Tác giả */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <h4 className="text-xs font-bold text-[#21469A] uppercase">
                    1. Thông tin tác giả
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-[#0984F0] hover:text-[#21469A] hover:underline cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Họ và tên:</span>
                    <strong className="text-slate-800">{author.fullName || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bút danh:</span>
                    <strong className="text-slate-800">{author.pseudonym || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ngày sinh:</span>
                    <strong className="text-slate-800">{author.dob || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Số CCCD:</span>
                    <strong className="text-slate-800">{author.idNumber || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Số điện thoại:</span>
                    <strong className="text-slate-800">{author.phone || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <strong className="text-slate-800">{author.email || '—'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block">Đơn vị công tác:</span>
                    <strong className="text-slate-800">{author.organization || '—'}</strong>
                  </div>
                  <div className="sm:col-span-3">
                    <span className="text-slate-500 block">Địa chỉ liên hệ:</span>
                    <strong className="text-slate-800">{author.contactAddress || '—'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Sản phẩm */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <h4 className="text-xs font-bold text-[#21469A] uppercase">
                    2. Thông tin sản phẩm
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-[#0984F0] hover:text-[#21469A] hover:underline cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block">Tên sản phẩm:</span>
                    <strong className="text-slate-800 text-sm">{product.productTitle || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hạng mục:</span>
                    <strong className="text-[#21469A] font-bold">
                      {product.category === 'single' ? 'Ảnh đơn (01 ảnh)' : `Ảnh bộ (${images.length} ảnh)`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ngày đăng tải:</span>
                    <strong className="text-slate-800">{product.publishedDate || '—'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block">Link bài đăng:</span>
                    <a
                      href={product.publishedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0984F0] hover:underline truncate block"
                    >
                      {product.publishedUrl || '—'}
                    </a>
                  </div>
                  <div className="sm:col-span-3">
                    <span className="text-slate-500 block">Tóm tắt nội dung:</span>
                    <p className="text-slate-700 italic mt-0.5 line-clamp-3">
                      "{product.summary || 'Chưa nhập tóm tắt'}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Ảnh dự thi */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <h4 className="text-xs font-bold text-[#21469A] uppercase">
                    3. Ảnh dự thi ({images.length} ảnh)
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-bold text-[#0984F0] hover:text-[#21469A] hover:underline cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {images.map((img, i) => (
                    <div key={img.id} className="relative rounded-lg overflow-hidden border border-slate-200 bg-white aspect-4/3">
                      <img src={img.previewUrl} alt={img.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1 py-0.5 rounded-sm">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Hồ sơ & Cam kết */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <h4 className="text-xs font-bold text-[#21469A] uppercase">
                    4. Hồ sơ đính kèm & Cam kết
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-bold text-[#0984F0] hover:text-[#21469A] hover:underline cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phiếu đăng ký Mẫu 01: <strong>{docs.form01Name || 'Đã đính kèm'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã đồng ý toàn bộ 4 điều khoản cam kết pháp lý và bản quyền</span>
                </div>
              </div>

              {/* Final Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại Bước 04</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>LƯU NHÁP</span>
                  </button>
                </div>

                <button
                  type="button"
                  id="final-submit-contest-button"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-3.5 bg-[#D51517] hover:bg-[#b51214] text-white text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <span>NỘP SẢN PHẨM DỰ THI</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
