import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl" id="before-after-module">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <span className="text-sm font-bold text-brand-pink uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Spotless Results
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            See the Sevzy Difference
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Drag the divider to view the before (dirty) & after (perfectly sanitized) spaces.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <span className="px-3.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider">Before</span>
          <span className="px-3.5 py-1.5 bg-brand-violet-light text-brand-violet rounded-lg text-xs font-bold uppercase tracking-wider">Sevzy After</span>
        </div>
      </div>

      {/* Slider Stage */}
      <div 
        ref={containerRef}
        className="relative h-[240px] sm:h-[400px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border-4 border-white shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        id="before-after-canvas-container"
      >
        {/* After Image (Full background) */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200&h=700" 
            alt="Spotless clean modern kitchen after cleaning" 
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-brand-violet text-white font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            After Sevzy
          </div>
        </div>

        {/* Before Image (Left clipped div overlay) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[100vw] h-full">
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200&h=700" 
              alt="Kitchen before cleaning with dirt effect" 
              className="w-full h-full object-cover filter grayscale contrast-125 sepia hover:filter-none brightness-75 pointer-events-none"
              style={{ width: containerRef.current?.getBoundingClientRect().width }}
              referrerPolicy="no-referrer"
            />
            {/* Added dirt particles overlays */}
            <div className="absolute inset-0 bg-yellow-950/20 mix-blend-color-burn" />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            <div className="absolute top-4 left-4 bg-gray-900/80 text-white font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Before Clean
            </div>
          </div>
        </div>

        {/* Floating slider bar divider line */}
        <div 
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-violet to-brand-pink text-white flex items-center justify-center shadow-xl border-2 border-white transform -translate-x-1/2 select-none">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
