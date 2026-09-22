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
    takenDate: '15/08/2024',
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
    takenDate: '22/07/2024',
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
    takenDate: '05/09/2024',
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
    takenDate: '18/08/2024',
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
    takenDate: '10/08/2024',
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
    takenDate: '28/07/2024',
    description: 'Khoảnh khắc điều dưỡng viên dỗ dành và tạo sự an tâm tuyệt đối cho cháu nhỏ trước khi tiêm vắc xin 5 trong 1.'
  },
  {
    id: '7',
    code: 'TC-007',
    title: 'Hành trình 40 năm - Những bước chân không mỏi',
    author: 'Vũ Quốc Hưng (Lâm Đồng)',
    category: 'series',
    categoryLabel: 'Ảnh bộ',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    votes: 1120,
    location: 'Các buôn làng huyện Lạc Dương, tỉnh Lâm Đồng',
    takenDate: '12/08/2024',
    description: 'Ghi lại chân dung các thế hệ cán bộ y tế tận tụy gắn bó cùng chương trình tiêm chủng mở rộng suốt nhiều thập kỷ.'
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
    takenDate: '02/09/2024',
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
    takenDate: '19/08/2024',
    description: 'Không khí tươi vui trong ngày khám sàng lọc và tiêm nhắc lại cho các bé mầm non đồng bào dân tộc H’Mông.'
  }
];

export const PRIZE_DATA: PrizeItem[] = [
  {
    id: 'p1',
    title: '01 GIẢI ĐẶC BIỆT',
    category: 'Chung cho tác phẩm xuất sắc nhất',
    quantity: 1,
    cashValue: '30.000.000 VNĐ',
    description: 'Tác phẩm có giá trị nghệ thuật và thông điệp truyền thông sâu sắc nhất về 40 năm Tiêm chủng mở rộng.',
    bonus: 'Bằng khen của Bộ trưởng Bộ Y tế + Cúp lưu niệm + Giấy chứng nhận',
    isSpecial: true
  },
  {
    id: 'p2',
    title: '02 GIẢI NHẤT',
    category: '01 Giải Ảnh đơn & 01 Giải Ảnh bộ',
    quantity: 2,
    cashValue: '15.000.000 VNĐ / giải',
    description: 'Tác phẩm đạt điểm cao nhất theo đánh giá của Ban Giám khảo và cộng đồng trong từng thể loại.',
    bonus: 'Bằng khen của Bộ Y tế + Kỷ niệm chương + Giấy chứng nhận'
  },
  {
    id: 'p3',
    title: '04 GIẢI NHÌ',
    category: '02 Giải Ảnh đơn & 02 Giải Ảnh bộ',
    quantity: 4,
    cashValue: '10.000.000 VNĐ / giải',
    description: 'Các tác phẩm có chất lượng bố cục, ánh sáng và khoảnh khắc xuất sắc.',
    bonus: 'Giấy chứng nhận của Ban Tổ chức + Kỷ niệm chương'
  },
  {
    id: 'p4',
    title: '06 GIẢI BA',
    category: '03 Giải Ảnh đơn & 03 Giải Ảnh bộ',
    quantity: 6,
    cashValue: '5.000.000 VNĐ / giải',
    description: 'Tác phẩm thể hiện chân thực tinh thần vượt khó của cán bộ y tế cơ sở.',
    bonus: 'Giấy chứng nhận của Ban Tổ chức + Kỷ niệm chương'
  },
  {
    id: 'p5',
    title: '10 GIẢI KHUYẾN KHÍCH',
    category: '05 Ảnh đơn & 05 Ảnh bộ',
    quantity: 10,
    cashValue: '2.500.000 VNĐ / giải',
    description: 'Tác phẩm đạt chuẩn sơ khảo với thông điệp ý nghĩa vì sức khỏe trẻ thơ.',
    bonus: 'Giấy chứng nhận của Ban Tổ chức'
  },
  {
    id: 'p6',
    title: '02 GIẢI BÌNH CHỌN CỘNG ĐỒNG',
    category: 'Tác phẩm được bình chọn nhiều nhất',
    quantity: 2,
    cashValue: '5.000.000 VNĐ / giải',
    description: 'Dành cho 01 ảnh đơn và 01 ảnh bộ nhận số lượt vote cao nhất trên Cổng bình chọn trực tuyến.',
    bonus: 'Giấy chứng nhận của Ban Tổ chức'
  }
];

export const TIMELINE_DATA: TimelineStep[] = [
  {
    id: 1,
    title: 'Phát động',
    date: '01/08/2024',
    description: 'Công bố thể lệ và phát động cuộc thi trên toàn quốc',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Nhận tác phẩm',
    date: '01/08 - 15/09/2024',
    description: 'Tiếp nhận hồ sơ dự thi của tác giả cả nước',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Sơ khảo',
    date: '16/09 - 25/09/2024',
    description: 'Hội đồng Giám khảo chọn lọc 100 tác phẩm vào vòng bình chọn',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Bình chọn',
    date: '01/10 - 20/10/2024',
    description: 'Mở cổng bình chọn trực tuyến công khai trên hệ thống Bộ Y tế',
    status: 'active'
  },
  {
    id: 5,
    title: 'Chung khảo',
    date: '22/10 - 28/10/2024',
    description: 'Chấm điểm chung khảo kết hợp tỷ trọng 20% điểm cộng đồng',
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Trao giải',
    date: '15/11/2024',
    description: 'Lễ công bố và trao giải thưởng chính thức tại Hà Nội',
    status: 'upcoming'
  }
];
