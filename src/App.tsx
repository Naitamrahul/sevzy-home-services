import { useState } from 'react';
import { 
  Sparkles, CalendarRange, Star, ArrowRight, Heart, Shield, CheckCircle, 
  MapPin, ShieldAlert, BadgeInfo, Layers3, Smile, Check, Plus, Minus
} from 'lucide-react';
import { BookingDetails, Maid } from './types';
import { TOP_MAIDS, CUSTOMER_TESTIMONIALS } from './data/mockData';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Subcomponents
import Navbar from './components/Navbar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import QuickBookingModal from './components/QuickBookingModal';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ServicePage, { SnabbitServiceId } from './components/ServicePage';
import AboutPage from './components/AboutPage';

// Prepopulate past and active schedules for high-fidelity admin statistics out of the box
const INITIAL_BOOKINGS: BookingDetails[] = [
  {
    id: 'SEV-481920',
    clientName: 'Shyam Pawar',
    email: '',
    phone: '',
    address: '24 , Khapri , Near Mihar SEZ, Nagpur',
    notes: 'Please double-sanitize door handles and remote controllers.',
    bedrooms: 2,
    bathrooms: 1,
    serviceType: 'standard',
    frequency: 'weekly',
    addons: ['eco'],
    date: 'Last Wednesday',
    timeSlot: '08:00 AM',
    basePrice: 110,
    addonPrice: 15,
    discount: 25,
    fee: 5,
    finalPrice: 105,
    status: 'completed',
    assignedMaidId: 'maid-1',
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'SEV-901827',
    clientName: 'Akshara Patel',
    email: '',
    phone: '',
    address: '112 , Chichbhawan, Nagpur',
    notes: 'Elena did an incredible job last time. Please assign her again!',
    bedrooms: 2,
    bathrooms: 2,
    serviceType: 'standard',
    frequency: 'one-time',
    addons: [],
    date: 'Yesterday',
    timeSlot: '12:00 PM',
    basePrice: 130,
    addonPrice: 0,
    discount: 0,
    fee: 6,
    finalPrice: 136,
    status: 'completed',
    assignedMaidId: 'maid-1',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'SEV-331093',
    clientName: 'Someshwar Shende',
    email: '',
    phone: '',
    address: '400, New Manishnagar, Nagpur',
    notes: 'First time using Sevzy. Looking forward to standard clean + inside fridge!',
    bedrooms: 1,
    bathrooms: 1,
    serviceType: 'deep',
    frequency: 'monthly',
    addons: ['fridge'],
    date: 'Tomorrow',
    timeSlot: '09:00 AM',
    basePrice: 140,
    addonPrice: 35,
    discount: 17,
    fee: 8,
    finalPrice: 166,
    status: 'confirmed',
    assignedMaidId: 'maid-2',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'about' | 'faq'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<SnabbitServiceId>('dishwashing');
  
  // Real-time systems state pools
  const [allMaids, setAllMaids] = useState<Maid[]>(TOP_MAIDS);

  // Modal State Trigger
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefillService, setBookingPrefillService] = useState<string>('standard');

  // Hero direct quote bedroom preset
  const [heroBedrooms, setHeroBedrooms] = useState<number>(2);

  // Dynamic Service Focus tab inside index page
  const [activeCatalogTab, setActiveCatalogTab] = useState<'standard' | 'deep' | 'movein' | 'airbnb'>('standard');

  const handleOpenBooking = (serviceId?: string) => {
    setBookingPrefillService(serviceId || 'standard');
    setIsBookingModalOpen(true);
  };

  const handleNavigate = (section: 'home' | 'services' | 'about' | 'faq') => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch pre-calculated booking from hero
  const handleHeroQuoteTrigger = () => {
    handleOpenBooking('standard');
  };

  // Custom Quick Book for specific Maid
  const handleQuickBookMaid = (maidId: string) => {
    const assignedMaid = allMaids.find(m => m.id === maidId);
    const specialtyMapping: Record<string, string> = {
      'Dishes & Kitchen': 'dishwashing',
      'Bathrooms & Tiles': 'bathroom',
      'Laundry & Bedding': 'laundry'
    };
    const prefill = assignedMaid ? (specialtyMapping[assignedMaid.specialty] || 'standard') : 'standard';
    handleOpenBooking(prefill);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans flex flex-col justify-between overflow-x-hidden relative" id="sevzy-applet-root">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-brand-violet-light/40 filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[120vh] left-0 w-[30vw] h-[30vw] rounded-full bg-brand-pink/5 filter blur-3xl pointer-events-none -z-10" />

      {/* Navbar header */}
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        onSelectService={(serviceId) => setSelectedServiceId(serviceId)} 
        onOpenBooking={() => handleOpenBooking('standard')}
      />

      {/* Main Body */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME MARKETING PAGE */}
        {activeSection === 'home' && (
          <div className="space-y-16 pb-20 animate-fadeIn" id="home-view-wrapper">
            
            {/* HERO SECTION - MAID IMAGE ON THE HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12" id="hero-marketing-panel">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Words & Fast Bedroom preset */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-violet/10 to-brand-pink/10 rounded-full border border-brand-violet/10 text-brand-violet-dark text-xs font-black tracking-wider uppercase">
                    <Sparkles className="w-4 h-4 text-brand-pink animate-pulse" />
                    <span>#1 Premium Home Sanitizers</span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    Your Home,<br />
                    <span className="bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent">
                      Perfect & Spotless
                    </span>
                  </h1>

                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Forget generic marketplace cleaners. Sevzy dispatches certified, background-checked elite household specialists. Price, schedule, and track your booking in under 20 seconds.
                  </p>

                  {/* Immediate Bedroom Selector Calculator trigger - Cloned from pronto */}
                  

                  {/* Tiny Trust icons strip */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-gray-500 pt-2" id="hero-trust-bullets">
                    <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-brand-violet" /> Background-checked</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-brand-pink" /> 100% Satisfaction Bliss</span>
                  </div>
                </div>

                {/* Hero Maid Image Visual Container (Dynamic, High contrast) */}
                <div className="lg:col-span-6 relative pr-4" id="hero-media-wrapper">
                  
                  {/* Visual Background Elements */}
                  <div className="absolute inset-x-0 bottom-0 top-12 bg-gradient-to-tr from-brand-violet/10 via-brand-pink/10 to-brand-violet-light/5 rounded-[40px] transform rotate-1 -z-10" />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] border border-white/40 rounded-[40px] transform -rotate-1 -z-10 shadow-2xl" />

                  {/* Maid Image as requested: Custom generated asset */}
                  <div className="relative rounded-[36.5px] overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src="/src/assets/images/hero_img.png" 
                      alt="Smiling professional house cleaning lady wearing Sevzy uniform" 
                      className="w-full h-auto object-cover hover:scale-101 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating live badge overlays */}
                    <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-pink-50" id="hero-floating-card-1">
                      <div className="bg-brand-pink/10 text-brand-pink p-2.5 rounded-xl">
                        <Smile className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="block text-xs font-black text-gray-900 leading-tight">100% Happy customers</span>
                        <span className="block text-[10px] text-gray-400 font-bold mt-0.5">Or free repeat cleaning</span>
                      </div>
                    </div>

                    <div className="absolute top-5 right-5 bg-brand-violet text-white px-3.5 py-1.5 rounded-full shadow-lg font-black text-[10px] uppercase tracking-wider flex items-center gap-1" id="hero-floating-card-2">
                      <Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300 animate-spin-slow" />
                      <span>Top Rated (4.95★ Avg)</span>
                    </div>
                  </div>

                  {/* Small decorative details */}
                  <div className="absolute -bottom-4 right-4 bg-white border border-gray-100 rounded-2xl px-3 py-1.5 shadow-md flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-brand-violet" />
                    <span>Serving Nagpur All region</span>
                  </div>
                </div>

              </div>
            </section>

            {/* QUICK STEPS INSTRUCTION */}
            <section className="bg-white py-14 border-y border-gray-100" id="how-it-works-module">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <span className="text-xs font-black tracking-widest text-brand-pink uppercase">Convenient Flow</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                    Book Cleanings in 3 Easy Steps
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { num: '1', title: 'Pick Size & Toggles', desc: 'Input your exact bedrooms count, bathrooms count, same-day scheduling slot, and organic eco add-ons.' },
                    { num: '2', title: 'Lock In Pricing', desc: 'Preview your exact quote with no surprise fees or tips required. Choose a time slot that matches your diary.' },
                    { num: '3', title: 'Relax & Sparkle', desc: 'Sit back and enjoy your sanitized paradise. Track your assigned cleaner live as they scrub items pristine.' }
                  ].map((step) => (
                    <div key={step.num} className="relative text-center sm:text-left bg-gray-50/50 hover:bg-gray-50 border border-gray-50 hover:border-gray-100 p-6 rounded-2xl transition-all" id={`step-card-${step.num}`}>
                      <div className="w-10 h-10 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm mb-4 mx-auto sm:mx-0">
                        {step.num}
                      </div>
                      <h4 className="font-display font-extrabold text-gray-900 text-lg mb-2">{step.title}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SERVICES CHECKS CATALOG */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-checklist-catalog">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-black text-brand-pink uppercase tracking-widest">Our Specialties</span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mt-1">What's included in Sevzy cleans?</h3>
              </div>

              {/* Tabs list customizer */}
              <div className="flex justify-center flex-wrap gap-2 mb-8" id="catalog-tags">
                {[
                  { id: 'standard', label: 'Standard Maintenance Clean' },
                  { id: 'deep', label: 'Deep Intensive Scrub' },
                  { id: 'movein', label: 'Move In / Out Sparkle' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCatalogTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                      activeCatalogTab === tab.id
                        ? 'bg-brand-violet border-brand-violet text-white shadow-md'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic checklist display */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl" id="checklist-showcase">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Left part list description text */}
                  <div>
                    <h4 className="font-display text-xl font-extrabold text-brand-violet-dark uppercase tracking-wide">
                      {activeCatalogTab === 'standard' && 'Everyday Pristine Maintenance'}
                      {activeCatalogTab === 'deep' && 'Intense Sanitizing & Descaling'}
                      {activeCatalogTab === 'movein' && 'Seamless Deposit-Back Sparkle'}
                     
                    </h4>
                    
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-3 mb-6">
                      {activeCatalogTab === 'standard' && 'Our team sweeps, vacuums, scrubs sinks, dusts furniture, sanitizes toilets, and makes standard bed sheet replacements. Perfect to maintain weekly hygiene.'}
                      {activeCatalogTab === 'deep' && 'Highly suggested if your home has had no professional servicing in 2+ months. Includes descaling tile grout lines, removing carbon grease in stoves, ceiling vent dusting, and doors sanitation.'}
                      {activeCatalogTab === 'movein' && 'Empty properties custom detailing tailored to land 100% of tenant security deposits. Covers deep-cleans inside wardrobes, cabinets, appliances, baseboards, and window panes.'}
                      
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="checklist-bullets-grid">
                      {(activeCatalogTab === 'standard' ? [
                        'Dust counter surfaces & table tops',
                        'Vacuum & mop throughout rugs/wood',
                        'Sanitize toilet, faucets & wash basin',
                        'General kitchen sink wash & scrub',
                        'Empty all trash & fit clean bin sheets',
                        'Make beds & replace covers (if active)'
                      ] : activeCatalogTab === 'deep' ? [
                        'Scrub tile grout lines & lime removal',
                        'Remove heavy carbon on stovetop grids',
                        'Dust ceiling vents & light switches',
                        'Sanitize door frames & baseboards',
                        'Wash bathroom glass tiles & mirrors',
                        'Wipe stove exterior & grease traps'
                      ] : activeCatalogTab === 'movein' ? [
                        'Sanitize completely empty cabinets',
                        'Deep wash window tracks & glass',
                        'Wipe deep down closet layouts',
                        'Sanitize inside fridge shelves',
                        'Clean heavy grease inside oven unit',
                        'Polish chrome plumbing fixtures'
                      ] : [
                        'Express sanitize bedroom sheets',
                        'Remove guest fingerprints on doors',
                        'Inspect fridge for tenant leftovers',
                        'Empty and wash garbage frames',
                        'Replenish soap items & toilet paper',
                        'Light vacuum of sitting lounge'
                      ]).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <Check className="w-4 h-4 text-brand-pink shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button 
                        onClick={() => handleOpenBooking(activeCatalogTab)}
                        className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs px-5 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>Book Package on WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Right part illustrative card block */}
                  <div className="relative rounded-2xl overflow-hidden h-48 sm:h-72 border-4 border-gray-50 shadow-lg">
                    <img 
                      src={
                        activeCatalogTab === 'standard' ? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600&h=400' :
                        activeCatalogTab === 'deep' ? 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600&h=400' :
                        activeCatalogTab === 'movein' ? 'https://images.unsplash.com/photo-1603712449767-f939b70d47ad?auto=format&fit=crop&q=80&w=600&h=400' :
                        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600&h=400'
                      }
                      alt="Spotless cleaning catalog illustration" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="block text-xs font-extrabold uppercase tracking-widest text-[#FFC7E5]">Sevzy Standards</span>
                      <span className="block text-sm font-bold mt-1">Chemical-free sanitation always active</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* INTERACTIVE BEFORE/AFTER DRAG SLIDER MODULE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BeforeAfterSlider />
            </section>

            {/* MEET OUR VERIFIED CLEANERS (MAIDS PROFILE PANELS) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="maids-profile-portfolio">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs font-black text-brand-pink uppercase tracking-widest">Maid Team Spotlight</span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Meet Our Elite Professionals</h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  All cleaning partners are background-cleared, insured, and maintain a minimum rating of 4.90 stars.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {allMaids.map((maid) => (
                  <div key={maid.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl flex flex-col justify-between" id={`maid-portfolio-${maid.id}`}>
                    <div>
                      {/* Avatar & Ratings info */}
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={maid.avatar} 
                          alt={maid.name} 
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-violet-light shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-display text-base font-black text-gray-900">{maid.name}</h4>
                          <span className="text-xs font-bold text-brand-violet">{maid.specialty}</span>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                            <span className="text-xs font-black text-gray-800">{maid.rating}</span>
                            <span className="text-[10px] text-gray-400">({maid.reviewsCount} verified reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio text */}
                      <p className="text-xs text-gray-500 leading-relaxed mb-6">
                        "{maid.bio}"
                      </p>
                    </div>

                    {/* Booking shortcut CTA button */}
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        ● Available this week
                      </span>
                      <button
                        onClick={() => handleQuickBookMaid(maid.id)}
                        className="text-xs font-black text-brand-violet hover:text-brand-pink flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Book {maid.name.split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TESTIMONIALS VERIFIED USER VERDICTS */}
            <section className="bg-gradient-to-tr from-[#FAF8FF] to-white py-14 border-y border-gray-100" id="customer-reviews-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <span className="text-xs font-black text-brand-pink uppercase tracking-widest">Verified Customer Love</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mt-1">Real Reviews from Real Neighbors</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {CUSTOMER_TESTIMONIALS.map((review) => (
                    <div key={review.id} className="bg-white border border-pink-50 p-6 rounded-2xl shadow-sm flex flex-col justify-between" id={`review-card-${review.id}`}>
                      <div>
                        {/* Rating row */}
                        <div className="flex gap-0.5 mb-3" id="testimonial-stars-bar">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        
                        {/* Text */}
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author info */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-50 mt-4">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="block font-bold text-xs text-gray-900">{review.name}</span>
                          <span className="block text-[10px] text-gray-400">{review.role} • <span className="text-brand-violet-dark font-semibold">{review.serviceType}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FREQUENTLY COLLAPSIBLE CORNER (FAQ) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FAQ />
            </section>

          </div>
        )}


        {/* VIEW Snabbit: DETAILED SERVICES EXPERTS PAGES */}
        {activeSection === 'services' && (
          <div className="animate-fadeIn" id="applet-services-snabbit-wrapper">
            <ServicePage 
              initialServiceId={selectedServiceId}
              maids={allMaids}
              onNavigate={handleNavigate}
              onOpenBooking={(prefillInfo) => {
                handleOpenBooking(prefillInfo?.serviceType || 'standard');
              }}
            />
          </div>
        )}

        {/* VIEW: ABOUT US DETAIL PANEL */}
        {activeSection === 'about' && (
          <div className="animate-fadeIn" id="applet-about-wrapper">
            <AboutPage 
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking('standard')}
            />
          </div>
        )}

        {/* VIEW: FAQ HELP PANEL */}
        {activeSection === 'faq' && (
          <div className="animate-fadeIn" id="applet-faq-wrapper">
            <FAQ 
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking('standard')}
            />
          </div>
        )}

      </main>

      {/* Footer layout */}
      <Footer onNavigate={handleNavigate} onOpenBooking={() => handleOpenBooking('standard')} />

      {/* Floating support AI chat */}
      <Chatbot onOpenBooking={() => handleOpenBooking('standard')} />

      {/* Quick Booking Popup Modal */}
      <QuickBookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefillServiceId={bookingPrefillService}
      />

    </div>
  );
}
