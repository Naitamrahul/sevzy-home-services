import { ShieldCheck, Award, Heart, Sparkles, Building, CheckCircle, Users, Scale } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface AboutPageProps {
  onNavigate: (section: 'home' | 'services' | 'about') => void;
  onOpenBooking: () => void;
}

export default function AboutPage({ onNavigate, onOpenBooking }: AboutPageProps) {
  const companyMilestones = [
    {
      year: "2024",
      title: "The Vision Born",
      description: "Founded to eliminate unreliable domestic booking cycles by establishing real-time background-verified expert dispatches."
    },
    {
      year: "2025",
      title: "Sevzy Training Academy",
      description: "Established our physical mock-apartment training modules to certify all specialists with 20+ specialized routine check-points."
    },
    {
      year: "2026",
      title: "Trusted across India",
      description: "Providing 5-star standard household relief to over 25,000 households with fully automated, cashless dispatch algorithms."
    }
  ];

  const corePillars = [
    {
      icon: ShieldCheck,
      title: "Comprehensive 3-Fold Screening",
      description: "Every professional partner completes active court records checking, continuous legal address verification, and strict medical health screening before entering homes."
    },
    {
      icon: Award,
      title: "The Host Certification Academy",
      description: "Every team member finishes a rigorous 2-day hands-on simulation test. They master food-safe dishwashing, delicate glassware care, acid-free floor polishing, and geometric folding."
    },
    {
      icon: Scale,
      title: "Uncompromising Fair Wages",
      description: "We guarantee double the local market minimum compensation models, structured health benefits, and secure transport incentives. Happy professionals deliver pristine results."
    },
    {
      icon: Heart,
      title: "₹2,000,000 Damage Safeguard",
      description: "Enjoy ultimate peace of mind. Every routine is fully backed by our commercial liability policy covering household accidental breakages seamlessly."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn" id="sevzy-about-page">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400" id="about-breadcrumbs">
        <span className="hover:text-brand-violet cursor-pointer" onClick={() => onNavigate('home')}>Home</span>
        <span>/</span>
        <span className="text-gray-700 font-bold">About Us</span>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5" id="about-hero">
        <span className="text-[11px] uppercase tracking-widest font-black text-brand-pink bg-pink-50 border border-brand-pink/10 px-3 py-1 rounded-full inline-block">
          RE-DEFINING DOMESTIC CONVENIENCE
        </span>
        <h1 className="font-display text-3.5xl sm:text-5xl font-black text-gray-905 leading-none tracking-tight text-gray-950">
          Professionalism Meets <span className="bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent">Impeccant Care</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold">
          Sevzy was created to turn chaotic, uncertified daily household chores into an instant, high-standard hospitality experience. We train, verify, and support our partners so you can dedicate time to what truly matters.
        </p>
      </div>

      {/* Trust & Verification Pillars - Grid Layout */}
      <div className="space-y-8" id="about-pillars">
        <div className="text-center">
          <h2 className="font-display text-2.5xl font-black text-gray-900">
            Why Nagpur Trust Sevzy
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Our Core Safety & Operational Standards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {corePillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex gap-5 items-start"
                id={`about-pillar-card-${i}`}
              >
                <div className="p-3 bg-brand-violet-light rounded-2xl text-brand-violet shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-black text-gray-905 text-sm sm:text-base text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-550 text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gradient-to-tr from-gray-50 via-pink-50/10 to-white border border-gray-100 rounded-3xl p-8 sm:p-12 space-y-10" id="about-timeline">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-black text-gray-900">Our Operational Milestone Journey</h2>
          <p className="text-gray-400 text-xs font-semibold max-w-md mx-auto">
            From a localized pilot to the region's premium household service engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" id="timeline-steps-grid">
          {companyMilestones.map((milestone, idx) => (
            <div key={idx} className="relative space-y-3 p-5 bg-white border border-gray-50 rounded-2xl shadow-xs" id={`milestone-${idx}`}>
              <span className="font-mono text-3xl font-black text-brand-pink/20 absolute -top-4 left-4">
                {milestone.year}
              </span>
              <div className="pt-2">
                <h4 className="font-display font-extrabold text-sm sm:text-base text-gray-900">{milestone.title}</h4>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden" id="about-cta-banner">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-12 translate-x-12">
          <Sparkles className="w-56 h-56 text-white" />
        </div>
        
        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
            🤝 Seamless Household Empowerment
          </div>
          
          <h3 className="font-display text-2.5xl sm:text-3.5xl font-black tracking-tight text-white leading-none">
            Ready to live brighter, stress-free lives?
          </h3>
          
          <p className="text-pink-100 text-xs sm:text-sm leading-relaxed opacity-90">
            Configure custom dishwasher hours, intensive kitchen restores, and bathroom descaling visits directly in our 60-seconds checkout modal.
          </p>

          <div className="flex gap-3 justify-center items-center pt-2">
            <button
              onClick={onOpenBooking}
              className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Book on WhatsApp</span>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="px-5 py-3.5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs"
            >
              View Service Categories
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
