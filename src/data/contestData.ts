import { Artwork, PrizeItem, TimelineStep } from '../types';

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: '1',
    code: 'TC-001',
    title: 'Nụ cười sau mũi tiêm tại bản Lao Chải',
    author: 'Nguyễn Văn Minh (Hà Giang)',
    category: 'single',
    categoryLabel: 'Ảnh đơn',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    votes: 1420,
    location: 'Trạm Y tế xã Lao Chải, huyện Vị Xuyên, Hà Giang',
    takenDate: '15/08/2026',
    description: 'Bé Vàng Thị Mây (18 tháng tuổi) được cán bộ y tế cơ sở tiêm vắc xin sởi - rubella trong chiến dịch tiêm bù vùng cao.'
  },
  {
    id: '2',
    code: 'TC-002',
    title: 'Hành trình vượt dốc đưa vắc xin đến bản xa',
    author: 'Trần Thị Thu Trang (Lào Cai)',
    category: 'series',
    categoryLabel: 'Ảnh bộ',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80'
    ],
    votes: 1285,
    location: 'Xã Y Tý, huyện Bát Xát, tỉnh Lào Cai',
    takenDate: '22/07/2026',
    description: 'Bộ ảnh ghi lại chuyến đi ròng rã 6 tiếng của các y bác sĩ trạm y tế mang hòm lạnh bảo quản vắc xin qua đường đèo dốc sạt lở.'
  },
  {
    id: '3',
    code: 'TC-003',
    title: 'Ấm áp vòng tay mẹ và người thầy thuốc',
    author: 'Lê Hoàng Nam (Đà Nẵng)',
    category: 'single',
    categoryLabel: 'Ảnh đơn',
    imageUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1000&q=80',
    votes: 980,
    location: 'Trung tâm Y tế quận Hải Châu, TP. Đà Nẵng',
    takenDate: '05/09/2026',
    description: 'Bác sĩ chuyên khoa hướng dẫn phụ huynh theo dõi phản ứng sau tiêm 30 phút tại phòng chờ tiêm chủng mở rộng.'
  },
  {
    id: '4',
    code: 'TC-004',
    title: 'Giữ chuẩn lạnh vắc xin - Mạch nguồn an toàn',
    author: 'Phạm Đức Dũng (Hà Nội)',
    category: 'single',
    categoryLabel: 'Ảnh đơn',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    votes: 1150,
    location: 'Viện Vệ sinh Dịch tễ Trung ương, Hà Nội',
    takenDate: '18/08/2026',
    description: 'Quy trình kiểm tra nhiệt độ nghiêm ngặt và bảo quản vắc xin đạt chuẩn quốc gia trước khi phân bổ về các tỉnh miền núi.'
  },
  {
    id: '5',
    code: 'TC-005',
    title: 'Tiêm chủng lưu động tại xã đảo Thổ Chu',
    author: 'Nguyễn Thành Long (Kiên Giang)',
    category: 'series',
    categoryLabel: 'Ảnh bộ',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80'
    ],
    votes: 1340,
    location: 'Quần đảo Thổ Chu, TP. Phú Quốc, tỉnh Kiên Giang',
    takenDate: '10/08/2026',
    description: 'Bộ ảnh phản ánh nỗ lực tiêm chủng cho toàn bộ trẻ em và phụ nữ mang thai nơi đầu sóng ngọn gió vùng biển Tây Nam.'
  },
  {
    id: '6',
    code: 'TC-006',
    title: 'Đôi mắt tin cậy nơi phòng tiêm',
    author: 'Hoàng Kim Chi (Nghệ An)',
    category: 'single',
    categoryLabel: 'Ảnh đơn',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    votes: 890,
    location: 'Trạm Y tế xã Chiêu Lưu, huyện Kỳ Sơn, tỉnh Nghệ An',
    takenDate: '28/07/2026',
    description: 'Khoảnh khắc điều dưỡng viên dỗ dành và tạo sự an tâm tuyệt đối cho cháu nhỏ trước khi tiêm vắc xin 5 trong 1.'
  },
  {
    id: '7',
    code: 'TC-007',
    title: 'Lá chắn yêu thương - Vững vàng mầm non',
    author: 'Vũ Quốc Hưng (Lâm Đồng)',
    category: 'series',
    categoryLabel: 'Ảnh bộ',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    votes: 1120,
    location: 'Các buôn làng huyện Lạc Dương, tỉnh Lâm Đồng',
    takenDate: '12/08/2026',
    description: 'Ghi lại chân dung các y bác sĩ tận tụy gắn bó cùng công tác tiêm chủng mở rộng cho đồng bào vùng sâu vùng xa.'
  },
  {
    id: '8',
    code: 'TC-008',
    title: 'Tấm khiên bảo vệ tương lai',
    author: 'Đỗ Hải Đăng (TP. Hồ Chí Minh)',
    category: 'single',
    categoryLabel: 'Ảnh đơn',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    votes: 940,
    location: 'Bệnh viện Nhi Đồng 1, TP. Hồ Chí Minh',
    takenDate: '02/09/2026',
    description: 'Cử chỉ ân cần của bác sĩ tiêm chủng khi trao sổ theo dõi sức khỏe và lịch tiêm định kỳ cho gia đình trẻ.'
  },
  {
    id: '9',
    code: 'TC-009',
    title: 'Ngày hội tiêm chủng tại trường mầm non vùng cao',
    author: 'Sùng A Tủa (Sơn La)',
    category: 'series',
    categoryLabel: 'Ảnh bộ',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    votes: 1050,
    location: 'Điểm trường Co Mạ, huyện Thuận Châu, tỉnh Sơn La',
    takenDate: '19/08/2026',
    description: 'Không khí tươi vui trong ngày khám sàng lọc và tiêm nhắc lại cho các bé mầm non đồng bào dân tộc H’Mông.'
  }
];

