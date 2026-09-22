import React, { useState } from 'react';
import { ARTWORKS_DATA } from './data/contestData';
import { Artwork } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CountdownSection } from './components/CountdownSection';
import { StatisticsRow } from './components/StatisticsRow';
import { GallerySection } from './components/GallerySection';
import { IntroductionSection } from './components/IntroductionSection';
import { PrizesSection } from './components/PrizesSection';
import { TimelineSection } from './components/TimelineSection';
import { Footer } from './components/Footer';
import { SubmissionPage } from './components/SubmissionPage';
import { Toast, PreviewModal, RulesModal } from './components/Modals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'submit'>('home');
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS_DATA);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set(['1'])); // initial simulated vote
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [previewArtwork, setPreviewArtwork] = useState<Artwork | null>(null);
  const [userLoggedIn] = useState(false);
  const [userName] = useState<string>('Nguyễn Văn A');

  // Toast state
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleVote = (artwork: Artwork) => {
    if (votedIds.has(artwork.id)) {
      // Toggle off or already voted alert
      showToast(`Bạn đã bình chọn cho tác phẩm ${artwork.code}. Mỗi tài khoản chỉ bình chọn 01 lần!`);
      return;
    }

    // Increment vote count
    setArtworks((prev) =>
      prev.map((item) =>
        item.id === artwork.id ? { ...item, votes: item.votes + 1 } : item
      )
    );
    setVotedIds((prev) => new Set([...prev, artwork.id]));

    if (previewArtwork && previewArtwork.id === artwork.id) {
      setPreviewArtwork((prev) => (prev ? { ...prev, votes: prev.votes + 1 } : null));
    }

    showToast(`Bình chọn thành công cho tác phẩm ${artwork.code}: "${artwork.title}"`);
  };

  const handleShare = () => {
    // Nút tĩnh, không hiện thông báo
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* 1. Sticky White Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoginClick={() => {}}
        onOpenRules={() => setIsRulesOpen(true)}
        userLoggedIn={userLoggedIn}
        userName={userName}
      />

      <main className="flex-1">
        {currentPage === 'submit' ? (
          <SubmissionPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showToast={showToast}
            onOpenRules={() => setIsRulesOpen(true)}
          />
        ) : (
          <>
            {/* 2. Hero Banner */}
            <HeroBanner />

            {/* 3. Large Countdown Section */}
            <CountdownSection
              onSubmitClick={() => {
                setCurrentPage('submit');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Statistics Row */}
            <StatisticsRow totalVotes={12580 + (votedIds.size > 1 ? votedIds.size - 1 : 0)} />

            {/* 5. Tác Phẩm Bình Chọn */}
            <GallerySection
              artworks={artworks}
              votedIds={votedIds}
              onVote={handleVote}
              onShare={handleShare}
              onPreview={(art) => setPreviewArtwork(art)}
            />

            {/* 6. Giới Thiệu Cuộc Thi */}
            <IntroductionSection onOpenRules={() => setIsRulesOpen(true)} />

            {/* 7. Cơ Cấu Giải Thưởng */}
            <PrizesSection />

            {/* 8. Timeline Cuộc Thi */}
            <TimelineSection />
          </>
        )}
      </main>

      {/* 9. Dark Blue Footer */}
      <Footer onOpenRules={() => setIsRulesOpen(true)} />

      {/* Modals & Floating Components */}
      <PreviewModal
        artwork={previewArtwork}
        onClose={() => setPreviewArtwork(null)}
        onVote={handleVote}
        onShare={handleShare}
        hasVoted={previewArtwork ? votedIds.has(previewArtwork.id) : false}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
