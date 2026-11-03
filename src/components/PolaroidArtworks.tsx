import React from 'react';

interface PolaroidArtworkProps {
  id: 'colonnade' | 'willows' | 'riva';
  className?: string;
}

export const PolaroidArtwork: React.FC<PolaroidArtworkProps> = ({ id, className = 'w-full h-full' }) => {
  if (id === 'colonnade') {
    return (
      <svg
        viewBox="0 0 480 360"
        className={className}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Lucia and Enzo strolling beneath the stone loggia at Villa del Balbianello overlooking Lake Como"
      >
        <defs>
          <linearGradient id="comoSkyGolden" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8AA3BA" />
            <stop offset="48%" stopColor="#C8D4DE" />
            <stop offset="100%" stopColor="#EAE2D6" />
          </linearGradient>
          <linearGradient id="comoLakeWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D7892" />
            <stop offset="50%" stopColor="#415B76" />
            <stop offset="100%" stopColor="#263B52" />
          </linearGradient>
          <linearGradient id="stoneArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8CEC0" />
            <stop offset="60%" stopColor="#B8AA98" />
            <stop offset="100%" stopColor="#8F8272" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="480" height="220" fill="url(#comoSkyGolden)" />
        {/* Soft Sun Glow over Bellagio */}
        <circle cx="310" cy="115" r="55" fill="#FAF3E6" opacity="0.65" />

        {/* Distant Alpine Mountains (Grigne Peaks) */}
        <path
          d="M0,185 L68,125 L135,155 L220,98 L305,148 L385,108 L480,152 L480,210 L0,210 Z"
          fill="#6C8299"
          opacity="0.65"
        />
        <path
          d="M90,190 L175,132 L265,168 L355,118 L445,165 L480,148 L480,210 L90,210 Z"
          fill="#516880"
          opacity="0.78"
        />

        {/* Lake Como Water & Shimmering Reflections */}
        <rect x="0" y="188" width="480" height="105" fill="url(#comoLakeWater)" />
        <g stroke="#EBE5DA" strokeWidth="1.2" opacity="0.55">
          <line x1="265" y1="198" x2="345" y2="198" />
          <line x1="250" y1="208" x2="360" y2="208" />
          <line x1="275" y1="218" x2="335" y2="218" />
          <line x1="240" y1="230" x2="355" y2="230" />
          <line x1="280" y1="242" x2="330" y2="242" />
        </g>

        {/* Cypress Trees on Distant Villa Shore */}
        <g fill="#2C3E35" opacity="0.85">
          <path d="M105,190 C105,150 112,135 115,120 C118,135 125,150 125,190 Z" />
          <path d="M132,190 C132,158 138,145 140,132 C142,145 148,158 148,190 Z" />
          <path d="M402,190 C402,148 408,132 411,116 C414,132 420,148 420,190 Z" />
        </g>

        {/* Terracotta & Flagstone Loggia Floor */}
        <polygon points="0,275 480,275 480,360 0,360" fill="#C4B5A2" />
        <g stroke="#9E8E7B" strokeWidth="1" opacity="0.6">
          <line x1="0" y1="298" x2="480" y2="298" />
          <line x1="0" y1="326" x2="480" y2="326" />
          <line x1="120" y1="275" x2="60" y2="360" />
          <line x1="240" y1="275" x2="240" y2="360" />
          <line x1="360" y1="275" x2="420" y2="360" />
        </g>

        {/* Stone Balustrade Overlooking the Lake */}
        <rect x="0" y="242" width="480" height="8" fill="#B6A896" />
        <rect x="0" y="270" width="480" height="7" fill="#9E8F7C" />
        <g fill="#C6B9A8" stroke="#8C7E6C" strokeWidth="0.8">
          {[32, 62, 92, 122, 152, 182, 212, 272, 302, 332, 362, 392, 422, 452].map((x) => (
            <rect key={x} x={x} y="250" width="8" height="20" rx="3" />
          ))}
        </g>

        {/* Classical Villa del Balbianello Triple Stone Arches */}
        <path
          d="M0,0 L480,0 L480,285 L442,285 L442,135 C442,58 332,58 332,135 L332,285 L302,285 L302,125 C302,42 178,42 178,125 L178,285 L148,285 L148,135 C148,58 38,58 38,135 L38,285 L0,285 Z"
          fill="url(#stoneArchGrad)"
          stroke="#7A6D5D"
          strokeWidth="1.5"
        />

        {/* Climbing Star Jasmine & Silver Olive Vines Twining Around Central Columns */}
        <g stroke="#4A5D4E" fill="#8FA696" strokeWidth="1.2">
          <path d="M155,265 C145,215 168,175 152,125 C140,85 170,55 205,45" fill="none" />
          <circle cx="156" cy="185" r="4" fill="#F7F4EE" />
          <circle cx="148" cy="145" r="3.5" fill="#F7F4EE" />
          <circle cx="166" cy="95" r="4" fill="#F7F4EE" />
          <path d="M318,265 C328,215 305,175 320,125 C330,85 302,55 270,45" fill="none" />
          <circle cx="315" cy="175" r="4" fill="#F7F4EE" />
          <circle cx="322" cy="135" r="3.5" fill="#F7F4EE" />
        </g>

        {/* Couple Silhouette in Center Arch (Lucia in Ivory Silk Gown & Enzo in Dark Suit) */}
        <g transform="translate(240, 212)">
          {/* Enzo */}
          <circle cx="-11" cy="-36" r="7.5" fill="#233242" />
          <path d="M-21,-26 C-21,-28 -3,-28 -3,-26 L-1,24 L-19,24 Z" fill="#1D2C3B" />
          <line x1="-15" y1="24" x2="-16" y2="68" stroke="#1D2C3B" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="-6" y1="24" x2="-5" y2="68" stroke="#1D2C3B" strokeWidth="5.5" strokeLinecap="round" />

          {/* Lucia */}
          <circle cx="11" cy="-31" r="7" fill="#2C3E50" />
          {/* Flowing Silk Veil & Gown */}
          <path
            d="M4,-22 L18,-22 L22,2 C32,28 42,56 52,70 L-6,70 C0,45 3,18 4,-22 Z"
            fill="#F7F3EB"
            stroke="#C9C0B2"
            strokeWidth="1"
          />
          <path
            d="M15,-30 C28,-22 44,-2 56,22"
            fill="none"
            stroke="#F7F3EB"
            strokeWidth="2.5"
            opacity="0.7"
          />
        </g>
      </svg>
    );
  }

  if (id === 'willows') {
    return (
      <svg
        viewBox="0 0 400 400"
        className={className}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Lucia and Enzo embracing under silver weeping willows by Lake Como at twilight"
      >
        <defs>
          <radialGradient id="moonlitSky" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#4F6B88" />
            <stop offset="55%" stopColor="#294057" />
            <stop offset="100%" stopColor="#162536" />
          </radialGradient>
          <linearGradient id="silverFoliage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6E0EA" />
            <stop offset="60%" stopColor="#8CA1B5" />
            <stop offset="100%" stopColor="#4E657B" />
          </linearGradient>
        </defs>

        {/* Twilight Sky & Moon */}
        <rect width="400" height="400" fill="url(#moonlitSky)" />
        <circle cx="295" cy="92" r="32" fill="#F4F7FA" opacity="0.22" />
        <circle cx="295" cy="92" r="16" fill="#F8FAFC" opacity="0.9" />

        {/* Distant Lake & Villa Lights */}
        <rect x="0" y="255" width="400" height="145" fill="#17283B" />
        <g fill="#F6E3BA" opacity="0.75">
          <circle cx="75" cy="252" r="2" />
          <circle cx="92" cy="253" r="1.5" />
          <circle cx="118" cy="251" r="2" />
          <circle cx="315" cy="252" r="2" />
          <circle cx="338" cy="253" r="1.8" />
        </g>

        {/* Moon Reflection on Lake */}
        <g stroke="#DCE6F2" strokeWidth="1.5" opacity="0.45">
          <line x1="278" y1="268" x2="312" y2="268" />
          <line x1="270" y1="278" x2="320" y2="278" />
          <line x1="282" y1="290" x2="308" y2="290" />
          <line x1="275" y1="304" x2="314" y2="304" />
        </g>

        {/* Cascading Silver Willow Fronds */}
        <g stroke="url(#silverFoliage)" fill="none" strokeWidth="1.6" opacity="0.78">
          {[18, 36, 54, 72, 95, 118, 140, 265, 290, 315, 340, 362, 382].map((x, idx) => (
            <path
              key={x}
              d={`M${x},-10 Q${x + (idx % 2 === 0 ? 14 : -14)},110 ${x + (idx % 2 === 0 ? 6 : -6)},235`}
              strokeDasharray="6 3"
            />
          ))}
        </g>

        {/* Botanical Garden Terrace Foreground */}
        <ellipse cx="200" cy="375" rx="220" ry="75" fill="#1E3145" stroke="#5E768E" strokeWidth="1" />

        {/* Embracing Couple Centerpiece */}
        <g transform="translate(200, 265)">
          {/* Soft Lantern Halo Behind Couple */}
          <circle cx="0" cy="-20" r="64" fill="#DCE8F5" opacity="0.15" />
          {/* Groom Silhouette */}
          <circle cx="-8" cy="-54" r="9.5" fill="#101C28" />
          <path d="M-24,-40 C-24,-44 4,-44 4,-40 L6,55 L-26,55 Z" fill="#101C28" />
          {/* Bride in Flowing Silver-White Gown */}
          <circle cx="10" cy="-48" r="9" fill="#1D2D3E" />
          <path
            d="M0,-35 L20,-35 C30,5 48,45 64,68 L-18,68 C-8,35 -2,0 0,-35 Z"
            fill="#F4F1EA"
          />
          {/* Draped tulle train */}
          <path d="M16,-35 C35,-10 58,28 78,65" stroke="#DCE5EE" strokeWidth="3" fill="none" opacity="0.8" />
        </g>
      </svg>
    );
  }

  // 'riva' artwork
  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Wooden Riva speedboat crossing Lake Como at sunset toward Grand Hotel Tremezzo"
    >
      <defs>
        <linearGradient id="rivaDuskSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A435E" />
          <stop offset="55%" stopColor="#6E8AA6" />
          <stop offset="100%" stopColor="#DFD5C8" />
        </linearGradient>
        <linearGradient id="rivaLake" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4B6784" />
          <stop offset="100%" stopColor="#1B2E42" />
        </linearGradient>
      </defs>

      <rect width="480" height="195" fill="url(#rivaDuskSky)" />
      {/* Mountains */}
      <path d="M0,195 L95,110 L195,162 L310,95 L425,158 L480,125 L480,195 Z" fill="#374F6B" opacity="0.85" />
      {/* Grand Hotel Tremezzo Distant Silhouette on Shore */}
      <rect x="165" y="162" width="110" height="33" fill="#E8DFD1" opacity="0.9" />
      <rect x="172" y="154" width="96" height="8" fill="#8C7A6B" />

      {/* Lake Surface */}
      <rect x="0" y="195" width="480" height="165" fill="url(#rivaLake)" />

      {/* White Foam Wake */}
      <path
        d="M235,265 L40,360 L440,360 Z"
        fill="#E6EEF6"
        opacity="0.28"
      />
      <path
        d="M235,265 Q165,315 85,360 M235,265 Q305,315 395,360"
        stroke="#F4F7FA"
        strokeWidth="2.5"
        fill="none"
        opacity="0.75"
      />

      {/* Classic Mahogany Riva Aquarama Boat */}
      <g transform="translate(235, 252)">
        {/* Hull */}
        <path
          d="M-65,0 L65,0 L48,24 L-48,24 Z"
          fill="#6E3B26"
          stroke="#D8DFE6"
          strokeWidth="1.5"
        />
        {/* Turquoise & Ivory Riva Cushions */}
        <rect x="-34" y="-8" width="68" height="8" rx="3" fill="#DFD9CE" />
        <rect x="-28" y="-12" width="56" height="5" rx="2" fill="#7FA5B8" />
        {/* Wrap-around Chrome Windshield */}
        <path d="M-38,0 L-24,-18 L24,-18 L38,0" fill="rgba(230,238,246,0.45)" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Couple Aboard + Flowing Silk Scarf */}
        <circle cx="-8" cy="-16" r="5.5" fill="#1E2D3D" />
        <circle cx="10" cy="-15" r="5" fill="#F7F4EE" />
        <path d="M14,-15 C28,-22 45,-18 58,-26" stroke="#FAF7F0" strokeWidth="2.2" fill="none" />
      </g>
    </svg>
  );
};
