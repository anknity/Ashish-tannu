export interface SongTrack {
  id: string;
  title: string;
  subtitle: string;
  tempoMs: number;
  notes: number[];
  bassNotes: number[];
}

export const WEDDING_TRACKS: SongTrack[] = [
  {
    id: 'mangal-dhun',
    title: 'Shubh Vivah Dhun',
    subtitle: 'Romantic Santoor & Piano • Raag Yaman',
    tempoMs: 520,
    notes: [
      261.63, 293.66, 329.63, 370.00, 392.00, 440.00, 493.88, 523.25,
      493.88, 440.00, 392.00, 370.00, 329.63, 293.66, 261.63, 329.63,
      392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00,
      329.63, 370.00, 392.00, 493.88, 523.25, 392.00, 329.63, 261.63,
    ],
    bassNotes: [
      130.81, 130.81, 130.81, 130.81, 196.00, 196.00, 196.00, 196.00,
      146.83, 146.83, 146.83, 146.83, 130.81, 130.81, 130.81, 130.81,
      130.81, 130.81, 164.81, 164.81, 196.00, 196.00, 146.83, 146.83,
      130.81, 130.81, 196.00, 196.00, 130.81, 130.81, 130.81, 130.81,
    ],
  },
  {
    id: 'kesariya-nocturne',
    title: 'Moonlight Serenade',
    subtitle: 'Nocturne in C Major • Conservatory Piano',
    tempoMs: 560,
    notes: [
      261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63,
      220.00, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63, 261.63,
      174.61, 261.63, 349.23, 440.00, 523.25, 440.00, 349.23, 261.63,
      196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66, 246.94,
    ],
    bassNotes: [
      130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81,
      110.00, 110.00, 110.00, 110.00, 110.00, 110.00, 110.00, 110.00,
      87.31,  87.31,  87.31,  87.31,  87.31,  87.31,  87.31,  87.31,
      98.00,  98.00,  98.00,  98.00,  98.00,  98.00,  98.00,  98.00,
    ],
  },
  {
    id: 'shahnai-waltz',
    title: 'Milan Waltz',
    subtitle: 'Waltz in F Major • Strings & Harp',
    tempoMs: 460,
    notes: [
      349.23, 440.00, 523.25, 698.46, 523.25, 440.00,
      293.66, 349.23, 440.00, 587.33, 440.00, 349.23,
      233.08, 293.66, 349.23, 466.16, 349.23, 293.66,
      261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
    ],
    bassNotes: [
      87.31,  174.61, 174.61, 87.31,  174.61, 174.61,
      146.83, 220.00, 220.00, 146.83, 220.00, 220.00,
      116.54, 174.61, 174.61, 116.54, 174.61, 174.61,
      130.81, 196.00, 196.00, 130.81, 196.00, 196.00,
    ],
  },
];

export interface PolaroidMemory {
  id: 'aisle-walk' | 'mandap-glow' | 'royal-navy';
  imageSrc: string;
  title: string;
  handwrittenCaption: string;
  location: string;
  date: string;
  story: string;
  exif: string;
}

export const POLAROID_MEMORIES: PolaroidMemory[] = [
  {
    id: 'aisle-walk',
    imageSrc: '/assets/aistudio/Generate_hero_section_image_52c9c525_2K_6cd27f92.jpg',
    title: 'Walking into Forever — आशीष & तन्नू',
    handwrittenCaption: 'Shubh Milan · 09 Dec ’26',
    location: 'Dariyapur Bazar (दरियापुर बाज़ार)',
    date: '09 December 2026',
    story:
      'Hand in hand along the floral aisle framed by rose arches and auspicious copper kalash, beginning our lifelong journey surrounded by family blessings.',
    exif: 'Portrait I · Ivory & Gold Zari Ensemble · Dariyapur Bazar',
  },
  {
    id: 'mandap-glow',
    imageSrc: '/assets/aistudio/Generate_hero_section_image_b833de66_2K_835376e8.jpg',
    title: 'Golden Hour by the Floral Mandap',
    handwrittenCaption: 'Golden Vows · Dec ’26',
    location: 'Royal Mandap Pavilion, Dariyapur Bazar',
    date: '09 December 2026',
    story:
      'A quiet moment of laughter and togetherness in front of the blush-draped mandap before the sacred Saat Phere under the winter sun.',
    exif: 'Portrait II · Golden Hour Mandap · Dariyapur Bazar',
  },
  {
    id: 'royal-navy',
    imageSrc: '/assets/aistudio/ashish_tannu_illustration__1_-Photoroom_dbb07264.png',
    title: 'Moonstone Navy & Silver Leaf Sangeet Look',
    handwrittenCaption: 'Royal Navy & Silver',
    location: 'Sangeet & Ring Ceremony Suite',
    date: '08 December 2026',
    story:
      'Coordinated in Royal Prussian Navy with intricate silver floral and bird zardozi embroidery—the inspiration behind our Moonstone Blue & Silver Leaf invitation suite.',
    exif: 'Portrait III · Prussian Blue & Silver Zardozi Collection',
  },
];

