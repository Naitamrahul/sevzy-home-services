import { Sparkles, Heart, Shield, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: 'home' | 'booking' | 'tracker') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-400 font-sans border-t-4 border-brand-violet/20" id="page-footer">
      
      {/* Visual trust strip */}
      <div className="bg-gray-800 text-white py-6 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-brand-violet/10 text-brand-pink rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold">fully Bonded & Insured</span>
              <span className="block text-xs text-gray-400">₹2M Liability coverage</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-brand-violet/10 text-brand-pink rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold">100% Bliss Guarantee</span>
              <span className="block text-xs text-gray-400">Not satisfied? We re-clean free</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-brand-violet/10 text-brand-pink rounded-xl">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold">Background Checked</span>
              <span className="block text-xs text-gray-400">Top 1.5% applicant match</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-brand-violet/10 text-brand-pink rounded-xl">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="block text-sm font-bold">Eco-Safe Disinfecting</span>
              <span className="block text-xs text-gray-400">Kid & pet-safe solutions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-brand-violet to-brand-pink p-2 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-black text-white tracking-tight">
                Sevzy <span className="text-brand-pink">Home Services</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Sevzy is the ultimate premium maid dispatch clone, engineered in high contrast violet & pink. We curate professional, vetted cleaners to offer same-day sanitization and spotless living comfort.
            </p>
            <div className="flex items-center gap-2.5 pt-2" id="footer-badges">
              <span className="text-[9px] bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 font-extrabold tracking-wider uppercase">Vetted #1 Maid Platform</span>
              <span className="text-[9px] bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 font-extrabold tracking-wider uppercase">Eco Products Certified</span>
            </div>
          </div>

          {/* Core Categories */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4">Cleaning Packages</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><button onClick={() => onNavigate('booking')} className="hover:text-brand-pink transition-colors">Standard Maintenance Clean</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-brand-pink transition-colors">Deep Scrub sanitization</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-brand-pink transition-colors">Moving In/Out Sparkle</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-brand-pink transition-colors">Airbnb Turnaround Express</button></li>
            </ul>
          </div>

          {/* Quick Shortcuts */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium col-span-1">
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand-pink transition-colors">Home Page</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-brand-pink transition-colors">Pricing Configurator</button></li>
              <li><button onClick={() => onNavigate('tracker')} className="hover:text-brand-pink transition-colors">Live Active Tracker</button></li>
              <li><a href="tel:+91 7028997855" className="hover:text-brand-pink transition-colors">Call Support Dispatch</a></li>
            </ul>
          </div>

          {/* Trust coordinates */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4">Dispatch Office</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-1">
              Sevzy HQ Inc.<br />
              945 Broadway Avenue<br />
              Nagpur, 440001, India
            </p>
            <p className="text-xs text-brand-pink font-bold">
              Mon - Sun: 7:00 AM - 10:00 PM
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© 2026 Sevzy Home Services. Develop by Robocode.AI Tech Lab. All rights reserved.</p>
          <p className="flex items-center gap-1 text-gray-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
            <span>for peaceful home living.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
