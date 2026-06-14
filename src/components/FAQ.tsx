import { useState, useMemo } from 'react';
import { 
  ChevronDown, HelpCircle, Search, Sparkles, ShieldCheck, 
  Clock, CreditCard, LifeBuoy, ArrowRight, CheckCircle2, MessageSquare, Phone
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface FAQProps {
  onNavigate?: (section: 'home' | 'services' | 'about' | 'faq') => void;
  onOpenBooking?: () => void;
}

interface InteractiveFAQItem {
  question: string;
  answer: string;
  category: 'safety' | 'booking' | 'cleaning' | 'guarantee';
}

const EXTENDED_FAQS: InteractiveFAQItem[] = [
  {
    category: 'cleaning',
    question: 'How does Sevzy premium cleaning service work?',
    answer: 'Sevzy lets you customize, price, and schedule professional cleaning services in seconds. Choose your apartment size, select a cleaning focus (Standard, Deep, or Move-In), add extra tasks like oven or fridge cleanups, pick a time slot, and submit! We assign a vetted professional and keep you updated in real-time.'
  },
  {
    category: 'safety',
    question: 'Are your home service professionals vetted and background-checked?',
    answer: 'Absolutely. Every single maid on the Sevzy platform undergoes a rigorous 3-stage vetting process. This includes criminal record audits, legal address verification, in-person training assessments, and continuous customer satisfaction feedback monitoring.'
  },
  {
    category: 'cleaning',
    question: 'What is the difference between a Standard Clean and a Deep Clean?',
    answer: 'A Standard Clean covers everyday maintenance: sweeping, vacuuming, mopping, dusting open surfaces, sanitizing bathrooms, and making beds. A Deep Clean goes much deeper: scrubbing tile grout, sanitizing inside light fixtures, detailed baseboard dusting, cleaning behind appliances, and removing accumulated lime scale.'
  },
  {
    category: 'cleaning',
    question: 'Do I need to supply cleaning products or be present?',
    answer: 'No! Our professionals arrive fully equipped with premium, safe cleaning supplies. If you select our "100% Eco Products" add-on, we will use exclusively organic, chemical/dye-free plant materials. You also do not need to be home - simply leave entry details or key collection directions in the notes.'
  },
  {
    category: 'guarantee',
    question: 'What is your satisfaction guarantee?',
    answer: 'We stand behind our work. If any part of our service does not meet your high standards, simply contact us within 24 hours. We will send a premium cleaner back to re-clean any unsatisfactory areas completely free of charge. No questions asked.'
  },
  {
    category: 'safety',
    question: 'What happens if something gets accidentally broken during service?',
    answer: 'Sevzy takes extreme care, but we are fully prepared for the unexpected. Every single cleaning routine is fully covered by our ₹2,000,000 comprehensive commercial liability insurance safety shield. Any verified accidental damages will be repaired or replaced seamlessly.'
  },
  {
    category: 'booking',
    question: 'What is your rescheduling or cancellation policy?',
    answer: 'We understand that home schedules change. You can cancel or reschedule any upcoming booking completely free of charge up to 4 hours before the designated start time. For cancellations within the 4-hour window, a nominal ₹200 slot-holder fee is applied to compensate our dispatches.'
  },
  {
    category: 'booking',
    question: 'Can I request the exact same maid for my future routines?',
    answer: 'Yes! If you find an expert you absolutely love, you can lock them in. Simply note down their name during checkout, or request them directly from our "Spotlight maids" page. We will synchronize future slots directly with their working availability.'
  },
  {
    category: 'booking',
    question: 'Can I configure recurring cleaning packages?',
    answer: 'Absolutely. We offer customized Weekly, Bi-weekly, and Monthly routines. Recurring schedules unlock automated discounts of up to 25% off regular rates, priority matchmaking with the same premium maid, and flexible lock-in slots.'
  },
  {
    category: 'guarantee',
    question: 'How fast will my Dispatch Support team reply?',
    answer: 'We maintain live physical dispatch monitors in Delhi-NCR and Mumbai. High-standard customer support triggers replies in less than 5 minutes on WhatsApp or Phone, ensuring zero-waiting times when addressing scheduling adjustments.'
  }
];

export default function FAQ({ onNavigate, onOpenBooking }: FAQProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'safety' | 'booking' | 'cleaning' | 'guarantee'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filtered FAQs based on query and tabs
  const filteredFAQs = useMemo(() => {
    return EXTENDED_FAQS.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: EXTENDED_FAQS.length,
      safety: EXTENDED_FAQS.filter(f => f.category === 'safety').length,
      booking: EXTENDED_FAQS.filter(f => f.category === 'booking').length,
      cleaning: EXTENDED_FAQS.filter(f => f.category === 'cleaning').length,
      guarantee: EXTENDED_FAQS.filter(f => f.category === 'guarantee').length,
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans" id="snabbit-faq-page">
      
      {/* Breadcrumb Navigation - only rendered if onNavigate is present */}
      {onNavigate && (
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400" id="faq-breadcrumbs">
          <span className="hover:text-brand-violet cursor-pointer" onClick={() => onNavigate('home')}>Home</span>
          <span>/</span>
          <span className="text-gray-700 font-bold">FAQ Help Center</span>
        </div>
      )}

      {/* Header and Hero area */}
      <div className="text-center max-w-2xl mx-auto space-y-4" id="faq-hero">
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-black text-brand-violet bg-brand-violet-light px-3.5 py-1.5 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          Sevzy Knowledgebase
        </span>
        <h1 className="font-display text-3xl sm:text-4.5xl font-black text-gray-950 leading-tight tracking-tight">
          Have Questions? <span className="bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent">We have clear answers.</span>
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
          Find instant details about background verification, satisfaction guarantees, pricing, and accidental coverage liability rules.
        </p>

        {/* Real-time search element */}
        <div className="pt-4 max-w-lg mx-auto" id="faq-search-widget">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by keywords (e.g. 'insurance', 'cancellation', 'maid')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet placeholder-gray-400 transition"
              id="faq-search-input"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Tabs & Main content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left column tabs */}
        <div className="lg:col-span-4 space-y-4" id="faq-category-navigation">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">
            FAQ Category Files
          </span>
          <div className="flex flex-row overflow-x-auto lg:flex-col gap-1.5 pb-2 lg:pb-0 scrollbar-none" id="faq-tabs-scroller">
            {[
              { id: 'all', label: 'All Questions', icon: HelpCircle },
              { id: 'safety', label: 'Safety & Insurance', icon: ShieldCheck },
              { id: 'booking', label: 'Booking & Timing', icon: Clock },
              { id: 'cleaning', label: 'Service & Standards', icon: Sparkles },
              { id: 'guarantee', label: 'Refund & Support', icon: LifeBuoy }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeCategory === tab.id;
              const count = categoryCounts[tab.id as keyof typeof categoryCounts];
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id as any);
                    setOpenIndex(0); // auto-open first item on category switch
                  }}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer border shrink-0 ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-violet to-brand-violet-dark text-white shadow-md shadow-brand-violet/15 border-transparent' 
                      : 'bg-white border-gray-100 text-gray-600 hover:text-brand-violet hover:border-gray-200'
                  }`}
                  id={`faq-tab-${tab.id}`}
                >
                  <div className="flex items-center gap-2">
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prompt banner inside tab col */}
          <div className="hidden lg:block bg-gradient-to-tr from-brand-pink/5 to-transparent rounded-3xl p-5 border border-brand-pink/5 space-y-3">
            <span className="flex items-center gap-1.5 text-[9px] font-extrabold text-brand-pink uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              100% Bliss Safe Guard
            </span>
            <p className="text-[11px] text-gray-600 leading-normal font-semibold">
              Not happy with standard mops? Notify us in 24 hours. We arrange active dispatches to scrub areas completely for free.
            </p>
          </div>
        </div>

        {/* Right column collapsible Accordion stream */}
        <div className="lg:col-span-8 space-y-4" id="faq-accordions-stream">
          
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-brand-violet/20 shadow-md shadow-brand-violet/5' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                  id={`faq-accordion-item-${index}`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="w-full px-5 py-4.5 flex justify-between items-center text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Interactive indicator color dots */}
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        faq.category === 'safety' ? 'bg-[#5CB85C]' :
                        faq.category === 'booking' ? 'bg-[#F0AD4E]' :
                        faq.category === 'cleaning' ? 'bg-[#0275D8]' : 'bg-[#D9534F]'
                      }`} />
                      <span className={`font-bold text-xs sm:text-sm tracking-tight transition-colors ${
                        isOpen ? 'text-brand-violet-dark' : 'text-gray-800 group-hover:text-brand-violet'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`p-1.5 rounded-xl transition-all shrink-0 ${
                      isOpen 
                        ? 'bg-brand-violet text-white rotate-180 shadow-md' 
                        : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-50 animate-fadeIn" id={`faq-accordion-answer-${index}`}>
                      <p className="text-xs sm:text-sm leading-relaxed text-gray-600 font-semibold">
                        {faq.answer}
                      </p>

                      {/* Display extra trust badges dynamically for specific safety queries */}
                      {faq.category === 'safety' && (
                        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-dashed border-gray-100">
                          <span className="inline-flex items-center gap-1 text-[9px] font-black text-[#5CB85C] bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Fully Vetted & Bonded
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-black text-brand-violet bg-pink-50 px-2 py-1 rounded-md uppercase tracking-wider">
                            ₹2,000,000 Insurance Safe
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // Empty view helper
            <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl" id="faq-empty-search">
              <p className="text-sm font-bold text-gray-800">No matches found for "{searchQuery}"</p>
              <p className="text-xs text-gray-400 mt-1">Please try standard query terms like "deposit", "cancel", "guarantee" or "maid".</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-brand-violet text-xs font-bold rounded-lg transition"
              >
                Clear Search Query
              </button>
            </div>
          )}

          {/* Quick Helper Widget at bottom of Stream */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden" id="faq-contact-card">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-8">
              <HelpCircle className="w-48 h-48" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] font-black tracking-widest text-[#FFC7E5] uppercase block">
                  STAFF DISPATCH HOTLINE
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold leading-tight">
                  Still have queries unanswered by our guidelines?
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
                  Our dispatch operations are live 24/7. Chat directly with support or give us a ring to confirm slot availabilities.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="w-full px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs rounded-xl shadow-sm text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Book on WhatsApp</span>
                  </button>
                )}
                
                <a
                  href="tel:+917028997855"
                  className="w-full px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Dispatch</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