export const PRIZE_DATA: PrizeItem[] = [
  {
    id: 'p1',
    title: '01 GIẢI NHẤT (MỖI LOẠI HÌNH)',
    category: '01 Giải Ảnh đơn & 01 Giải Ảnh bộ',
    quantity: 2,
    cashValue: '10.000.000 đ',
    description: 'Trao cho tác phẩm xuất sắc nhất mỗi loại hình, đạt tổng điểm cao nhất kết hợp 80% từ Hội đồng Giám khảo và 20% bình chọn trực tuyến.',
    bonus: 'Giấy chứng nhận + Cúp/Kỷ niệm chương của BTC',
    isSpecial: true
  },
  {
    id: 'p2',
    title: '03 GIẢI NHÌ (MỖI LOẠI HÌNH)',
    category: '03 Giải Ảnh đơn & 03 Giải Ảnh bộ',
    quantity: 6,
    cashValue: '7.000.000 đ / giải',
    description: 'Các tác phẩm có chất lượng bố cục, ánh sáng và khoảnh khắc xuất sắc, truyền tải trọn vẹn thông điệp bảo vệ sức khỏe cộng đồng.',
    bonus: 'Giấy chứng nhận + Cúp/Kỷ niệm chương của BTC'
  },
  {
    id: 'p3',
    title: '05 GIẢI BA (MỖI LOẠI HÌNH)',
    category: '05 Giải Ảnh đơn & 05 Giải Ảnh bộ',
    quantity: 10,
    cashValue: '5.000.000 đ / giải',
    description: 'Tác phẩm thể hiện chân thực tinh thần trách nhiệm, sự tận tụy của cán bộ y tế cơ sở và sự đồng thuận của nhân dân.',
    bonus: 'Giấy chứng nhận + Cúp/Kỷ niệm chương của BTC'
  },
  {
    id: 'p4',
    title: '07 GIẢI KHUYẾN KHÍCH (MỖI LOẠI HÌNH)',
    category: '07 Giải Ảnh đơn & 07 Giải Ảnh bộ',
    quantity: 14,
    cashValue: '3.000.000 đ / giải',
    description: 'Tác phẩm đạt chuẩn kỹ thuật và nghệ thuật, mang ý nghĩa lan tỏa tích cực về lợi ích của tiêm chủng mở rộng.',
    bonus: 'Giấy chứng nhận + Cúp/Kỷ niệm chương của BTC'
  },
  {
    id: 'p5',
    title: '09 GIẢI CHUYÊN ĐỀ (MỖI LOẠI HÌNH)',
    category: '09 Giải Ảnh đơn & 09 Giải Ảnh bộ',
    quantity: 18,
    cashValue: '1.500.000 đ / giải',
    description: 'Tiêu chí cụ thể do Ban Giám khảo thống nhất và quyết định dựa trên chất lượng thực tế của các sản phẩm dự thi.',
    bonus: 'Giấy chứng nhận + Cúp/Kỷ niệm chương của BTC'
  }
];

export const TIMELINE_DATA: TimelineStep[] = [
  {
    id: 1,
    title: 'GĐ 1: Phát động',
    date: 'Tháng 9/2026',
    description: 'Ban hành Kế hoạch, Thể lệ',
    status: 'active'
  },
  {
    id: 2,
    title: 'GĐ 2: Nộp sản phẩm',
    date: 'Từ phát động - 31/10/2026',
    description: 'Tiếp nhận sản phẩm dự thi trực tuyến qua cổng Cuocthitiemchung2026.org',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'GĐ 3: Chấm Sơ khảo',
    date: '1/11 - 14/11/2026',
    description: 'Hội đồng Giám khảo chấm sơ khảo, lựa chọn ra 100 tác phẩm xuất sắc nhất',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'GĐ 4: Bình chọn & Chấm chung khảo',
    date: '15/11 - 30/11/2026',
    description: 'Mở cổng bình chọn trực tuyến công khai và chấm chung khảo',
    status: 'upcoming'
  },
  
  {
    id: 5,
    title: 'GĐ 5: Tổng kết & Trao giải',
    date: 'Tháng 11 - 12/2026',
    description: 'Tổ chức Lễ Tổng kết, công bố và trao giải thưởng',
    status: 'upcoming'
  }
];

