import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { SERVICE_FAQS } from '../data/mockData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="faq-module-panel">
      <div className="text-center max-w-lg mx-auto mb-8">
        <span className="text-xs font-bold text-brand-pink uppercase tracking-widest flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          Common Inquiries
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
          Frequently Answered Questions
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Got questions about our services, safety, or guarantees? We have provided answers to all the basics below.
        </p>
      </div>

      <div className="space-y-4" id="faq-accordion-list">
        {SERVICE_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border rounded-2xl transition-all overflow-hidden ${
                isOpen 
                  ? 'border-brand-violet/20 bg-brand-violet-light/10 shadow-sm' 
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/30'
              }`}
              id={`faq-accordion-item-${index}`}
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className="w-full px-5 py-4.5 flex justify-between items-center text-left cursor-pointer group"
              >
                <span className={`font-bold text-sm sm:text-base transition-colors ${
                  isOpen ? 'text-brand-violet-dark' : 'text-gray-800 group-hover:text-brand-violet'
                }`}>
                  {faq.question}
                </span>
                <div className={`p-1.5 rounded-xl transition-all ${
                  isOpen 
                    ? 'bg-brand-violet text-white rotate-180' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-brand-violet/5 animate-fadeIn" id={`faq-accordion-answer-${index}`}>
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                  
                  {index === 4 && (
                    <div className="mt-4 p-3.5 bg-brand-violet-light/40 border border-brand-violet/10 rounded-xl flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-brand-violet" />
                      <span className="text-[11px] font-bold text-brand-violet-dark">
                        Pronto Promise Guarantee is backed fully by our 100% customer insurance shield.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
