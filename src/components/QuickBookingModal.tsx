import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle, 
  MapPin, Check, ChevronDown, Award, ShieldCheck
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.56 0 11.902-5.336 11.905-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillServiceId?: string;
}

export default function QuickBookingModal({ isOpen, onClose, prefillServiceId }: QuickBookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState('standard');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    note: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefillServiceId) {
      setSelectedService(prefillServiceId);
    }
  }, [prefillServiceId]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\-+\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Service address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getWhatsAppLink = () => {
    const whatsappNumber = '7028997855';
    const serviceLabels: Record<string, string> = {
      standard: "Standard Maintenance House Clean",
      deep: "Deep Clean Intensified Scrub",
      dishwashing: "Dishwashing Professional Help",
      kitchen: "Kitchen Deep Sanitization Clean",
      fan: "Ceiling Fan Detail Treatment",
      window: "Window Glass Wash & Shine",
      laundry: "Laundry Washing, Drying & Fold",
      bathroom: "Bathroom Scale & Tile Descaling"
    };
    const chosenLabel = serviceLabels[selectedService] || selectedService;
    const text = `Hi Sevzy! I'd like to book a home cleaning service:
• Service: ${chosenLabel}
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}
• Address: ${formData.address}
• Date: ${formData.date}
• Time Slot: ${formData.time}
${formData.note.trim() ? `• Notes: ${formData.note}` : ''}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      
      // Launch WhatsApp redirection
      const link = getWhatsAppLink();
      window.open(link, '_blank');
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      note: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto block font-sans" id="quick-booking-modal-overlay">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/65 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-xl animate-fadeIn border border-gray-100" id="quick-booking-modal-content">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#25d366]/90 to-[#20ba5a]/90 px-6 sm:px-8 py-5 text-white flex justify-between items-center relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl text-white">
                <WhatsAppIcon className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight leading-tight">WhatsApp Live Dispatch Desk</h3>
                <p className="text-xs text-white/90 font-medium">Draft dynamic requirements & send instantly to support</p>
              </div>
            </div>
            
            <button 
              onClick={handleReset}
              className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-all"
              id="close-booking-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              
              {/* Direct Fast-Track WhatsApp CTA */}
              <div className="bg-green-50/70 border border-green-200/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-green-800 uppercase tracking-wider flex items-center gap-1">
                    <span>⚡ Fast-Track Dispatch</span>
                  </h4>
                  <p className="text-[11px] text-green-700 font-semibold leading-relaxed">
                    Skip the form and chat directly with support on WhatsApp right now.
                  </p>
                </div>
                <a
                  href="https://wa.me/7028997855?text=Hi%20Sevzy%21%20I%20want%20to%20book%20a%20premium%20home%20cleaning%20service%20right%20now."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-[#25D366]/15 shrink-0 self-stretch sm:self-auto"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Chat Directly</span>
                </a>
              </div>

              {/* Trust Badge Grid */}
              <div className="grid grid-cols-2 gap-3 mb-2 bg-gray-50/75 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-violet shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-gray-700">₹2M Liability Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-pink shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-gray-700">Top 1.5% Vetted Experts</span>
                </div>
              </div>

              {/* Service selection drop */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Requested Service Specialty
                </label>
                <div className="relative">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full text-sm font-bold bg-gray-50 border border-gray-200 text-gray-700 py-3.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet appearance-none"
                    id="modal-select-service"
                  >
                    <option value="standard">Standard Maintenance House Clean</option>
                    <option value="deep">Deep Clean Intensified Scrub</option>
                    <option value="dishwashing">Dishwashing Professional Help</option>
                    <option value="kitchen">Kitchen Deep Sanitization Clean</option>
                    <option value="fan">Ceiling Fan Detail Treatment</option>
                    <option value="window">Window Glass Wash & Shine</option>
                    <option value="laundry">Laundry Washing, Drying & Fold</option>
                    <option value="bathroom">Bathroom Scale & Tile Descaling</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Grid Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Rahul Naitam"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-sm font-semibold bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>WhatsApp / Phone</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 7028997855"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full text-sm font-semibold bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet ${
                      errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.phone}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-sm font-semibold bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Service Address / Apt</span>
                  </label>
                  <input
                    type="text"
                    placeholder="120 ,manewada, nagpur"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full text-sm font-semibold bg-gray-50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet ${
                      errors.address ? 'border-red-400 focus:border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.address && <span className="text-[10px] text-red-500 font-bold block mt-1">{errors.address}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 text-gray-700 py-3.5 px-4 pr-10 rounded-xl focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="08:00 AM">08:00 AM (Early Bird)</option>
                    <option value="10:00 AM">10:00 AM (Recommended)</option>
                    <option value="12:00 PM">12:00 PM (Noon Reset)</option>
                    <option value="02:30 PM">02:30 PM (Mid Afternoon)</option>
                    <option value="05:00 PM">05:00 PM (Late Shift)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-1.5">
                  Optional Notes (Gate Codes, Access, etc)
                </label>
                <textarea
                  placeholder="Need key left under main mat, please avoid kitchen bleach..."
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-violet/20 focus:border-brand-violet resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-4">
                <span className="text-[10px] text-gray-400 font-bold max-w-[50%]">
                  Connects directly with live Sevzy customer support chat.
                </span>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-[#25D366]/15 hover:shadow-[#25D366]/25 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Confirm via WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* Success Step */
            <div className="p-8 sm:p-12 text-center space-y-6" id="booking-success-step">
              <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto shadow-inner animate-pulse flex items-center justify-center">
                <WhatsAppIcon className="w-10 h-10 text-[#25D366]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-display text-2xl font-black text-gray-900">
                  Opening WhatsApp Chat!
                </h4>
                <p className="text-sm font-bold text-[#25D366]">
                  Your booking details have been generated.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                  We have loaded your cleaning parameters. If WhatsApp did not open automatically, please click the button below to send your secure booking directly to our Nagpur dispatches.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 divide-y divide-gray-100 max-w-md mx-auto text-left text-xs font-bold text-gray-600">
                <div className="py-2.5 flex justify-between">
                  <span>Client Name:</span>
                  <span className="text-gray-900">{formData.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Service Type:</span>
                  <span className="text-gray-900 capitalize">{selectedService} Clean</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>Slot Time:</span>
                  <span className="text-gray-900">{formData.date} • {formData.time}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Send WhatsApp Message</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
