import { useState, useMemo, FormEvent } from 'react';
import { 
  Plus, Minus, Sparkles, Check, Calendar, Clock, User, 
  Mail, MapPin, PhoneCall, Pencil, ShieldCheck, TicketPercent 
} from 'lucide-react';
import { ServiceType, BookingFrequency, BookingDetails } from '../types';
import { SERVICE_ADDONS } from '../data/mockData';

interface BookingFormProps {
  onBookingComplete: (booking: BookingDetails) => void;
  initialBedrooms?: number;
}

export default function BookingForm({ onBookingComplete, initialBedrooms = 2 }: BookingFormProps) {
  // Config state
  const [bedrooms, setBedrooms] = useState<number>(initialBedrooms);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [serviceType, setServiceType] = useState<ServiceType>('standard');
  const [frequency, setFrequency] = useState<BookingFrequency>('one-time');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Schedule state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');
  
  // Client state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Validation indicator
  const [errorMsg, setErrorMsg] = useState('');

  // Service Multipliers & Base Costs
  const pricingConfig = {
    standard: { base: 90, bedPrice: 20, bathPrice: 15 },
    deep: { base: 140, bedPrice: 30, bathPrice: 25 },
    'move-in': { base: 180, bedPrice: 40, bathPrice: 35 },
    airbnb: { base: 110, bedPrice: 25, bathPrice: 20 }
  };

  // Live Pricing Calculations
  const calculations = useMemo(() => {
    const config = pricingConfig[serviceType];
    const base = config.base + (bedrooms * config.bedPrice) + (bathrooms * config.bathPrice);
    
    // Addons cost
    const addonsCost = selectedAddons.reduce((acc, currentId) => {
      const addon = SERVICE_ADDONS.find(a => a.id === currentId);
      return acc + (addon ? addon.price : 0);
    }, 0);

    const subtotal = base + addonsCost;

    // Frequencies discounts
    let discountPct = 0;
    if (frequency === 'weekly') discountPct = 0.20;
    else if (frequency === 'bi-weekly') discountPct = 0.15;
    else if (frequency === 'monthly') discountPct = 0.10;

    // Additional promo discount
    let promoDiscountAmt = 0;
    if (promoApplied) {
      promoDiscountAmt = 15; // flat ₹15 off
    }

    const discountAmt = Math.round(subtotal * discountPct) + promoDiscountAmt;
    const tax = Math.round((subtotal - discountAmt) * 0.05); // 5% tax
    const total = subtotal - discountAmt + tax;

    return {
      baseClean: base,
      addonsClean: addonsCost,
      subtotal,
      discount: discountAmt,
      tax,
      total: Math.max(25, total)
    };
  }, [bedrooms, bathrooms, serviceType, frequency, selectedAddons, promoApplied]);

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SEVZY5' || promoCode.trim().toUpperCase() === 'WELCOME15') {
      setPromoApplied(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid promo code. Try "WELCOME15"');
    }
  };

  const handleBookNow = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedDate) {
      setErrorMsg('Please select a cleaning date.');
      return;
    }
    if (!name || !email || !phone || !address) {
      setErrorMsg('Please complete all contact and address fields.');
      return;
    }

    // Create Booking object
    const newBooking: BookingDetails = {
      id: 'SEV-' + Math.floor(100000 + Math.random() * 900000),
      clientName: name,
      email,
      phone,
      address,
      notes,
      bedrooms,
      bathrooms,
      serviceType,
      frequency,
      addons: selectedAddons,
      date: selectedDate,
      timeSlot: selectedTime,
      basePrice: calculations.baseClean,
      addonPrice: calculations.addonsClean,
      discount: calculations.discount,
      fee: calculations.tax,
      finalPrice: calculations.total,
      status: 'pending',
      assignedMaidId: 'maid-' + (Math.floor(Math.random() * 3) + 1), // auto random assign
      createdAt: new Date().toISOString()
    };

    onBookingComplete(newBooking);
  };

  // Next week starting today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="booking-system-root">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-sm font-bold text-brand-pink uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          No contract. Cancel anytime.
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
          Design Your Perfect Clean
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Tell us about your home and unlock customized pricing instantly. No credit card required to view quotes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Selection Form (8 spans on desktop) */}
        <form onSubmit={handleBookNow} className="lg:col-span-7 xl:col-span-8 space-y-6" id="wizard-form">
          
          {/* Section 1: Home Layout Settings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="wizard-step-1">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm">1</span>
              Tell us about your home space
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bedroom Count Picker */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between" id="beds-counter-card">
                <div className="mb-3">
                  <h4 className="font-bold text-gray-800 text-base">Bedrooms</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Including guest and home offices</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                    className="w-11 h-11 bg-white hover:bg-brand-violet-light border border-gray-200 hover:border-brand-violet rounded-xl text-gray-700 hover:text-brand-violet flex items-center justify-center font-bold text-lg select-none shadow-sm transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-display text-xl font-bold text-gray-900">{bedrooms} Bed{bedrooms !== 1 && 's'}</span>
                  <button
                    type="button"
                    onClick={() => setBedrooms(Math.min(8, bedrooms + 1))}
                    className="w-11 h-11 bg-white hover:bg-brand-violet-light border border-gray-200 hover:border-brand-violet rounded-xl text-gray-700 hover:text-brand-violet flex items-center justify-center font-bold text-lg select-none shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bathroom Count Picker */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between" id="baths-counter-card">
                <div className="mb-3">
                  <h4 className="font-bold text-gray-800 text-base">Bathrooms</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Toilets, sink spaces, and showers</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                    className="w-11 h-11 bg-white hover:bg-brand-violet-light border border-gray-200 hover:border-brand-violet rounded-xl text-gray-700 hover:text-brand-violet flex items-center justify-center font-bold text-lg select-none shadow-sm transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-display text-xl font-bold text-gray-900">{bathrooms} Bath{bathrooms !== 1 && 's'}</span>
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.min(6, bathrooms + 1))}
                    className="w-11 h-11 bg-white hover:bg-brand-violet-light border border-gray-200 hover:border-brand-violet rounded-xl text-gray-700 hover:text-brand-violet flex items-center justify-center font-bold text-lg select-none shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Choose Service & Frequency */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl animate-fadeIn" id="wizard-step-2">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm">2</span>
              Choose Service Level & Frequency
            </h3>

            {/* Service Selection Row */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-3.5">Cleaning Package</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5" id="service-types-grid">
                {[
                  { id: 'standard', label: 'Standard Clean', badge: 'Popular', icon: '🧹' },
                  { id: 'deep', label: 'Deep Clean', badge: 'Thorough', icon: '✨' },
                  { id: 'move-in', label: 'Move In/Out', badge: 'Complete', icon: '📦' },
                  { id: 'airbnb', label: 'Airbnb Turn', badge: 'Fast Track', icon: '🔑' }
                ].map((serv) => (
                  <button
                    type="button"
                    key={serv.id}
                    onClick={() => setServiceType(serv.id as ServiceType)}
                    className={`relative p-4 rounded-2xl border text-left flex flex-col justify-between h-30 transition-all ${
                      serviceType === serv.id 
                        ? 'border-brand-violet bg-brand-violet-light/30 shadow-md ring-2 ring-brand-violet/20' 
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {serv.badge && (
                      <span className={`absolute top-2.5 right-2.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        serviceType === serv.id 
                          ? 'bg-brand-violet text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {serv.badge}
                      </span>
                    )}
                    <span className="text-2xl mt-1 select-none">{serv.icon}</span>
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900">{serv.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selector */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-3.5">How often should we visit?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3" id="frequency-selector">
                {[
                  { id: 'one-time', label: 'One Time', save: '' },
                  { id: 'weekly', label: 'Weekly', save: 'Save 20%' },
                  { id: 'bi-weekly', label: 'Bi-Weekly', save: 'Save 15%' },
                  { id: 'monthly', label: 'Monthly', save: 'Save 10%' }
                ].map((freq) => (
                  <button
                    type="button"
                    key={freq.id}
                    onClick={() => setFrequency(freq.id as BookingFrequency)}
                    className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                      frequency === freq.id
                        ? 'border-brand-pink bg-brand-pink/5 text-brand-pink shadow-sm ring-1 ring-brand-pink'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <span className={`text-[13px] font-bold ${frequency === freq.id ? 'text-brand-pink-dark' : 'text-gray-800'}`}>
                      {freq.label}
                    </span>
                    {freq.save && (
                      <span className="text-[10px] font-black tracking-wider text-green-600 bg-green-50 px-2 py-0.5 mt-1 rounded-md">
                        {freq.save}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Add-On Custom Tasks */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="wizard-step-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm">3</span>
                Select extra service tasks
              </h3>
              <span className="text-xs text-gray-400 font-medium">Click to select multiple</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5" id="addons-selector-grid">
              {SERVICE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    type="button"
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`relative p-4 rounded-2xl border text-left flex flex-col items-center text-center justify-between h-28 transform transition-all ${
                      isSelected 
                        ? 'border-brand-violet bg-brand-violet/5 ring-1 ring-brand-violet shadow-sm' 
                        : 'border-gray-50 bg-gray-50/50 hover:bg-gray-100/50 hover:border-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-brand-violet text-white p-1 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <span className="text-xl my-1 select-none">
                      {addon.id === 'fridge' ? '🧊' : 
                       addon.id === 'oven' ? '🔥' : 
                       addon.id === 'cabinets' ? '📁' : 
                       addon.id === 'windows' ? '🪟' : 
                       addon.id === 'laundry' ? '🧺' : 
                       addon.id === 'carpet' ? '✨' : 
                       addon.id === 'balcony' ? '🪴' : '🌿'}
                    </span>
                    <div className="text-center w-full">
                      <span className="block font-bold text-xs text-gray-900 leading-tight block mb-0.5">{addon.name}</span>
                      <span className="text-xs font-semibold text-brand-violet-dark">₹{addon.price}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Pick Date & Time */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="wizard-step-4">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm">4</span>
              Select cleaner arrival schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Input */}
              <div id="calendar-input-card">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-violet" />
                  Select Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white"
                />
                <p className="text-[11px] text-gray-400 mt-1">We clean 7 days a week, including major holidays.</p>
              </div>

              {/* Time Slots */}
              <div id="time-slots-card">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-violet" />
                  Select Arrival window
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { slot: '08:00 AM', label: 'Morning (8-11 AM)' },
                    { slot: '12:00 PM', label: 'Midday (12-3 PM)' },
                    { slot: '03:00 PM', label: 'Afternoon (3-6 PM)' },
                    { slot: '06:00 PM', label: 'Evening (6-9 PM)' }
                  ].map((time) => (
                    <button
                      type="button"
                      key={time.slot}
                      onClick={() => setSelectedTime(time.slot)}
                      className={`py-3 px-2 text-center rounded-xl border text-xs font-bold transition-all ${
                        selectedTime === time.slot
                          ? 'border-brand-violet bg-brand-violet/5 text-brand-violet shadow-sm ring-1 ring-brand-violet'
                          : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Secure Personal Credentials details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="wizard-step-5">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand-violet-light text-brand-violet flex items-center justify-center font-black text-sm">5</span>
              Contact Info & Service Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div id="input-group-name">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-violet" />
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Green"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white text-gray-800"
                />
              </div>

              {/* Email Address */}
              <div id="input-group-email">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-violet" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. rachel@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white text-gray-800"
                />
              </div>

              {/* Phone Num */}
              <div id="input-group-phone">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-brand-violet" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white text-gray-800"
                />
              </div>

              {/* Service Address */}
              <div id="input-group-address">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-violet" />
                  Cleaning Street Address
                </label>
                <input
                  type="text"
                  placeholder="Street Address, Apt / Suite #"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white text-gray-800"
                />
              </div>

              {/* Specific Instructions */}
              <div className="md:col-span-2" id="input-group-instructions">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-1.5">
                  <Pencil className="w-4 h-4 text-brand-violet" />
                  Entrance Access & Special Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Let us know about key codes, parking guidelines, sensitive areas, or specific dog/cat care instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet focus:bg-white text-gray-800"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Dynamic Interactive checkout sidebar (5 spans on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6" id="checkout-receipt-panel">
          <div className="bg-white border-2 border-brand-violet/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Header decor band */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-violet to-brand-pink" />

            <h3 className="font-display text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <span>Booking Summary</span>
              <span className="text-xs bg-brand-violet-light text-brand-violet px-2.5 py-0.5 rounded-full font-extrabold font-display">Quote</span>
            </h3>

            {/* Layout Overview */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3" id="summary-layout-row">
                <span className="text-gray-500 font-medium">Home Layout</span>
                <span className="font-bold text-gray-800">
                  {bedrooms} Bed{bedrooms !== 1 && 's'} / {bathrooms} Bath{bathrooms !== 1 && 's'}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3" id="summary-package-row">
                <span className="text-gray-500 font-medium">Package Tier</span>
                <span className="font-bold text-brand-violet uppercase text-xs tracking-wider bg-brand-violet-light px-2.5 py-1 rounded-lg">
                  {serviceType === 'standard' ? 'Standard Clean' : 
                   serviceType === 'deep' ? 'Deep Scrub' : 
                   serviceType === 'move-in' ? 'Move-In / Out' : 'Airbnb Tour'}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3" id="summary-frequency-row">
                <span className="text-gray-500 font-medium">Frequency</span>
                <span className="font-bold text-gray-800">
                  {frequency === 'one-time' ? 'One-time clean' : 
                   frequency === 'weekly' ? 'Weekly (20% Off)' :
                   frequency === 'bi-weekly' ? 'Bi-weekly (15% Off)' : 'Monthly (10% Off)'}
                </span>
              </div>

              {selectedDate && (
                <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3" id="summary-arrival-row">
                  <span className="text-gray-500 font-medium">Scheduled</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1 text-xs">
                    <span>{selectedDate}</span>
                    <span>@</span>
                    <span className="text-brand-pink-dark font-black">{selectedTime}</span>
                  </span>
                </div>
              )}

              {/* Addon Pills */}
              {selectedAddons.length > 0 && (
                <div className="py-2 border-b border-gray-50" id="summary-addons-section">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">Selected Addons</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAddons.map(id => {
                      const ad = SERVICE_ADDONS.find(a => a.id === id);
                      return ad ? (
                        <span key={id} className="text-[10px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                          + {ad.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Receipt Price Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-4.5 space-y-3 mb-6 font-medium text-sm" id="checkout-receipt-calculations">
              <div className="flex justify-between text-gray-600">
                <span>Base clean quote</span>
                <span>₹{calculations.baseClean}</span>
              </div>
              
              {calculations.addonsClean > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Selected Addons</span>
                  <span>+₹{calculations.addonsClean}</span>
                </div>
              )}

              {calculations.discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span className="flex items-center gap-1">
                    <TicketPercent className="w-4 h-4" />
                    Special Discounts
                  </span>
                  <span>-₹{calculations.discount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500 text-xs">
                <span>Tax & Service Fees (5%)</span>
                <span>+₹{calculations.tax}</span>
              </div>

              <div className="border-t border-gray-200/60 my-2 pt-3 flex justify-between text-lg font-extrabold text-gray-900" id="checkout-receipt-total">
                <span className="font-display">Total Cost</span>
                <span className="font-display bg-gradient-to-r from-brand-violet to-brand-pink bg-clip-text text-transparent text-2xl font-black">
                  ₹{calculations.total}
                </span>
              </div>
            </div>

            {/* Promo input field */}
            <div className="mb-6 flex gap-2" id="promo-field-container">
              <input
                type="text"
                placeholder="PROMO CODE (WELOMCE15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 uppercase tracking-widest text-[11px] font-extrabold text-center rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-violet text-gray-800"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 rounded-xl transition-all"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <div className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-xl border border-green-200 text-center font-bold mb-4">
                🎉 Congratulations! Promo code applied: ₹15 off!
              </div>
            )}

            {/* Error notifications */}
            {errorMsg && (
              <div className="text-xs bg-red-50 text-red-600 font-bold border border-red-200 p-3 rounded-xl mb-4">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Core Action Button */}
            <button
              id="submit-booking-action"
              onClick={handleBookNow}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-pink hover:from-brand-violet-dark hover:to-brand-pink-dark text-white font-extrabold text-base shadow-xl shadow-brand-violet/20 hover:shadow-brand-violet/35 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Confirm & Lock In Price</span>
            </button>

            <span className="block text-[10px] text-gray-400 text-center font-bold uppercase tracking-wider mt-4">
              🛡️ 100% Satisfaction Guranteed or Free Reclean
            </span>
          </div>

          {/* Sizing indicators card */}
          <div className="bg-gradient-to-tr from-brand-violet-light to-white rounded-3xl p-6 border border-brand-violet/5 flex items-center gap-4">
            <span className="text-2xl select-none">🌟</span>
            <div>
              <h4 className="font-bold text-sm text-brand-violet-dark">Same-Day Cleaner Guarantee</h4>
              <p className="text-xs text-gray-500 mt-1">Our certified team handles short-notice visits without peak surge pricing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
