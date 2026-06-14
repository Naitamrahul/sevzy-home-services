import { useState } from 'react';
import { 
  CheckCircle, ShieldCheck, Award, ThumbsUp, Sparkles, 
  ChevronRight, CalendarRange, ArrowRight, Star, Heart, 
  MessageSquare, UserCheck, Shield, HelpCircle
} from 'lucide-react';
import { Maid } from '../types';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export type SnabbitServiceId = 'dishwashing' | 'kitchen' | 'fan' | 'window' | 'laundry' | 'bathroom';

interface ServiceData {
  id: SnabbitServiceId;
  name: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  approxPrice: string;
  perHourRate: number;
  whatsIncluded: string[];
  whyChooseUs: string[];
  badges: { text: string; icon: any }[];
  stepsToBook: string[];
}

export const SNABBIT_SERVICES: Record<SnabbitServiceId, ServiceData> = {
  dishwashing: {
    id: 'dishwashing',
    name: 'Dishwashing',
    category: 'House Help',
    title: 'Dishwashing Service India',
    tagline: 'Daily dishwashing help for all your utensils, cookware and stacked.',
    description: 'Get a perfect hygienic sparkle on your costly glassware, non-stick cookware, baking trays, and daily plates. Our expert dishwashers use gentle organic gels and food-safe antibacterial degreasers to remove stubborn grease, leaving zero stains or chemical odor.',
    image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹199',
    perHourRate: 199,
    whatsIncluded: [
      'Removal of stubborn grease, oil and burnt marks from metallic pans & cookware',
      'Hygienic dish washing using food-safe antibacterial organic dishwasher gels',
      'Gentle clean for delicate crystal glassware and fine-dining ceramic items',
      'Rinsing, dry-wipe, and neat system stacking inside kitchen racks/shelves',
      'Deep scrub sanitization of the kitchen washing sink and surrounding counter slabs'
    ],
    whyChooseUs: [
      'No breakage guarantee: fully insured against accidental glass damages',
      'Dedicated single-task focus ensures hygienic scrub of tricky food corners',
      'Double-rinsed protocol: absolutely safe for baby milk bottles and utensils'
    ],
    badges: [
      { text: 'Top Rated Experts', icon: Star },
      { text: 'Thorough Background Check', icon: ShieldCheck },
      { text: '2-Day Professional Training', icon: Award }
    ],
    stepsToBook: [
      'Enter kitchen configuration in the calculator',
      'Select Dishwashing under custom booking options',
      'Pick date, time and a certified partner gets dispatched!'
    ]
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen Cleaning',
    category: 'House Help',
    title: 'Intense Kitchen Deep-Cleaning',
    tagline: 'Remove stubborn oil grease, exhaust films, and restore glowing slabs.',
    description: 'Banish the yellow sticky grease layer off chimney filters, exhaust fans, tiled walls behind stove hobs, and stained shelves. We bring professional high-penetration degreasing solutions to restore your kitchen to an absolute pristine, chef-grade culinary environment.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹799',
    perHourRate: 799,
    whatsIncluded: [
      'Thorough grease removal and carbon stripping from gas stoves & hobs',
      'In-and-out wiping of all storage modular cabinets and drawers (if unemptied, only exterior is polished)',
      'Intensified floor scrub and restoration of white marble/tiled grout lines',
      'Streak-free stain polishing of sink taps, stainless steel fittings, and backsplash',
      'Outside detailing of refrigerator, microwave, and electric water purifiers'
    ],
    whyChooseUs: [
      'Intense soot dissolving formula works 5x faster than ordinary home scrub',
      'Trained for modular acrylic surfaces, ensuring zero scratches or fading',
      '100% food-grade sanitization: perfectly safe for food-prep zones'
    ],
    badges: [
      { text: 'Ultimate Grease Stripping', icon: Sparkles },
      { text: 'certified Food-Safe Agents', icon: ShieldCheck },
      { text: 'Premium Wall Polish', icon: Award }
    ],
    stepsToBook: [
      'Toggle inside cabinets/stoves inside Add-ons tab',
      'Set "Deep Clean" focus under Step 2 for high intensity',
      'Schedule instantly for maximum sparkle!'
    ]
  },
  fan: {
    id: 'fan',
    name: 'Fan Cleaning',
    category: 'House Help',
    title: 'Ceiling Fan & Light Dusting',
    tagline: 'Zero-dust debris ceiling fan cleaning for healthy, allergen-free flow.',
    description: 'Black dust webs on high fan blades scatter allergens and pollen around your children\'s bedrooms every time the motor starts. Our well-equipped cleaning experts utilize safety certified step-ladders and anti-static microfiber mitts that trapping dust instantly so that nothing falls onto your carpets.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹99',
    perHourRate: 99,
    whatsIncluded: [
      'Dry dust-sweep followed by high-glide wet wiping of ceiling fan blades on both sides',
      'Extraction of greasy dust layers inside exhaust fans, fan guards, and wall vents',
      'Soft microfiber wiping of lighting fixtures, fancy lanterns, LED holders, and tubes',
      'Application of dust-resistant static barrier layer on fan blades to prolong shine',
      'Floor vacuuming around the room to guarantee zero remaining debris'
    ],
    whyChooseUs: [
      'Ladder safety certified professionals with proper grip equipment',
      'Double wipe guarantee: fans look factory-new, avoiding unsightly black borders',
      'Fast 15-minute per-room execution'
    ],
    badges: [
      { text: 'allergen-Free Trapping', icon: CheckCircle },
      { text: 'certified Ladder Safety', icon: ShieldCheck },
      { text: 'Anti-Static Barrier Shield', icon: Award }
    ],
    stepsToBook: [
      'Add Ceiling Fan detail in service requirements',
      'Our dispatch system routes the closest certified provider',
      'Watch your room breathe fresh, pure breeze!'
    ]
  },
  window: {
    id: 'window',
    name: 'Window Cleaning',
    category: 'House Help',
    title: 'Crystal Clear Window Glass Washing',
    tagline: 'Get views of the city once again with streak-free frame scrubbing.',
    description: 'City exhaust pollution, rain drops residue, and finger marks leave windows foggy and dull. We professionally vacuum window sliding tracks, scrub frame channels, wash double-sided clear glass pane, and sanitise dust catcher meshes for ultimate sunlight transparency.',
    image: 'https://images.unsplash.com/photo-1603712726208-4d69304bf593?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹249',
    perHourRate: 249,
    whatsIncluded: [
      'Streak-free glass cleaning using commercial grade premium floor squeegees',
      'Deep suction vacuuming of sliding tracks to remove fine soil and dead insect debris',
      'Wiping and sanitization of metal safety grills, balcony railings, and handles',
      'Gentle pressure dusting/washing of sliding mosquito net meshes and screen frames'
    ],
    whyChooseUs: [
      'No soap-scum left behind: pristine sunlight pass-through guaranteed',
      'Equipped with long-reach wand tools for difficult exterior apartments corners',
      'Enhances the ambient brightness of your living spaces by 40%'
    ],
    badges: [
      { text: 'Streak-Free Glass Polish', icon: Sparkles },
      { text: 'Track Suction Cleared', icon: ShieldCheck },
      { text: 'High-Reach Grasp tools', icon: Award }
    ],
    stepsToBook: [
      'Toggle inside Interior Windows from the pricing checklist',
      'Book instantly with our responsive automated schedule',
      'Open your curtains to amazing views!'
    ]
  },
  laundry: {
    id: 'laundry',
    name: 'Laundry Help',
    category: 'House Help',
    title: 'Wash, Dry & Fold Laundry Service',
    tagline: 'Therapeutic garment washing, fresh softening, and perfect hotel-grade fold.',
    description: 'Get your piles of premium clothing, bedsheets, and towels handled inside your home with absolute color-safety. Our laundry experts divide colored and white garments precisely, add custom allergen-free fragrant softeners, and deliver hotel-style wardrobe racks ready for use.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebd01?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹299',
    perHourRate: 299,
    whatsIncluded: [
      'Precision separation of garments based on color, delicate woolens, and heavy denim',
      'Hygienic machine wash with customer\'s or our eco-friendly fabric detergents',
      'Indoor or tumble line-drying to prevent shrinkage and retain thread strength',
      'Crisp, symmetrical geometric folding of shirts, towels, and activewear',
      'Aromatic drawer alignment and wardrobe organizing'
    ],
    whyChooseUs: [
      'Strict color isolation protocols, ensuring zero dye blending accidents',
      'Hygienic single-family wash: your clothes never mix with strangers\' items',
      'Extremely convenient: done alongside your other custom home sweeps'
    ],
    badges: [
      { text: 'Zero Dye Blending accidents', icon: ShieldCheck },
      { text: 'Hotel-Style Fold precision', icon: Award },
      { text: 'Premium Softener Bloom', icon: Sparkles }
    ],
    stepsToBook: [
      'Select Wash & Fold laundry in step 3 check',
      'Set special instructions in active checkout fields if needed',
      'Return home to clean, blooming wardrobes!'
    ]
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom Cleaning',
    category: 'House Help',
    title: 'Deep Sanitizing & Descaling',
    tagline: 'Erase white lime-scale off glass walls and restore 99.9% germ-free sparkle.',
    description: 'Restore your bath and shower rooms to five-star resort hygiene. Our high-grade safe descaling treatment targets unsightly borewell white water scale from glass doors, metal shower fixtures, white washstands, and tiles, complete with organic germ isolation sprays.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600&h=450',
    approxPrice: 'Starting from ₹349',
    perHourRate: 349,
    whatsIncluded: [
      'Removal of stubborn hard-water stains and lime film off shower glass doors',
      'Chemical scrub sanitizing inside toilet commodes to extract deep urine stains',
      'Washing and tiles grout brightening using hygienic germicides',
      'Streak-free polished gloss on mirror panels, vanity basins, wash bowls, and traps',
      'Deep cleaning of drain channels, exhaust fan mesh, and towel grids'
    ],
    whyChooseUs: [
      'Acid-free formulation guarantees tiles and marble glaze stays polished and shiny',
      'Kills 99.9% of bacteria, mold spores, and odor germs',
      'Freshens columns with a beautiful lavender-mint essential aroma'
    ],
    badges: [
      { text: 'Acid-Free safe Descaling', icon: ShieldCheck },
      { text: 'Erase Hard soap Scum', icon: Sparkles },
      { text: '99.9% Germ sanitization', icon: Award }
    ],
    stepsToBook: [
      'State exact bathroom quantity on the main pricing sliders',
      'Enjoy absolute resort-like purity directly at home!'
    ]
  }
};

