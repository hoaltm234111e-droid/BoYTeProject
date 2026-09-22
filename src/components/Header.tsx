import React from 'react';
import { MohLogo } from './MohLogo';
import { User, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onOpenRules: () => void;
  userLoggedIn: boolean;
  userName?: string;
  onLogout?: () => void;
  currentPage?: 'home' | 'submit';
  onNavigate?: (page: 'home' | 'submit') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onOpenRules,
  userLoggedIn,
  userName = 'Nguyễn Văn A',
  currentPage = 'home',
  onNavigate
}) => {
  const handleNav = (page: 'home' | 'submit', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Ministry Brand & Emblem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home', 'home');
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <MohLogo className="w-12 h-12" />
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold tracking-wider text-[#D51517] uppercase">
              BỘ Y TẾ
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-normal text-[#21469A] uppercase line-clamp-1">
              TRUNG TÂM TRUYỀN THÔNG - GIÁO DỤC SỨC KHỎE TW
            </span>
          </div>
        </a>

        {/* Center: Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleNav('home', 'home')}
            className={`px-3 py-2 text-[14px] transition-colors rounded-md cursor-pointer ${
              currentPage === 'home'
                ? 'font-bold text-[#21469A]'
                : 'font-medium text-slate-700 hover:text-[#0984F0]'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNav('home', 'gallery')}
            className="px-3 py-2 text-[14px] font-medium text-slate-700 hover:text-[#0984F0] rounded-md transition-colors cursor-pointer"
          >
            Tác phẩm dự thi
          </button>
          <button
            onClick={onOpenRules}
            className="px-3 py-2 text-[14px] font-medium text-slate-700 hover:text-[#0984F0] rounded-md transition-colors cursor-pointer"
          >
            Thể lệ
          </button>
          <button
            onClick={() => handleNav('submit')}
            id="nav-submit-product"
            className={`px-3.5 py-2 text-[14px] rounded-md transition-colors cursor-pointer ${
              currentPage === 'submit'
                ? 'font-bold text-[#21469A] bg-[#E7F6FC] border border-[#2EBDF4]/40 shadow-xs'
                : 'font-medium text-slate-700 hover:text-[#0984F0]'
            }`}
          >
            Nộp sản phẩm
          </button>
        </nav>

        {/* Right side: Login + Blue CTA */}
        <div className="flex items-center gap-3">
          {userLoggedIn ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E7F6FC] rounded-lg border border-[#2EBDF4]/40 text-[#21469A] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#0984F0]" />
              <span className="max-w-[100px] truncate">{userName}</span>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              id="header-login-btn"
              className="flex items-center gap-1.5 text-[14px] font-medium text-slate-700 hover:text-[#21469A] px-3 py-2 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Đăng nhập</span>
            </button>
          )}

          <button
            onClick={() => handleNav('home', 'gallery')}
            id="header-vote-cta"
            className="bg-[#0984F0] hover:bg-[#21469A] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 uppercase tracking-wide cursor-pointer flex items-center justify-center whitespace-nowrap"
          >
            BÌNH CHỌN NGAY
          </button>
        </div>
      </div>
    </header>
  );
};