export interface DressSwatch {
  id: string;
  name: string;
  hindiName: string;
  hex: string;
  secondaryHex: string;
  fabricNote: string;
  attireSuggestion: string;
}

export const DRESS_CODE_SWATCHES: DressSwatch[] = [
  {
    id: 'prussian-velvet',
    name: 'Royal Prussian Navy',
    hindiName: 'शाही नेवी ब्लू (Sangeet & Reception)',
    hex: '#1B2D42',
    secondaryHex: '#28415E',
    fabricNote: 'Raw silk bandhgala, embroidered georgette, or velvet',
    attireSuggestion: 'Matches Ashish & Tannu’s signature navy and silver floral embroidered portrait.',
  },
  {
    id: 'ivory-gold',
    name: 'Ivory & Champagne Zari',
    hindiName: 'आइवरी और सुनहरा ज़री (Wedding Day)',
    hex: '#EAE2D3',
    secondaryHex: '#FAF7F0',
    fabricNote: 'Banarasi silk, organza, chikankari, or brocade sherwani',
    attireSuggestion: 'Inspired by our daytime floral mandap palette with blush lotus accents.',
  },
  {
    id: 'silver-leaf',
    name: 'Brushed Silver Zardozi',
    hindiName: 'चाँदी की कढ़ाई (Silver Gota & Zari)',
    hex: '#BAC6D2',
    secondaryHex: '#DCE5EE',
    fabricNote: 'Silver tissue, metallic organza, or sequin work',
    attireSuggestion: 'Shimmers beautifully under the nighttime conservatory and reception lights.',
  },
  {
    id: 'lotus-blush',
    name: 'Sacred Lotus Rose',
    hindiName: 'कमल गुलाबी (Blush Pink & Rose)',
    hex: '#D68A98',
    secondaryHex: '#F0BDC7',
    fabricNote: 'Chanderi silk, pastel net lehenga, or pink safa',
    attireSuggestion: 'Echoes the blooming pink lotus flowers framing our Save the Date arch.',
  },
  {
    id: 'emerald-jewel',
    name: 'Panna Emerald Accent',
    hindiName: 'पन्ना हरा (Royal Jewel Accent)',
    hex: '#1E5245',
    secondaryHex: '#2F7362',
    fabricNote: 'Kundan-emerald jewelry, silk sarees, or pocket squares',
    attireSuggestion: 'Inspired by the Groom’s multi-strand emerald mala from our wedding portraits.',
  },
];

export interface WeekendDay {
  id: 'haldi-sangeet' | 'vivah' | 'reception';
  dayLabel: string;
  dateLabel: string;
  hindiDateLabel: string;
  title: string;
  subtitle: string;
  attire: string;
  events: {
    time: string;
    name: string;
    hindiName: string;
    venue: string;
    description: string;
    mapQuery: string;
  }[];
}

