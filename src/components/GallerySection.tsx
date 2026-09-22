import React, { useState, useMemo } from 'react';
import { Artwork, CategoryType } from '../types';
import { Search, Heart, Share2, Eye, SlidersHorizontal, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface GallerySectionProps {
  artworks: Artwork[];
  votedIds: Set<string>;
  onVote: (artwork: Artwork) => void;
  onShare: (artwork: Artwork) => void;
  onPreview: (artwork: Artwork) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  artworks,
  votedIds,
  onVote,
  onShare,
  onPreview
}) => {
  const [currentTab, setCurrentTab] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'code' | 'title'>('votes');

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // Tab filter
        if (currentTab === 'single' && art.category !== 'single') return false;
        if (currentTab === 'series' && art.category !== 'series') return false;

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchCode = art.code.toLowerCase().includes(query);
          const matchTitle = art.title.toLowerCase().includes(query);
          const matchAuthor = art.author.toLowerCase().includes(query);
          const matchLocation = art.location.toLowerCase().includes(query);
          if (!matchCode && !matchTitle && !matchAuthor && !matchLocation) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'votes') return b.votes - a.votes;
        if (sortBy === 'code') return a.code.localeCompare(b.code);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [artworks, currentTab, searchQuery, sortBy]);

  return (
    <section id="gallery" className="py-16 bg-[#F6FBFD] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#E7F6FC] text-[#0984F0] text-xs font-bold uppercase tracking-wider mb-2">
            VÒNG BÌNH CHỌN TRỰC TUYẾN
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#21469A] uppercase tracking-tight">
            TÁC PHẨM BÌNH CHỌN
          </h2>
          <div className="w-20 h-1 bg-[#0984F0] mx-auto mt-2.5 rounded-full"></div>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            Mỗi lượt bình chọn của quý vị là nguồn cổ vũ to lớn cho các tác giả và tôn vinh những cống hiến thầm lặng của đội ngũ y tế.
          </p>
        </motion.div>

        {/* Filter Bar: Tabs on left, Search & Sort on right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Category Tabs: Tất cả / Ảnh đơn / Ảnh bộ */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setCurrentTab('all')}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'all'
                  ? 'bg-white text-[#21469A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({artworks.length})
            </button>
            <button
              onClick={() => setCurrentTab('single')}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'single'
                  ? 'bg-white text-[#21469A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ảnh đơn ({artworks.filter((a) => a.category === 'single').length})
            </button>
            <button
              onClick={() => setCurrentTab('series')}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'series'
                  ? 'bg-white text-[#21469A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ảnh bộ ({artworks.filter((a) => a.category === 'series').length})
            </button>
          </div>

          {/* Search Box + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã số, tác phẩm, tác giả..."
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#0984F0] focus:ring-2 focus:ring-[#0984F0]/15 transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-hidden focus:border-[#0984F0] cursor-pointer"
              >
                <option value="votes">Bình chọn nhiều nhất</option>
                <option value="code">Mã số (A - Z)</option>
                <option value="title">Tên tác phẩm</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Không tìm thấy tác phẩm phù hợp với từ khóa.</p>
            <button
              onClick={() => { setSearchQuery(''); setCurrentTab('all'); }}
              className="mt-3 px-4 py-2 bg-[#E7F6FC] text-[#0984F0] text-xs font-bold rounded-lg hover:bg-sky-100"
            >
              Xem tất cả tác phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArtworks.map((artwork, index) => {
              const hasVoted = votedIds.has(artwork.id);
              return (
                <motion.div
                  key={artwork.id}
                  id={`artwork-card-${artwork.code}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onPreview(artwork)}>
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs font-medium flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-[#2EBDF4]" />
                        <span>Xem chi tiết tác phẩm</span>
                      </span>
                    </div>

                    {/* Top Left: Badge (Ảnh đơn / Ảnh bộ) */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs ${
                          artwork.category === 'single'
                            ? 'bg-[#0984F0] text-white'
                            : 'bg-[#21469A] text-white'
                        }`}
                      >
                        {artwork.categoryLabel}
                      </span>
                    </div>

                    {/* Top Right: Code Badge */}
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold tabular-nums px-2.5 py-1 rounded-md shadow-xs tracking-wide">
                      {artwork.code}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3
                        onClick={() => onPreview(artwork)}
                        className="text-[15px] font-bold text-slate-800 hover:text-[#0984F0] line-clamp-2 leading-snug cursor-pointer transition-colors"
                        title={artwork.title}
                      >
                        {artwork.title}
                      </h3>

                      {/* Author */}
                      <p className="mt-2 text-xs font-medium text-slate-500">
                        Tác giả: <span className="text-slate-700 font-semibold">{artwork.author}</span>
                      </p>

                      {/* Vote count */}
                      <div className="mt-3 flex items-center justify-between text-xs py-2 px-3 bg-[#F6FBFD] rounded-lg border border-sky-100">
                        <span className="text-slate-500 font-medium">Lượt bình chọn</span>
                        <span className="font-bold text-[#21469A] text-sm tabular-nums">
                          {artwork.votes.toLocaleString('vi-VN')}
                        </span>
                      </div>
                    </div>

                    {/* Buttons: "Bình chọn" and "Chia sẻ" */}
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onVote(artwork)}
                        id={`btn-vote-${artwork.code}`}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          hasVoted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : 'bg-[#0984F0] hover:bg-[#21469A] text-white shadow-xs hover:shadow'
                        }`}
                      >
                        {hasVoted ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đã bình chọn</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4 fill-white/20 stroke-[2]" />
                            <span>Bình chọn</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        id={`btn-share-${artwork.code}`}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 flex items-center justify-center gap-1.5 cursor-default select-none"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