interface ServicePageProps {
  initialServiceId?: SnabbitServiceId;
  maids: Maid[];
  onOpenBooking: (prefillInfo?: { serviceType: string; note: string }) => void;
  onNavigate: (section: 'home' | 'services') => void;
}

export default function ServicePage({ 
  initialServiceId = 'dishwashing', 
  maids, 
  onOpenBooking,
  onNavigate
}: ServicePageProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<SnabbitServiceId>(initialServiceId);
  const currentService = SNABBIT_SERVICES[selectedServiceId];

  // Specific experts that match this service profile
  const filteredExperts = maids.filter(m => {
    if (selectedServiceId === 'dishwashing') return m.name !== 'Marcus Vance'; // elena & clara
    if (selectedServiceId === 'kitchen') return m.specialty.toLowerCase().includes('deep') || m.name === 'Elena Rostova';
    if (selectedServiceId === 'bathroom') return m.rating >= 4.93;
    return true; // default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn" id="snabbit-service-viewport">
      
      {/* Snabbit Service Page Layout: Two Columns containing Sidebar categories + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Services Sidebar list - Matches Snabbit dropdown categories */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4 lg:sticky lg:top-24" id="snabbit-services-sidebar">
          <div className="border-b border-gray-50 pb-3 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-violet block">SERVICES CATEGORIES</span>
            <h4 className="font-display font-black text-gray-900 text-sm mt-0.5">Professional House Help</h4>
          </div>
          <div className="space-y-1.5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 lg:gap-0" id="sidebar-services-toggles">
            {Object.values(SNABBIT_SERVICES).map((service) => {
              const isActive = selectedServiceId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-between gap-2.5 border shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-brand-violet-light border-brand-violet/20 text-brand-violet font-extrabold shadow-sm' 
                      : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-violet animate-ping' : 'bg-transparent'}`} />
                    <span>{service.name} Cleaning</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-brand-violet' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-tr from-brand-violet/5 to-brand-pink/5 border border-brand-violet/10 p-4 rounded-2xl hidden lg:block" id="sidebar-trust-box">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-brand-violet" />
              <span className="font-bold text-xs text-brand-violet-dark">Hassle-Free Care</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
              Every dispatched housekeeper is fully insured, medically checked, and validated with high safety clearances.
            </p>
          </div>
        </div>


        {/* Right Side: Main Detail Page */}
        <div className="lg:col-span-9 space-y-8" id="snabbit-main-content">
          
          {/* Breadcrumbs path */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400" id="snabbit-breadcrumbs">
            <span className="hover:text-brand-violet cursor-pointer" onClick={() => onNavigate('home')}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>{currentService.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-bold">{currentService.name}</span>
          </div>

          {/* Service Landing Hero - styled exactly like the provided snabbit screenshot */}
          <div className="bg-gradient-to-tr from-gray-50 via-pink-50/20 to-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden" id="service-splash-billboard">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Text Left Column */}
              <div className="md:col-span-7 space-y-5">
                <h1 className="font-display text-3xl sm:text-4.5xl font-black text-gray-900 leading-none tracking-tight">
                  {currentService.title}
                </h1>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                  {currentService.tagline}
                </p>

                {/* Snabbit specialized checklist badges */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-2" id="snabbit-split-badges">
                  {currentService.badges.map((badge, bIdx) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <div 
                        key={bIdx} 
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-violet/10 to-brand-pink/5 px-3 py-2 border border-brand-violet/10 rounded-xl text-xs font-bold text-brand-violet-dark shadow-sm"
                      >
                        <BadgeIcon className="w-4 h-4 text-brand-violet shrink-0" />
                        <span>{badge.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <button
                    onClick={() => onOpenBooking({ 
                      serviceType: selectedServiceId === 'dishwashing' ? 'standard' : selectedServiceId === 'kitchen' ? 'deep' : 'standard', 
                      note: `Please focus specifically on deep ${currentService.name} services.` 
                    })}
                    className="px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm sm:text-base text-center shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Book {currentService.name} via WhatsApp</span>
                  </button>

                  <div className="px-4 py-3 sm:py-0 border-l-0 sm:border-l border-gray-200 text-center sm:text-left">
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Fee</span>
                    <span className="font-display font-black text-gray-900 text-base sm:text-lg">{currentService.approxPrice}</span>
                  </div>
                </div>

              </div>

              {/* Styled Unsplash illustration Right Column */}
              <div className="md:col-span-5 relative" id="service-illustration-wrapper">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet-light/40 to-brand-pink-light/40 rounded-3xl transform rotate-2 scale-102" />
                <img 
                  src={currentService.image} 
                  alt={currentService.name} 
                  className="w-full h-56 sm:h-64 object-cover rounded-3xl shadow-md border-4 border-white relative z-10 hover:scale-101 transition-transform duration-300" 
                />
              </div>

            </div>
          </div>


          {/* Detailed list section: "What's Included in our services?" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="service-whats-included-panel">
            
            {/* Box 1: Pristine Checklist */}
            <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2.5 bg-green-50 rounded-lg text-green-600 font-extrabold text-xs">✔</div>
                  <h3 className="font-display font-black text-gray-900 text-base sm:text-lg">What's Included in this Routine</h3>
                </div>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  We guarantee consistent high-caliber scrubbing. Here are the specific check points handled by your assigned partner during this clean package:
                </p>

                <ul className="space-y-3 pt-1">
                  {currentService.whatsIncluded.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-gray-700 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5 fill-green-50" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 text-center">
                <span className="text-[11px] font-bold text-gray-400">All materials, scrub gels, and microfiber squeegees included instantly.</span>
              </div>
            </div>

            {/* Box 2: Why choose Sevzy over locals? */}
            <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-brand-violet-light rounded-2xl text-brand-violet shrink-0">
                    <Award className="w-5 h-5 text-brand-violet" />
                  </div>
                  <h3 className="font-display font-black text-gray-900 text-base sm:text-lg">The Quality Standards Difference</h3>
                </div>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  Avoid the unreliability of standard domestic sweeps. Feel absolute professional comfort:
                </p>

                <ul className="space-y-4 pt-1">
                  {currentService.whyChooseUs.map((point, idx) => (
                    <li key={idx} className="flex gap-3" id={`why-us-point-${idx}`}>
                      <div className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center shrink-0 font-extrabold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 text-xs leading-tight">{point.split(':')[0]}</span>
                        <span className="block text-gray-400 text-[10px] sm:text-xs font-medium mt-0.5 leading-relaxed">{point.split(':')[1] || 'Trained specialists executing with double-sanitized protocols.'}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-violet-50/50 p-3.5 border border-brand-violet/10 rounded-2xl text-[10px] sm:text-xs text-brand-violet-dark font-semibold leading-relaxed flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-violet shrink-0" />
                <span>₹2,000,000 Commercial Liability Protection activates automatically with every booking!</span>
              </div>
            </div>

          </div>


          {/* YOUR EXPERT spotlight section - matches Snabbit website section */}
          <div className="space-y-5" id="snabbit-expert-spotlight">
            <div className="text-center space-y-1">
              <span className="text-[11px] uppercase tracking-widest font-black text-brand-pink block">YOUR EXPERT HIGHLIGHT</span>
              <h3 className="font-display text-2xl font-black text-gray-900">
                One {currentService.name} Expert, To Do It All
              </h3>
              <p className="text-gray-400 text-xs max-w-lg mx-auto leading-relaxed">
                Meet our top tier house cleaning specialists who consistently secure exceptional 5-star ratings for the {currentService.name} procedure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="spotlight-experts-subgrid">
              {filteredExperts.map((expert) => (
                <div key={expert.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id={`spotlight-expert-card-${expert.id}`}>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={expert.avatar} 
                        alt={expert.name} 
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-violet-light shrink-0" 
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-extrabold text-sm sm:text-base text-gray-900">{expert.name}</h4>
                          <span className="text-[9px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 font-extrabold">ONLINE</span>
                        </div>
                        <span className="block text-[10px] font-black tracking-wide text-brand-violet uppercase mt-0.5">
                          {expert.specialty}
                        </span>
                        
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span className="text-xs font-black text-gray-700">{expert.rating}</span>
                          <span className="text-[10px] text-gray-400">({expert.reviewsCount} jobs)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-paragraph leading-relaxed text-gray-500 italic bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      "{expert.bio}"
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <UserCheck className="w-4 h-4 text-brand-violet" />
                      <span>Certified verified Host</span>
                    </div>

                    <button 
                      onClick={() => onOpenBooking({ 
                        serviceType: selectedServiceId === 'dishwashing' ? 'standard' : selectedServiceId === 'kitchen' ? 'deep' : 'standard', 
                        note: `I would love to have ${expert.name} assigned for my general home assistance.` 
                      })}
                      className="text-xs font-black text-brand-pink hover:text-brand-pink-dark flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Request expert</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Step by step booking pipeline */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden" id="service-booking-banner">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-12 translate-x-12">
              <Sparkles className="w-64 h-64 text-white" />
            </div>
            
            <div className="max-w-xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                🚀 Seamless 60 Seconds dispatch
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                Ready to delegate {currentService.name.toLowerCase()} chores today?
              </h3>
              
              <p className="text-pink-100 text-xs sm:text-sm leading-relaxed opacity-90">
                No subscription contract required. Adjust parameters via our easy visual sliders and have verified assistant help sweep and polish.
              </p>

              <div className="flex gap-3 justify-center items-center">
                <button
                  onClick={() => onOpenBooking({ 
                    serviceType: selectedServiceId === 'dishwashing' ? 'standard' : selectedServiceId === 'kitchen' ? 'deep' : 'standard', 
                    note: `Please focus specifically on deep ${currentService.name} services.` 
                  })}
                  className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Configure Price Quote</span>
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="px-5 py-3.5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs"
                >
                  Learn more FAQ
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
