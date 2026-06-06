import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Sparkles, Wand2, Shield, CalendarDays } from 'lucide-react';

interface ChatbotProps {
  onOpenBooking: (beds?: number) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
  suggestions?: { text: string; action: () => void }[];
}

export default function Chatbot({ onOpenBooking }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages on toggle
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: 'Hello! 🧹 Welcome to Sevzy Home Services support board. I am your automated AI clean planner. How can I help you sanitize your house space today?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            { text: 'Calculate Price Quote 💰', action: () => handleSelectPreset('calculator') },
            { text: 'Standard vs Deep Clean ✨', action: () => handleSelectPreset('comparison') },
            { text: 'Are your maids insured? 🛡️', action: () => handleSelectPreset('insurance') },
            { text: 'Check same-day slots 📅', action: () => handleSelectPreset('slots') }
          ]
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messaging updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectPreset = (key: string) => {
    let userText = '';
    let responseText = '';
    let inlineSuggestions: { text: string; action: () => void }[] = [];

    if (key === 'calculator') {
      userText = 'How much does it cost to clean my house?';
      responseText = 'Our pricing depends entirely on bedrooms and bathrooms! Standard cleans start at just **₹90** (which covers 1 bed and 1 bath). Every extra bedrooms adds ₹20, and bathrooms are ₹15. Frequent regular cleans enjoy fantastic discounts: **Weekly gets 20% off**! \n\nClick the button below to load our pricing engine directly!';
      inlineSuggestions = [
        { text: 'Open Pricing Wizard Now 🎯', action: () => { onOpenBooking(); setIsOpen(false); } }
      ];
    } else if (key === 'comparison') {
      userText = 'What is the exact difference between Standard and Deep clean?';
      responseText = 'Great question! \n- **Standard Clean**: Everyday dust dusting, carpet vacuuming, mop scrubbing, kitchen sink sanitization, toilet scrub, and general bed sheets making.\n- **Deep Clean**: Intended for homes that haven\'t been professionally scrubbed in 2+ months. Includes intense lime scale removal in bathrooms, wall vents, dust tile grout lines, deep wall baseboards wiping, and light fixtures sanitizations.';
    } else if (key === 'insurance') {
      userText = 'Are your staff background-checked and insured?';
      responseText = 'Absolutely. Guest safety is our #1 priority. Every single professional undergoes an rigorous background screening, sex-offender registry check, and technical test. Sevzy maintains a **₹2,000,000 active liability insurance protection** so you are 100% protected on physical damage.';
    } else if (key === 'slots') {
      userText = 'Do you support short notice / same-day slots?';
      responseText = 'Yes, we do! Our scheduling engine supports automated matching up to 3 hours notice. Morning slots (starts 8:00 AM) are highly popular, but our Late Afternoon slots still have availability for this week.';
    }

    // Append user message
    const userMsg: Message = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: inlineSuggestions
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue;
    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse = 'I heard you! For more comprehensive account answers, scheduling setups or custom discount quotes, please click the "Instant Quote" wizard or connect with our support line at +1 (800) 555-SEVZY.';
      const queryLower = query.toLowerCase();

      if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('quote') || queryLower.includes('how much')) {
        botResponse = 'Pricing starts from **₹90** for basic configurations. You can toggle bedrooms, bathrooms, and additional add-ons (inside fridge, inside stove cabinets, wash laundry) of our booking calculator, and see final prices in real time! Weekly bookings receive a whopping 20% discount.';
      } else if (queryLower.includes('deep') || queryLower.includes('move')) {
        botResponse = 'Our deeper services cover intense hand-scrubbing, baseboards polish, and tile grout restorations. It is highly recommended to select either "Deep Clean" or "Move In/Out" on step 2 of our Booking form if moving or hosting and want flawless results.';
      } else if (queryLower.includes('insure') || queryLower.includes('safe') || queryLower.includes('vetted')) {
        botResponse = 'We guarantee absolute security: all maids are certified, background-checked, and protected under a secure ₹2M liability indemnity. If any accidental damage occurs, we cover 100% of rehabilitation.';
      } else if (queryLower.includes('code') || queryLower.includes('promo') || queryLower.includes('discount')) {
        botResponse = 'Try applying code **"WELCOME15"** inside the checkout receipts column to get an extra flat ₹15 off on your maiden cleaning!';
      }

      const botMsg: Message = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-chatbot-root">
      
      {/* Expanded Chat Room view */}
      {isOpen ? (
        <div className="bg-white rounded-3xl w-[350px] sm:w-[400px] h-[520px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slideUp mb-4" id="chat-stage-wrapper">
          
          {/* Chat Header banner */}
          <div className="bg-gradient-to-r from-brand-violet to-brand-pink p-5 text-white flex justify-between items-center relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl text-white">
                <Wand2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm leading-tight">Sevzy AI Consultant</h4>
                <p className="text-[10px] text-pink-100 font-bold block mt-0.5">Automated Price & Info Desk</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-white hover:bg-white/10 rounded-lg transition-all"
              id="close-chat-widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trust strip info label */}
          <div className="bg-brand-violet-light/60 px-4 py-2 text-[10px] text-brand-violet-dark font-bold flex items-center gap-1.5 border-b border-brand-violet/5">
            <Shield className="w-3.5 h-3.5" />
            <span>Guaranteed Secure, Private, and Non-Spammy assistance</span>
          </div>

          {/* Chat body messaging track */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40" id="chat-messages-track">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 text-xs font-semibold max-w-[85%] leading-relaxed shadow-sm rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-brand-violet text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Conditional custom action suggestion buttons in chatbot */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                    {msg.suggestions.map((sug, sidx) => (
                      <button
                        key={sidx}
                        type="button"
                        onClick={sug.action}
                        className="bg-white hover:bg-brand-violet-light/50 text-brand-violet hover:text-brand-violet-dark border border-brand-violet/10 hover:border-brand-violet/30 text-[10px] font-bold px-3 py-2 rounded-xl transition-all shadow-sm select-none"
                      >
                        {sug.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 bg-white border border-gray-50 p-3 rounded-2xl max-w-[80px]" id="typing-indicator">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Static buttons helper fast access */}
          <div className="px-4 py-2 bg-white border-t border-gray-50 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none" id="chat-quickposts">
            <button 
              onClick={() => handleSelectPreset('calculator')}
              className="text-[9px] font-black tracking-wide text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
            >
              💰 Get Price Quote
            </button>
            <button 
              onClick={() => handleSelectPreset('comparison')}
              className="text-[9px] font-black tracking-wide text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
            >
              ✨ Deep vs Standard
            </button>
            <button 
              onClick={() => handleSelectPreset('insurance')}
              className="text-[9px] font-black tracking-wide text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
            >
              🛡️ Liability & Security
            </button>
          </div>

          {/* Footer Input form bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2" id="chat-directinput">
            <input
              type="text"
              placeholder="Ask anything (fees, cleaner background...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-violet text-gray-800"
            />
            <button
              type="submit"
              className="bg-brand-violet hover:bg-brand-violet-dark text-white p-3 rounded-xl transition-all shadow-md shadow-brand-violet/10 hover:shadow-brand-violet/25"
              id="send-chat-submit"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : null}

      {/* Circle Floating Chat toggle button widget */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-tr from-brand-violet to-brand-pink text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-brand-violet/30 hover:shadow-brand-violet/50 transform hover:scale-105 transition-all outline-none border-2 border-white select-none cursor-pointer"
        id="toggle-chatbot-bubble"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-pulse" />}
      </button>
    </div>
  );
}
