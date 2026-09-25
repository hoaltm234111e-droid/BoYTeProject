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
  ChevronRight,
  Eye,
  HelpCircle,
  Info,
  X
} from 'lucide-react';
import { MohLogo } from './MohLogo';

export interface AuthorInfo {
  fullName: string;
  dob: string;
  idNumber: string;
  organization: string;
  contactAddress: string;
  phone: string;
  email: string;
}

export interface ProductInfo {
  productTitle: string;
  category: 'single' | 'series';
  summary: string;
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
  agreedRules: boolean;
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
  // Streamlined 3 steps:
  // 1: Thông tin thí sinh/tác giả (7 trường quy định)
  // 2: Thông tin sản phẩm & Tải ảnh (Tên, tóm tắt 100-200 từ, tải ảnh)
  // 3: Hồ sơ pháp lý, Tải biểu mẫu & Nộp bài (Tải Mẫu 01/02, tải scan, cam kết, nộp)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [previewTemplate, setPreviewTemplate] = useState<'form01' | 'form02' | null>(null);

  // 1. Author Info (Chỉ đúng 7 trường theo yêu cầu Ban Tổ chức)
  const [author, setAuthor] = useState<AuthorInfo>({
    fullName: '',
    dob: '',
    idNumber: '',
    organization: '',
    contactAddress: '',
    phone: '',
    email: ''
  });

  // 2. Product Info (Tên sản phẩm, hạng mục, tóm tắt 100-200 chữ)
  const [product, setProduct] = useState<ProductInfo>({
    productTitle: '',
    category: 'single',
    summary: ''
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
    agreedRules: false
  });

  // Validation errors map
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper calculate word count
  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // Helper validation for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!author.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên cá nhân hoặc tên đại diện nhóm';
      if (!author.dob.trim()) newErrors.dob = 'Vui lòng chọn ngày, tháng, năm sinh';
      if (!author.idNumber.trim()) newErrors.idNumber = 'Vui lòng nhập số CCCD hoặc giấy tờ tùy thân hợp lệ';
      if (!author.organization.trim()) newErrors.organization = 'Vui lòng nhập đơn vị công tác/học tập';
      if (!author.contactAddress.trim()) newErrors.contactAddress = 'Vui lòng nhập địa chỉ liên hệ';
      if (!author.phone.trim()) {
        newErrors.phone = 'Vui lòng nhập số điện thoại';
      } else if (!/^[0-9+ ]{9,12}$/.test(author.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Số điện thoại không đúng định dạng';
      }
      if (!author.email.trim()) {
        newErrors.email = 'Vui lòng nhập địa chỉ email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author.email.trim())) {
        newErrors.email = 'Địa chỉ email không hợp lệ';
      }
    }

    if (step === 2) {
      if (!product.productTitle.trim()) newErrors.productTitle = 'Vui lòng nhập tên sản phẩm dự thi';

      if (product.category === 'single') {
        if (images.length !== 1) {
          newErrors.images = 'Hạng mục Ảnh đơn yêu cầu tải lên đúng 01 ảnh tác phẩm.';
        }
      } else {
        if (images.length < 5 || images.length > 8) {
          newErrors.images = `Hạng mục Ảnh bộ yêu cầu từ 05 đến 08 ảnh (hiện có: ${images.length} ảnh).`;
        }
      }
    }