export const WEEKEND_ITINERARY: WeekendDay[] = [
  {
    id: 'haldi-sangeet',
    dayLabel: 'Tuesday',
    dateLabel: '08 Dec 2026',
    hindiDateLabel: '08 दिसंबर 2026 • मंगलवार',
    title: 'मंगल हल्दी एवं संगीत संध्या',
    subtitle: 'Auspicious Haldi, Mehendi & Royal Navy Sangeet Night',
    attire: 'Marigold Yellow for Haldi • Royal Navy & Silver for Sangeet',
    events: [
      {
        time: '11:00 AM',
        name: 'Shubh Haldi & Mehendi Utsav',
        hindiName: 'शुभ हल्दी एवं मेहंदी उत्सव',
        venue: 'Courtyard Pavilion • Dariyapur Bazar',
        description:
          'A joyous morning of marigold petals, traditional folk songs (Geet), dhol beats, and organic turmeric blessings for Ashish & Tannu.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
      {
        time: '7:00 PM',
        name: 'Ring Ceremony & Sangeet Gala',
        hindiName: 'रिंग सेरेमनी एवं संगीत संध्या',
        venue: 'Grand Illuminated Lawn • Dariyapur Bazar',
        description:
          'An enchanting moonlit evening in Prussian Blue and Silver Leaf featuring family dance performances, ring exchange, and celebratory dinner.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
    ],
  },
  {
    id: 'vivah',
    dayLabel: 'Wednesday',
    dateLabel: '09 Dec 2026',
    hindiDateLabel: '09 दिसंबर 2026 • बुधवार (मुख्य विवाह)',
    title: 'शुभ विवाह महोत्सव — आशीष & तन्नू',
    subtitle: 'Baraat Swagat, Jaimala & Sacred Saat Phere',
    attire: 'Traditional Royal Indian — Lehengas, Silk Sarees, Sherwanis & Bandhgalas',
    events: [
      {
        time: '5:00 PM',
        name: 'Shahi Baraat & Dwarpuja',
        hindiName: 'शाही बारात प्रस्थान एवं द्वारपूजा',
        venue: 'Main Wedding Gate • दरियापुर बाज़ार (Dariyapur Bazar)',
        description:
          'Grand arrival of the Baraat with vintage lighting, brass band, and traditional Vedic tilak welcome by the bride’s family.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
      {
        time: '7:30 PM',
        name: 'Shubh Jaimala &preetibhoj (Dinner)',
        hindiName: 'शुभ जयमाला एवं प्रीतिभोज',
        venue: 'Lotus Mandap Stage • दरियापुर बाज़ार',
        description:
          'Exchange of floral garlands under a shower of rose petals and lotus blooms, followed by a lavish multi-cuisine royal banquet.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
      {
        time: '11:15 PM',
        name: 'Shubh Vivah & Saat Phere',
        hindiName: 'शुभ विवाह संस्कार एवं सात फेरे',
        venue: 'Sacred Vedic Mandap • दरियापुर बाज़ार',
        description:
          'Sacred wedding vows around the holy fire amidst Vedic mantras, Kanyadaan, and Sindoor Daan blessings.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
    ],
  },
  {
    id: 'reception',
    dayLabel: 'Thursday',
    dateLabel: '10 Dec 2026',
    hindiDateLabel: '10 दिसंबर 2026 • गुरुवार',
    title: 'आशीर्वाद समारोह एवं रिसेप्शन',
    subtitle: 'Newlywed Welcome & Grand Reception',
    attire: 'Formal Ethnic & Evening Glamour',
    events: [
      {
        time: '7:00 PM Onwards',
        name: 'Dawat-e-Walima / Reception Gala',
        hindiName: 'वर-वधू आशीर्वाद एवं रिसेप्शन भोज',
        venue: 'Celebration Banquet • Dariyapur Bazar',
        description:
          'Join us to bless the newlyweds Ashish & Tannu over live instrumental music, portraits, and a grand celebratory feast.',
        mapQuery: 'Dariyapur+Bazar+Bihar+India',
      },
    ],
  },
];

export interface TravelLogisticsItem {
  name: string;
  tier: string;
  distance: string;
  codeOrContact: string;
  description: string;
  url: string;
}

export const VENUE_CONCIERGE: TravelLogisticsItem[] = [
  {
    name: 'Main Wedding Pavilion — दरियापुर बाज़ार',
    tier: 'Primary Wedding Venue • 09 December 2026',
    distance: 'Heart of Dariyapur Bazar',
    codeOrContact: 'ASHISH-TANNU-2026',
    description:
      'Decorated with white floral colonnades, lotus arches, and Moonstone Blue & Silver canopies for the Baraat, Jaimala, and Saat Phere.',
    url: 'https://www.google.com/maps/search/?api=1&query=Dariyapur+Bazar',
  },
  {
    name: 'Family Guest House & Royal Suites',
    tier: 'Outstation Guest Hospitality',
    distance: '5 Minutes from Wedding Venue',
    codeOrContact: 'WELCOME-AT26',
    description:
      'Dedicated rooms and hospitality desk reserved for outstation relatives and friends arriving on 8th and 9th December 2026.',
    url: 'https://www.google.com/maps/search/?api=1&query=Dariyapur+Bazar',
  },
  {
    name: 'Rail & Airport Pick-Up Desk',
    tier: '24×7 Wedding Transport Assistance',
    distance: 'Chhapra / Sonpur / Patna Junction & Airport',
    codeOrContact: 'CAR-DESK-09DEC',
    description:
      'Complimentary family vehicles available from nearby railway stations and Jay Prakash Narayan Airport (Patna). Mention your arrival time in the RSVP form.',
    url: 'https://www.google.com/maps/search/?api=1&query=Dariyapur+Bazar',
  },
];
