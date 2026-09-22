import React from 'react';

interface MohLogoProps {
  className?: string;
  withSubtext?: boolean;
}

export const MohLogo: React.FC<MohLogoProps> = ({
  className = 'w-10 h-10',
  withSubtext = false
}) => {
  if (withSubtext) {
    return (
      <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 240 230"
          className="w-full h-auto drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Arc for "BỘ Y TẾ" text */}
          <path id="subtext-moh-arc" d="M 64 66 A 65 65 0 0 1 176 66" fill="none" />
          <text fill="#1E3A8A" fontWeight="900" fontSize="14" letterSpacing="3">
            <textPath href="#subtext-moh-arc" startOffset="50%" textAnchor="middle">
              BỘ Y TẾ
            </textPath>
          </text>

          {/* Left Signal Radiating Waves */}
          <path
            d="M 76 56 A 57 57 0 0 0 76 132"
            fill="none"
            stroke="#D51517"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M 72 44 A 69 69 0 0 0 72 144"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Right Signal Radiating Waves */}
          <path
            d="M 164 56 A 57 57 0 0 1 164 132"
            fill="none"
            stroke="#D51517"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M 168 44 A 69 69 0 0 1 168 144"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Central Blue Disc */}
          <circle cx="120" cy="94" r="44" fill="#1E3A8A" />

          {/* Stylized White Wings */}
          <path
            d="M 92 72 C 100 83 111 91 120 93 C 129 91 140 83 148 72 C 142 78 131 84 120 84 C 109 84 98 78 92 72 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 94 73 C 89 79 92 86 103 89 C 109 91 115 92 120 94 C 125 92 131 91 137 89 C 148 86 151 79 146 73 C 140 81 129 86 120 86 C 111 86 100 81 94 73 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />

          {/* Central Asklepios Staff */}
          <rect x="118.5" y="63" width="3" height="58" rx="1.5" fill="#FFFFFF" />
          <circle cx="120" cy="64" r="2.5" fill="#FFFFFF" />

          {/* Serpent coiling around the staff */}
          <path
            d="M 115 72 C 113 70 115 67 118 68 C 122 69 125 74 125 79 C 125 85 116 87 115 92 C 114 97 125 99 125 105 C 125 111 117 114 118 119"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small droplet at the base */}
          <path
            d="M 120 120 C 118 123 118 126 120 129 C 122 126 122 123 120 120 Z"
            fill="#FFFFFF"
          />

          {/* T5G Text underneath the circle */}
          <text
            x="103"
            y="160"
            fill="#1E3A8A"
            fontWeight="900"
            fontSize="21"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            T5
          </text>
          <text
            x="133"
            y="160"
            fill="#D51517"
            fontWeight="900"
            fontSize="21"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            G
          </text>
          {/* Red dot accent */}
          <circle cx="140.5" cy="148" r="2" fill="#D51517" />

          {/* Full Ministry Subtext Lines */}
          <text
            x="120"
            y="188"
            fill="#1E3A8A"
            fontWeight="800"
            fontSize="10.5"
            letterSpacing="0.8"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            TRUNG TÂM TRUYỀN THÔNG -
          </text>
          <text
            x="120"
            y="204"
            fill="#1E3A8A"
            fontWeight="800"
            fontSize="10.5"
            letterSpacing="0.8"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            GIÁO DỤC SỨC KHỎE TRUNG ƯƠNG
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Official T5G - BỘ Y TẾ Emblem */}
      <svg
        viewBox="0 0 170 170"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Arc for "BỘ Y TẾ" text */}
        <path id="moh-arc" d="M 32 54 A 57 57 0 0 1 138 54" fill="none" />
        <text fill="#1E3A8A" fontWeight="900" fontSize="13.5" letterSpacing="2.5">
          <textPath href="#moh-arc" startOffset="50%" textAnchor="middle">
            BỘ Y TẾ
          </textPath>
        </text>

        {/* Left Signal Radiating Waves */}
        <path
          d="M 45 46 A 48 48 0 0 0 45 114"
          fill="none"
          stroke="#D51517"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M 40 35 A 60 60 0 0 0 40 125"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="3.8"
          strokeLinecap="round"
        />

        {/* Right Signal Radiating Waves */}
        <path
          d="M 125 46 A 48 48 0 0 1 125 114"
          fill="none"
          stroke="#D51517"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M 130 35 A 60 60 0 0 1 130 125"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="3.8"
          strokeLinecap="round"
        />

        {/* Central Blue Disc */}
        <circle cx="85" cy="80" r="38" fill="#1E3A8A" />

        {/* Stylized White Wings */}
        <path
          d="M 61 61 C 68 70 77 78 85 80 C 93 78 102 70 109 61 C 104 66 94 72 85 72 C 76 72 66 66 61 61 Z"
          fill="#FFFFFF"
        />
        <path
          d="M 62 62 C 58 67 61 73 70 76 C 75 78 80 79 85 80 C 90 79 95 78 100 76 C 109 73 112 67 108 62 C 103 69 93 74 85 74 C 77 74 67 69 62 62 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* Central Asklepios Staff */}
        <rect x="83.5" y="53" width="3" height="51" rx="1.5" fill="#FFFFFF" />
        <circle cx="85" cy="54" r="2.2" fill="#FFFFFF" />

        {/* Serpent coiling around the staff */}
        <path
          d="M 80 61 C 78 59 80 57 83 58 C 87 59 89 63 89 67 C 89 72 82 74 81 78 C 80 82 89 84 89 89 C 89 94 82 97 83 101"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small droplet at the base */}
        <path
          d="M 85 102 C 83 105 83 107 85 110 C 87 107 87 105 85 102 Z"
          fill="#FFFFFF"
        />

        {/* T5G Text underneath the circle */}
        <text
          x="70"
          y="140"
          fill="#1E3A8A"
          fontWeight="900"
          fontSize="18.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          T5
        </text>
        <text
          x="97"
          y="140"
          fill="#D51517"
          fontWeight="900"
          fontSize="18.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          G
        </text>
        {/* Red dot accent on G */}
        <circle cx="103.5" cy="129.5" r="1.8" fill="#D51517" />
      </svg>
    </div>
  );
};