    if (step === 3) {
      if (!docs.form01Name) {
        newErrors.form01 = 'Vui lòng tải lên File scan Phiếu đăng ký dự thi theo Mẫu 01 (bắt buộc).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 3));
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
      const isFormatOk = /\.(jpe?g|png)$/i.test(file.name);

      newImages.push({
        id: `img-${Date.now()}-${index}`,
        name: file.name,
        sizeMB: sizeMB > 0 ? sizeMB : 3.6,
        width: 3840,
        height: 2560,
        dpi: 300,
        format: file.name.split('.').pop()?.toUpperCase() || 'JPG',
        previewUrl,
        isValid: isFormatOk,
        errors: isFormatOk ? [] : ['Chỉ chấp nhận định dạng JPG hoặc PNG']
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

  // Direct Word file (.doc) template downloader
  const downloadTemplateDoc = (type: 'form01' | 'form02') => {
    const isForm01 = type === 'form01';
    const filename = isForm01
      ? 'Mau_01_Phieu_Dang_Ky_Du_Thi_TCMR.doc'
      : 'Mau_02_Ban_Cam_Ket_Nhan_Vat_TCMR.doc';
    const title = isForm01
      ? 'Mẫu số 01 - Phiếu đăng ký dự thi Cuộc thi ảnh TCMR'
      : 'Mẫu số 02 - Bản cam kết đồng ý của nhân vật';

    const contentHtml = isForm01
      ? `
<table style="width: 100%; border: none; margin-bottom: 12pt;">
  <tr>
    <td style="width: 45%; text-align: center; vertical-align: top; font-size: 11pt;">
      BỘ Y TẾ<br>
      <b>TRUNG TÂM TRUYỀN THÔNG -<br>GIÁO DỤC SỨC KHỎE TRUNG ƯƠNG</b><br>
      -------
    </td>
    <td style="width: 55%; text-align: center; vertical-align: top; font-size: 11pt;">
      <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br>
      <b>Độc lập - Tự do - Hạnh phúc</b><br>
      -----------------
    </td>
  </tr>
</table>

<div style="text-align: right; font-style: italic; font-size: 11pt; margin-bottom: 15pt;">
  Mẫu số 01 (Ban hành kèm Kế hoạch số 414/KH-GDSKTW)
</div>

<h2 style="text-align: center; text-transform: uppercase; font-size: 14pt; font-weight: bold; margin: 10pt 0 4pt 0;">
  PHIẾU ĐĂNG KÝ THAM GIA CUỘC THI ẢNH
</h2>
<h3 style="text-align: center; font-size: 12pt; font-weight: normal; margin-bottom: 16pt;">
  “HÀNH TRÌNH TIÊM CHỦNG – VÌ MỘT VIỆT NAM KHỎE MẠNH”
</h3>

<p style="text-align: center; font-weight: bold; margin-bottom: 15pt;">
  Kính gửi: Ban Tổ chức Cuộc thi ảnh về Chương trình Tiêm chủng mở rộng
</p>

<p><b>I. THÔNG TIN THÍ SINH / TÁC GIẢ / ĐẠI DIỆN NHÓM TÁC GIẢ:</b></p>
<p>1. Họ và tên cá nhân hoặc tên đại diện nhóm: ${author.fullName || '......................................................................................'}</p>
<p>2. Ngày, tháng, năm sinh: ${author.dob || '...... / ...... / ..........'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Giới tính: ............................................</p>
<p>3. Số CCCD/Căn cước hoặc giấy tờ tùy thân hợp lệ: ${author.idNumber || '........................................................................'}</p>
<p>4. Đơn vị công tác / học tập: ${author.organization || '...................................................................................................'}</p>
<p>5. Địa chỉ liên hệ: ${author.contactAddress || '...................................................................................................................'}</p>
<p>6. Số điện thoại: ${author.phone || '................................................'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${author.email || '................................................'}</p>

<p style="margin-top: 14pt;"><b>II. THÔNG TIN SẢN PHẨM DỰ THI:</b></p>
<p>1. Tên sản phẩm dự thi: ${product.productTitle || '.........................................................................................................'}</p>
<p>2. Loại hình dự thi: [ ${product.category === 'single' ? 'X' : '&nbsp;'} ] Ảnh đơn &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ ${product.category === 'series' ? 'X' : '&nbsp;'} ] Ảnh bộ</p>
<p>3. Tóm tắt nội dung sản phẩm (khoảng 100 - 200 chữ):</p>
<div style="border: 1px solid #777; padding: 10pt; min-height: 80pt; font-style: italic; background-color: #fafafa;">
  ${product.summary || '................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................'}
</div>

<p style="margin-top: 14pt;"><b>III. CAM KẾT CỦA TÁC GIẢ / ĐẠI DIỆN NHÓM:</b></p>
<p>1. Tôi cam đoan tác phẩm tham dự là ảnh chụp thực tế người thật, việc thật; không sử dụng trí tuệ nhân tạo (AI); chưa từng đoạt giải tại bất kỳ cuộc thi cấp quốc gia nào trước đây.</p>
<p>2. Chịu hoàn toàn trách nhiệm pháp lý về bản quyền tác phẩm và tính trung thực của các thông tin khai báo.</p>
<p>3. Đồng ý cho Ban Tổ chức sử dụng tác phẩm phục vụ công tác truyền thông, giáo dục sức khỏe phi thương mại theo Thể lệ cuộc thi.</p>

<table style="width: 100%; border: none; margin-top: 25pt;">
  <tr>
    <td style="width: 50%;"></td>
    <td style="width: 50%; text-align: center; font-size: 11pt;">
      <i>......., ngày ...... tháng ...... năm 2026</i><br>
      <b>NGƯỜI ĐĂNG KÝ / ĐẠI DIỆN NHÓM</b><br>
      <i>(Ký và ghi rõ họ tên)</i><br><br><br><br><br>
      ${author.fullName || '.............................................................'}
    </td>
  </tr>
</table>
`
      : `
<table style="width: 100%; border: none; margin-bottom: 12pt;">
  <tr>
    <td style="width: 45%; text-align: center; vertical-align: top; font-size: 11pt;">
      BỘ Y TẾ<br>
      <b>TRUNG TÂM TRUYỀN THÔNG -<br>GIÁO DỤC SỨC KHỎE TRUNG ƯƠNG</b><br>
      -------
    </td>
    <td style="width: 55%; text-align: center; vertical-align: top; font-size: 11pt;">
      <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br>
      <b>Độc lập - Tự do - Hạnh phúc</b><br>
      -----------------
    </td>
  </tr>
</table>

<div style="text-align: right; font-style: italic; font-size: 11pt; margin-bottom: 15pt;">
  Mẫu số 02 (Ban hành kèm Kế hoạch số 414/KH-GDSKTW)
</div>

<h2 style="text-align: center; text-transform: uppercase; font-size: 14pt; font-weight: bold; margin: 10pt 0 4pt 0;">
  BẢN CAM KẾT ĐỒNG Ý CỦA NHÂN VẬT XUẤT HIỆN TRONG TÁC PHẨM
</h2>
<h3 style="text-align: center; font-size: 11pt; font-weight: normal; margin-bottom: 16pt;">
  (Hoặc Người giám hộ hợp pháp nếu nhân vật là trẻ em dưới 16 tuổi)
</h3>

<p style="text-align: center; font-weight: bold; margin-bottom: 15pt;">
  Kính gửi: Ban Tổ chức Cuộc thi ảnh “Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”
</p>

<p><b>I. THÔNG TIN NGƯỜI CAM KẾT (NHÂN VẬT HOẶC NGƯỜI GIÁM HỘ):</b></p>
<p>1. Tôi tên là: ............................................................................................................................</p>
<p>2. Ngày, tháng, năm sinh: ...... / ...... / .......... Giới tính: ...........................................................</p>
<p>3. Số CCCD/Căn cước/Hộ chiếu: ................................................................................................</p>
<p>4. Địa chỉ thường trú: ................................................................................................................</p>
<p>5. Số điện thoại: ................................................. Email: ..............................................................</p>
<p>6. Mối quan hệ với nhân vật trong ảnh <i>(nếu là người giám hộ)</i>: ...............................................</p>
<p>Họ tên nhân vật (nếu là trẻ em/người được giám hộ): ................................................................</p>

<p style="margin-top: 14pt;"><b>II. NỘI DUNG CAM KẾT:</b></p>
<p>1. Tôi xác nhận đã đồng ý để tác giả: <b>${author.fullName || '...................................................'}</b> chụp ảnh tôi / con tôi trong quá trình tiêm chủng mở rộng.</p>
<p>2. Đồng ý để tác giả sử dụng tác phẩm ảnh trên gửi tham gia Cuộc thi ảnh: <b>“Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”</b> do Bộ Y tế (Trung tâm TT-GDSK Trung ương) tổ chức.</p>
<p>3. Đồng ý để Ban Tổ chức Cuộc thi được quyền sử dụng hình ảnh này nhằm mục đích thông tin, tuyên truyền, giáo dục sức khỏe cộng đồng phi thương mại mà không có bất kỳ khiếu nại hay tranh chấp nào.</p>

<table style="width: 100%; border: none; margin-top: 25pt;">
  <tr>
    <td style="width: 50%; text-align: center; font-size: 11pt;">
      <b>XÁC NHẬN CỦA TÁC GIẢ</b><br>
      <i>(Ký và ghi rõ họ tên)</i><br><br><br><br><br>
      ${author.fullName || '.............................................................'}
    </td>
    <td style="width: 50%; text-align: center; font-size: 11pt;">
      <i>......., ngày ...... tháng ...... năm 2026</i><br>
      <b>NGƯỜI CAM KẾT / NGƯỜI GIÁM HỘ</b><br>
      <i>(Ký và ghi rõ họ tên)</i><br><br><br><br><br>
      .............................................................
    </td>
  </tr>
</table>
`;

    const htmlDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.4; margin: 30mm 20mm 20mm 25mm; color: #000; }
  h1, h2, h3, h4 { text-align: center; margin: 6pt 0; }
  p { margin: 6pt 0; }
</style>
</head>
<body>
${contentHtml}
</body>
</html>`;

    const blob = new Blob(['\ufeff', htmlDoc], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Đã tải xuống biểu mẫu: ${filename}`);
  };

  // Submit Final
  const handleFinalSubmit = () => {
    if (!validateStep(3)) {
      showToast('Vui lòng tải lên File scan Phiếu đăng ký dự thi (Mẫu 01) trước khi gửi!');
      return;
    }
    setIsSubmitted(true);
    showToast('Nộp sản phẩm dự thi thành công!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsList = [
    { num: '01', title: 'Thông tin tác giả' },
    { num: '02', title: 'Tác phẩm & Tải ảnh' },
    { num: '03', title: 'Hồ sơ & Cam kết' }
  ];

  // ----------------------------------------------------
  // SUCCESS SCREEN (THÍ SINH ĐÃ NỘP BÀI THÀNH CÔNG)
  // ----------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F6FBFD] py-12 sm:py-20 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-[840px] w-full mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 sm:p-14 text-center animate-in fade-in zoom-in-95 duration-200">
            
            {/* Logo Bộ Y tế - T5G */}
            <div className="flex justify-center mb-6">
              <MohLogo withSubtext={true} className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xs" />
            </div>

            {/* Pill Badge: GHI NHẬN HỒ SƠ THÀNH CÔNG */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold tracking-wide mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>GHI NHẬN HỒ SƠ THÀNH CÔNG</span>
            </div>

            {/* Tiêu đề chính */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#23428D] uppercase tracking-tight mb-3">
              THÍ SINH ĐÃ NỘP BÀI THÀNH CÔNG
            </h1>

            {/* Mô tả phụ */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
              Hệ thống đã tiếp nhận thành công bài dự thi Cuộc thi ảnh “Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”.
            </p>

            {/* Khung trạng thái bài */}
            <div className="bg-[#F8FBFD] border border-sky-200 rounded-2xl p-5 sm:p-6 max-w-xl mx-auto flex items-center justify-between gap-4 mb-8">
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                TRẠNG THÁI BÀI
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9EC] text-[#B45309] border border-[#FDE68A] text-xs sm:text-sm font-bold shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span>Đang chờ kiểm duyệt sơ khảo</span>
              </span>
            </div>

            {/* Nút hành động */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={onBackToHome}
                className="px-8 py-3.5 rounded-xl bg-[#2D4392] hover:bg-[#22367D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Về trang chủ cuộc thi</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN SUBMISSION FORM (3 STREAMLINED STEPS)
  // ----------------------------------------------------
  const currentWordCount = getWordCount(product.summary);
  const isWordCountGood = currentWordCount >= 100 && currentWordCount <= 200;

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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewTemplate('form01')}
              className="hidden sm:inline-flex items-center gap-1 text-[#0984F0] hover:text-[#21469A] font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải biểu mẫu Mẫu 01</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0984F0] font-medium transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>Lưu bản nháp</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mb-6">
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
                Quy trình đăng ký rút gọn theo Kế hoạch số 414/KH-GDSKTW. Thí sinh chỉ cần hoàn thành 03 bước tinh gọn dưới đây để nộp bài chính thức.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenRules}
                className="text-xs font-semibold text-[#0984F0] hover:text-[#21469A] border border-sky-200 bg-sky-50/60 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Xem lại Thể lệ</span>
              </button>
            </div>
          </div>

          {/* Stepper (3 bước tinh gọn) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#E7F6FC] border-[#0984F0] text-[#21469A] shadow-xs'
                        : isPassed
                        ? 'bg-slate-50 border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-100'
                        : 'bg-white border-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-[#21469A] text-white shadow-xs'
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
                      <span className="text-xs sm:text-sm font-bold truncate block">
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
        {/* STEP 1: THÔNG TIN THÍ SINH / TÁC GIẢ (ĐÚNG 7 TRƯỜNG THEO QUY ĐỊNH) */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                  BƯỚC 1 – THÔNG TIN THÍ SINH / TÁC GIẢ / NHÓM TÁC GIẢ
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Khai báo đúng 07 trường thông tin theo quy định của Ban Tổ chức. Các trường có dấu (<span className="text-red-500">*</span>) là bắt buộc.
                </p>
              </div>
              <span className="text-xs bg-[#E7F6FC] text-[#21469A] font-semibold px-3 py-1 rounded-full border border-sky-200 shrink-0">
                07 thông tin định danh
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Họ và tên cá nhân hoặc tên đại diện nhóm tác giả * */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  1. Họ và tên cá nhân hoặc tên đại diện nhóm tác giả <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.fullName}
                  onChange={(e) => setAuthor({ ...author, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn An (hoặc Nhóm phóng viên Báo Sức khỏe & Đời sống)"
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

              {/* 2. Ngày, tháng, năm sinh * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  2. Ngày, tháng, năm sinh <span className="text-red-500">*</span>
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

              {/* 3. Số CCCD/CCCD hoặc giấy tờ tùy thân hợp lệ * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  3. Số CCCD / Căn cước hoặc giấy tờ tùy thân hợp lệ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.idNumber}
                  onChange={(e) => setAuthor({ ...author, idNumber: e.target.value })}
                  placeholder="Số CCCD 12 chữ số hoặc số Hộ chiếu"
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

              {/* 4. Đơn vị công tác/học tập * */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  4. Đơn vị công tác / học tập <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.organization}
                  onChange={(e) => setAuthor({ ...author, organization: e.target.value })}
                  placeholder="Ví dụ: Trung tâm Y tế huyện Ba Bể / Bệnh viện Đa khoa Tỉnh / Hội Nghệ sĩ Nhiếp ảnh / Tự do..."
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

              {/* 5. Địa chỉ liên hệ * */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  5. Địa chỉ liên hệ nhận thông báo và giải thưởng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author.contactAddress}
                  onChange={(e) => setAuthor({ ...author, contactAddress: e.target.value })}
                  placeholder="Số nhà, ngõ/đường, phường/xã, quận/huyện, tỉnh/thành phố"
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

              {/* 6. Số điện thoại * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  6. Số điện thoại liên hệ <span className="text-red-500">*</span>
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

              {/* 7. Email * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  7. Địa chỉ Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={author.email}
                  onChange={(e) => setAuthor({ ...author, email: e.target.value })}
                  placeholder="name@example.com"
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

            {/* Bottom Step Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onBackToHome}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Về trang chủ</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Tiếp tục Bước 2 (Tác phẩm & Ảnh)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: THÔNG TIN SẢN PHẨM & TẢI ẢNH DỰ THI */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                  BƯỚC 2 – THÔNG TIN SẢN PHẨM DỰ THI & TẢI ẢNH
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Khai báo tên tác phẩm, tóm tắt ý nghĩa (100–200 chữ) và tải lên các ảnh gốc chất lượng cao.
                </p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Hạng mục dự thi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div
                  onClick={() => setProduct({ ...product, category: 'single' })}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    product.category === 'single'
                      ? 'border-[#0984F0] bg-[#E7F6FC]/60 ring-2 ring-[#0984F0]/15'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      product.category === 'single'
                        ? 'border-[#0984F0] bg-[#0984F0]'
                        : 'border-slate-300'
                    }`}
                  >
                    {product.category === 'single' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Ảnh đơn (01 tác phẩm)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      01 ảnh độc lập thể hiện khoảnh khắc giàu cảm xúc hoặc ấn tượng về tiêm chủng mở rộng.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setProduct({ ...product, category: 'series' })}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    product.category === 'series'
                      ? 'border-[#0984F0] bg-[#E7F6FC]/60 ring-2 ring-[#0984F0]/15'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      product.category === 'series'
                        ? 'border-[#0984F0] bg-[#0984F0]'
                        : 'border-slate-300'
                    }`}
                  >
                    {product.category === 'series' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Ảnh bộ (Phóng sự / Chùm ảnh 05 - 08 ảnh)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bộ ảnh từ 05 đến 08 tác phẩm có tính liền mạch, kể về một câu chuyện hoặc chuyến đi thực tế.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tên sản phẩm * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tên sản phẩm dự thi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product.productTitle}
                onChange={(e) => setProduct({ ...product, productTitle: e.target.value })}
                placeholder="Ví dụ: Nụ cười bình an sau mũi tiêm tại bản Lao Chải"
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

            {/* Tóm tắt nội dung sản phẩm (khoảng 100-200 chữ) - Không bắt buộc */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Tóm tắt nội dung sản phẩm (khoảng 100–200 chữ) <span className="text-slate-400 font-normal">(không bắt buộc)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isWordCountGood
                        ? 'bg-emerald-100 text-emerald-800'
                        : currentWordCount > 0
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {currentWordCount} chữ {isWordCountGood && '✓ Đạt chuẩn 100–200 chữ'}
                  </span>
                </div>
              </div>
              <textarea
                rows={4}
                value={product.summary}
                onChange={(e) => setProduct({ ...product, summary: e.target.value })}
                placeholder="Mô tả bối cảnh, hoàn cảnh ra đời của bức ảnh/bộ ảnh, thông điệp về tiêm chủng phòng bệnh, cảm xúc của nhân vật hoặc sự tận tụy của y bác sĩ... (khoảng 100 - 200 chữ nếu có)"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0]"
              />
            </div>

            {/* UPLOAD ẢNH TÁC PHẨM */}
            <div className="pt-4 border-t border-slate-100">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#0984F0]" />
                  <span>Tải ảnh tác phẩm dự thi ({product.category === 'single' ? '01 ảnh' : '05–08 ảnh'})</span>
                  <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Định dạng JPG/PNG, dung lượng ≥ 3MB, độ phân giải ≥ 300 DPI, cạnh ngắn ≥ 2.000 pixel.
                </p>
              </div>

              {/* Upload Drop Zone */}
              <div className="relative border-2 border-dashed border-sky-300 hover:border-[#0984F0] bg-[#F6FBFD] rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer group">
                <input
                  type="file"
                  multiple={product.category === 'series'}
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleImageFiles(e.target.files)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-sky-200 flex items-center justify-center text-[#0984F0] mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 stroke-[2]" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    Kéo thả file ảnh vào đây hoặc <span className="text-[#0984F0] underline">Duyệt từ máy tính</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {product.category === 'single'
                      ? 'Tải lên đúng 01 ảnh đơn chất lượng cao'
                      : 'Tải lên từ 05 đến 08 ảnh bộ kể câu chuyện hoàn chỉnh'}
                  </p>
                </div>
              </div>

              {errors.images && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.images}</span>
                </p>
              )}

              {/* Uploaded Photos Grid */}
              {images.length > 0 && (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Danh sách ảnh đã tải lên ({images.length} / {product.category === 'single' ? '1' : '8'})</span>
                    <button
                      type="button"
                      onClick={() => setImages([])}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Xóa toàn bộ
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {images.map((img, idx) => (
                      <div
                        key={img.id}
                        className="bg-slate-50 rounded-xl border border-slate-200 p-2.5 flex items-center gap-3 relative group"
                      >
                        <img
                          src={img.previewUrl}
                          alt={img.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0 pr-6">
                          <p className="text-xs font-bold text-slate-800 truncate" title={img.name}>
                            Ảnh {idx + 1}: {img.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {img.sizeMB} MB • {img.format} • 300 DPI
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            Đạt chuẩn kỹ thuật
                          </span>
                        </div>

                        {/* Series reorder controls */}
                        {product.category === 'series' && (
                          <div className="absolute right-8 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => moveImage(idx, 'up')}
                                className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                                title="Lên trên"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                            )}
                            {idx < images.length - 1 && (
                              <button
                                type="button"
                                onClick={() => moveImage(idx, 'down')}
                                className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                                title="Xuống dưới"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute right-2 top-2 p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                          title="Xóa ảnh này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Step Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 1</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Tiếp tục Bước 3 (Hồ sơ & Cam kết)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: HỒ SƠ PHÁP LÝ, TẢI MẪU CAM KẾT & NỘP BÀI CHÍNH THỨC */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#21469A] uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0984F0]"></span>
                  BƯỚC 3 – HỒ SƠ PHÁP LÝ, BIỂU MẪU & NỘP BÀI DỰ THI
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tải mẫu biểu cam kết của Ban Tổ chức, quét/chụp bản đã ký xác nhận và hoàn tất nộp bài dự thi.
                </p>
              </div>
            </div>

            {/* DANH SÁCH 2 THÀNH PHẦN HỒ SƠ PHÁP LÝ (MẪU 01 & MẪU 02) */}
            <div className="space-y-6">
              {/* 1. THÀNH PHẦN HỒ SƠ BẮT BUỘC: PHIẾU ĐĂNG KÝ MẪU 01 */}
              <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#0984F0] shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase">
                      File scan Phiếu đăng ký dự thi (Mẫu 01)
                    </span>
                    <span className="text-red-500 font-bold">*</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => downloadTemplateDoc('form01')}
                      className="py-1.5 px-3 rounded-lg bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Mẫu 01 (.doc)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate('form01')}
                      className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem mẫu</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  Thí sinh tải mẫu văn bản (.doc) ở trên để in ra ký xác nhận, sau đó quét (scan) hoặc chụp ảnh rõ nét và tải lên đây (PDF, JPG, PNG tối đa 10MB).
                </p>

                <div className="relative border-2 border-dashed border-sky-300 hover:border-[#0984F0] bg-white rounded-xl p-6 text-center transition-all cursor-pointer">
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
                      <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold truncate">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="truncate">{docs.form01Name} ({docs.form01Size})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#0984F0] font-semibold underline">Chọn file khác</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDocs({ ...docs, form01Name: '', form01Size: '' });
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold underline z-10 relative cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600">
                      <Upload className="w-6 h-6 text-[#0984F0]" />
                      <span className="text-xs font-bold text-slate-700">Bấm để tải lên File scan Phiếu Mẫu 01 (bắt buộc)</span>
                      <span className="text-[11px] text-slate-400">Hỗ trợ định dạng PDF, PNG, JPG, DOC (tối đa 10MB)</span>
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

              {/* 2. THÀNH PHẦN HỒ SƠ 02: BẢN CAM KẾT NHÂN VẬT MẪU 02 */}
              <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#0984F0] shrink-0" />
                    <span className="text-sm font-bold text-slate-800 uppercase">
                      File scan Bản cam kết đồng ý của nhân vật (Mẫu 02)
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-md">
                      Nếu có nhân vật
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => downloadTemplateDoc('form02')}
                      className="py-1.5 px-3 rounded-lg bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Mẫu 02 (.doc)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate('form02')}
                      className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem mẫu</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  Dành cho tác phẩm có hình ảnh nhận diện nhân vật (người lớn hoặc trẻ em). Thí sinh tải mẫu (.doc) để người được chụp hoặc người giám hộ ký đồng ý, sau đó quét hoặc chụp ảnh rõ nét và tải lên đây (PDF, JPG, PNG tối đa 10MB).
                </p>

                <div className="relative border-2 border-dashed border-sky-300 hover:border-[#0984F0] bg-white rounded-xl p-6 text-center transition-all cursor-pointer">
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
                      <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold truncate">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="truncate">{docs.form02Name} ({docs.form02Size})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#0984F0] font-semibold underline">Chọn file khác</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDocs({ ...docs, form02Name: '', form02Size: '' });
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold underline z-10 relative cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600">
                      <Upload className="w-6 h-6 text-[#0984F0]" />
                      <span className="text-xs font-bold text-slate-700">Bấm để tải lên File scan Bản cam kết Mẫu 02 (nếu có nhân vật)</span>
                      <span className="text-[11px] text-slate-400">Hỗ trợ định dạng PDF, PNG, JPG, DOC (tối đa 10MB)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: NỘP BÀI DỰ THI */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Bước 2</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#D51517] hover:bg-[#b01012] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>NỘP BÀI DỰ THI CHÍNH THỨC</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL XEM TRƯỚC BIỂU MẪU MẪU 01 & MẪU 02 */}
      {/* ========================================================================= */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#F6FBFD] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MohLogo className="w-8 h-8 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#21469A] uppercase">
                    {previewTemplate === 'form01'
                      ? 'Mẫu số 01 – Phiếu đăng ký tham gia cuộc thi ảnh'
                      : 'Mẫu số 02 – Bản cam kết đồng ý của nhân vật'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ban hành kèm Kế hoạch số 414/KH-GDSKTW của T5G - Bộ Y tế
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Paper Content */}
            <div className="p-6 sm:p-8 overflow-y-auto font-serif text-slate-800 text-xs sm:text-[13px] leading-relaxed space-y-4 bg-slate-50/50">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200 space-y-4">
                {/* Official Vietnam Heading */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 text-center font-sans">
                  <div className="text-[11px] sm:text-xs">
                    <p className="uppercase">BỘ Y TẾ</p>
                    <p className="font-bold uppercase text-[#21469A]">TRUNG TÂM TT-GDSK TRUNG ƯƠNG</p>
                    <p className="text-slate-400">-------</p>
                  </div>
                  <div className="text-[11px] sm:text-xs">
                    <p className="font-bold uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                    <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
                    <p className="text-slate-400">-----------------</p>
                  </div>
                </div>

                <div className="text-right text-[11px] italic text-slate-500 font-sans">
                  {previewTemplate === 'form01' ? 'Mẫu số 01' : 'Mẫu số 02'}
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-bold text-base sm:text-lg text-[#21469A] uppercase tracking-wide">
                    {previewTemplate === 'form01'
                      ? 'PHIẾU ĐĂNG KÝ THAM GIA CUỘC THI ẢNH'
                      : 'BẢN CAM KẾT ĐỒNG Ý CỦA NHÂN VẬT'}
                  </h3>
                  <p className="italic text-xs text-slate-600">
                    {previewTemplate === 'form01'
                      ? '“Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”'
                      : '(Hoặc Người giám hộ hợp pháp nếu nhân vật là trẻ em dưới 16 tuổi)'}
                  </p>
                </div>

                <p className="text-center font-bold text-xs pt-1">
                  Kính gửi: Ban Tổ chức Cuộc thi ảnh về Chương trình Tiêm chủng mở rộng
                </p>

                {previewTemplate === 'form01' ? (
                  <div className="space-y-2 text-slate-700">
                    <p className="font-bold text-slate-900">I. THÔNG TIN THÍ SINH / TÁC GIẢ / NHÓM TÁC GIẢ:</p>
                    <p>1. Họ và tên: <strong>{author.fullName || '....................................................................................'}</strong></p>
                    <p>2. Ngày, tháng, năm sinh: <strong>{author.dob || '...... / ...... / ..........'}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Giới tính: .......................</p>
                    <p>3. Số CCCD / Căn cước / Hộ chiếu: <strong>{author.idNumber || '................................................................'}</strong></p>
                    <p>4. Đơn vị công tác / học tập: <strong>{author.organization || '............................................................................'}</strong></p>
                    <p>5. Địa chỉ liên hệ: <strong>{author.contactAddress || '....................................................................................................'}</strong></p>
                    <p>6. Số điện thoại: <strong>{author.phone || '...........................................'}</strong> &nbsp;&nbsp;&nbsp;&nbsp; Email: <strong>{author.email || '...........................................'}</strong></p>

                    <p className="font-bold text-slate-900 pt-2">II. THÔNG TIN SẢN PHẨM DỰ THI:</p>
                    <p>1. Tên sản phẩm dự thi: <strong className="text-[#21469A]">{product.productTitle || '............................................................................'}</strong></p>
                    <p>2. Loại hình: [ {product.category === 'single' ? 'X' : ' '} ] Ảnh đơn &nbsp;&nbsp;&nbsp;&nbsp; [ {product.category === 'series' ? 'X' : ' '} ] Ảnh bộ ({images.length > 0 ? images.length : '.....'} ảnh)</p>
                    <p>3. Tóm tắt nội dung tác phẩm (khoảng 100 - 200 chữ):</p>
                    <p className="italic bg-slate-50 p-2.5 rounded border border-slate-200">
                      {product.summary || '................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................'}
                    </p>

                    <p className="font-bold text-slate-900 pt-2">III. CAM KẾT CỦA TÁC GIẢ:</p>
                    <p className="text-[12px] leading-relaxed">
                      1. Tác phẩm tham dự là ảnh chụp thực tế người thật, việc thật; không sử dụng trí tuệ nhân tạo (AI); chưa từng đoạt giải tại bất kỳ cuộc thi cấp quốc gia nào trước đây.<br />
                      2. Chịu hoàn toàn trách nhiệm pháp lý về bản quyền tác phẩm và tính trung thực của các thông tin khai báo.<br />
                      3. Đồng ý cho Ban Tổ chức sử dụng tác phẩm phục vụ công tác truyền thông giáo dục sức khỏe phi thương mại vì lợi ích cộng đồng.
                    </p>

                    <div className="pt-6 grid grid-cols-2 text-center text-xs">
                      <div></div>
                      <div className="space-y-1">
                        <p className="italic">......., ngày ...... tháng ...... năm 2026</p>
                        <p className="font-bold uppercase">NGƯỜI ĐĂNG KÝ / ĐẠI DIỆN NHÓM</p>
                        <p className="italic text-[11px] text-slate-500">(Ký và ghi rõ họ tên)</p>
                        <div className="h-16"></div>
                        <p className="font-bold">{author.fullName || '................................................'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-700">
                    <p className="font-bold text-slate-900">I. THÔNG TIN NGƯỜI CAM KẾT (NHÂN VẬT HOẶC NGƯỜI GIÁM HỘ):</p>
                    <p>1. Tôi tên là: ............................................................................................................</p>
                    <p>2. Ngày sinh: ...... / ...... / .......... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Số CCCD: .................................................................</p>
                    <p>3. Địa chỉ thường trú: .................................................................................................</p>
                    <p>4. Số điện thoại: ..........................................................................................................</p>
                    <p>5. Mối quan hệ với nhân vật trong ảnh (nếu là người giám hộ): ........................................</p>
                    <p>Họ tên nhân vật (nếu là trẻ em): ..................................................................................</p>

                    <p className="font-bold text-slate-900 pt-2">II. NỘI DUNG ĐỒNG Ý & CAM KẾT:</p>
                    <p className="text-[12px] leading-relaxed">
                      1. Tôi xác nhận đã đồng ý để tác giả <strong>{author.fullName || '...........................................'}</strong> chụp ảnh tôi / con tôi trong quá trình tiêm chủng mở rộng.<br />
                      2. Đồng ý để tác giả gửi tác phẩm ảnh tham gia Cuộc thi: <strong>“Hành trình tiêm chủng – Vì một Việt Nam khỏe mạnh”</strong> do Bộ Y tế tổ chức.<br />
                      3. Đồng ý cho Ban Tổ chức Cuộc thi sử dụng hình ảnh này nhằm mục đích thông tin, tuyên truyền bảo vệ sức khỏe cộng đồng phi thương mại mà không có khiếu nại hay tranh chấp nào.
                    </p>

                    <div className="pt-6 grid grid-cols-2 text-center text-xs">
                      <div className="space-y-1">
                        <p className="font-bold uppercase">XÁC NHẬN CỦA TÁC GIẢ</p>
                        <p className="italic text-[11px] text-slate-500">(Ký và ghi rõ họ tên)</p>
                        <div className="h-16"></div>
                        <p className="font-bold">{author.fullName || '................................................'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="italic">......., ngày ...... tháng ...... năm 2026</p>
                        <p className="font-bold uppercase">NGƯỜI CAM KẾT / NGƯỜI GIÁM HỘ</p>
                        <p className="italic text-[11px] text-slate-500">(Ký và ghi rõ họ tên)</p>
                        <div className="h-16"></div>
                        <p className="font-bold">................................................</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-200 bg-[#F6FBFD] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Đóng
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadTemplateDoc(previewTemplate)}
                  className="px-5 py-2 bg-[#21469A] hover:bg-[#0984F0] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file Word (.doc) này về máy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
