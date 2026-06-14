import { useState } from 'react';
import { Sparkles, Menu, X, Phone, CalendarRange, ChevronDown, ChevronRight } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface NavbarProps {
  onNavigate: (section: 'home' | 'services' | 'about' | 'faq') => void;
  activeSection: string;
  onSelectService: (serviceId: 'dishwashing' | 'kitchen' | 'fan' | 'window' | 'laundry' | 'bathroom') => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onNavigate, activeSection, onSelectService, onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const subServices = [
    { id: 'dishwashing', label: 'Dishwashing Help' },
    { id: 'kitchen', label: 'Kitchen Deep Clean' },
    { id: 'fan', label: 'Ceiling Fan Detail' },
    { id: 'window', label: 'Window Glass Wash' },
    { id: 'laundry', label: 'Laundry Wash & Fold' },
    { id: 'bathroom', label: 'Bathroom Descaling' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" id="sevzy-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer space-x-2 mr-8 group"
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
              id="brand-logo-container"
            >
              <div className="bg-gradient-to-tr from-brand-violet to-brand-pink p-2.5 rounded-2xl text-white shadow-md shadow-brand-violet/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent">
                  Sevzy
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Home Services</span>
              </div>
            </div>

            {/* Desktop Nav Items with Snabbit-inspired Dropdown */}
            <div className="hidden md:flex space-x-6 items-center">
              {/* Home Link */}
              <button
                id="nav-link-home"
                onClick={() => onNavigate('home')}
                className={`font-semibold text-sm transition-colors relative py-2 cursor-pointer ${
                  activeSection === 'home' 
                    ? 'text-brand-violet font-bold' 
                    : 'text-gray-500 hover:text-brand-pink'
                }`}
              >
                Home
                {activeSection === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink rounded-full" />
                )}
              </button>

              {/* Snabbit Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  id="nav-services-dropdown-trigger"
                  className={`font-semibold text-sm transition-colors py-2 flex items-center gap-1 cursor-pointer relative ${
                    activeSection === 'services'
                      ? 'text-brand-violet font-bold'
                      : 'text-gray-500 hover:text-brand-pink'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-brand-violet' : ''}`} />
                  {activeSection === 'services' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink rounded-full" />
                  )}
                </button>

                {dropdownOpen && (
                  <div 
                    className="absolute left-1/2 -translate-x-1/4 top-full w-96 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 grid grid-cols-12 gap-3 z-50 animate-fadeIn"
                    id="navbar-services-flyout"
                  >
                    {/* Left side category */}
                    <div className="col-span-4 border-r border-gray-50 pr-3">
                      <span className="text-[9px] uppercase font-black tracking-widest text-gray-400 block mb-2">SERVICES</span>
                      <button className="w-full text-left px-2 py-2 bg-pink-50 text-brand-pink-dark rounded-xl text-[11px] font-bold flex items-center justify-between">
                        <span>House Help</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Right side house help items */}
                    <div className="col-span-8 pl-1">
                      <span className="text-[9px] uppercase font-black tracking-widest text-gray-400 block mb-2">HOUSE HELP FOR</span>
                      <div className="grid grid-cols-1 gap-0.5">
                        {subServices.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              onSelectService(sub.id as any);
                              onNavigate('services');
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-violet transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{sub.label}</span>
                            <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-brand-violet" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Link */}
              <button
                id="nav-link-about"
                onClick={() => onNavigate('about')}
                className={`font-semibold text-sm transition-colors relative py-2 cursor-pointer ${
                  activeSection === 'about' 
                    ? 'text-brand-violet font-bold' 
                    : 'text-gray-500 hover:text-brand-pink'
                }`}
              >
                About Us
                {activeSection === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink rounded-full" />
                )}
              </button>

              {/* FAQ Link */}
              <button
                id="nav-link-faq"
                onClick={() => onNavigate('faq')}
                className={`font-semibold text-sm transition-colors relative py-2 cursor-pointer ${
                  activeSection === 'faq' 
                    ? 'text-brand-violet font-bold' 
                    : 'text-gray-500 hover:text-brand-pink'
                }`}
              >
                FAQ
                {activeSection === 'faq' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Contact & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="tel:+91 7028997855" 
              className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-brand-violet transition-colors"
              id="call-us-link"
            >
              <div className="p-2 bg-brand-violet-light rounded-full text-brand-violet">
                <IconPhone className="w-4 h-4" />
              </div>
              <span>+91 7028997855</span>
            </a>
            
            <button
              id="nav-cta-booking"
              onClick={onOpenBooking}
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-[#25D366]/15 hover:shadow-[#25D366]/25 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-brand-violet hover:bg-gray-100 transition-colors cursor-pointer"
              id="mobile-nav-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn" id="mobile-nav-menu">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {/* Home */}
            <button
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                activeSection === 'home' ? 'bg-brand-violet-light text-brand-violet' : 'text-gray-600'
              }`}
            >
              Home
            </button>

            {/* Collapsible Mobile Services */}
            <div className="border border-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`flex w-full items-center justify-between px-4 py-3 font-bold text-base transition-colors text-left ${
                  activeSection === 'services' ? 'text-brand-violet' : 'text-gray-600'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileServicesOpen && (
                <div className="bg-gray-50 px-4 py-2 space-y-2">
                  {subServices.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSelectService(sub.id as any);
                        onNavigate('services');
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-xs font-bold text-gray-500 hover:text-brand-violet"
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => { onNavigate('about'); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                activeSection === 'about' ? 'bg-brand-violet-light text-brand-violet' : 'text-gray-600'
              }`}
            >
              About Us
            </button>

            {/* FAQ */}
            <button
              onClick={() => { onNavigate('faq'); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                activeSection === 'faq' ? 'bg-brand-violet-light text-brand-violet' : 'text-gray-600'
              }`}
            >
              FAQ
            </button>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <a 
                href="+91 7028997855" 
                className="flex items-center space-x-3 text-base font-bold text-gray-700 px-4"
              >
                <div className="p-2.5 bg-brand-violet-light rounded-full text-brand-violet">
                  <IconPhone className="w-5 h-5" />
                </div>
                <span>+91 7028997855</span>
              </a>
              
              <button
                id="mobile-cta-booking"
                onClick={() => {
                  onOpenBooking();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-xl shadow-lg cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Book on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Inline mini helper for phone icon since we need Phone inside
function IconPhone({ className }: { className?: string }) {
  return <Phone className={className} />;
}
