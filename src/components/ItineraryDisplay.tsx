import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Wallet, Activity as ActivityIcon } from 'lucide-react';
import type { ItineraryResponse, Activity } from '../types';
import ActivityCard from './ActivityCard';

interface ItineraryDisplayProps {
  data: ItineraryResponse;
}

export default function ItineraryDisplay({ data }: ItineraryDisplayProps) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [visitedActivities, setVisitedActivities] = useState<Record<string, boolean>>({});

  const handleToggleVisited = (dayIndex: number, activityIndex: number) => {
    const key = `${dayIndex}-${activityIndex}`;
    setVisitedActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeDay = data.days[activeDayIdx];

  const handleCopy = () => {
    let text = `Mon itinéraire : \n\n`;
    data.days.forEach(day => {
      text += `${day.dayTitle}\n`;
      day.activities.forEach(act => {
        text += `- ${act.time} : ${act.title} (${act.durationStr}) - ${act.price}\n`;
      });
      text += `\n`;
    });
    navigator.clipboard.writeText(text);
    alert('Itinéraire copié dans le presse-papier !');
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-24">
      {/* Summary Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white rounded-2xl p-6 shadow-sm border border-[#EBEAE4] mb-8">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#A3A398] tracking-widest flex items-center gap-1.5"><Wallet size={16} /> Budget Total</span>
            <span className="text-xl font-bold text-[#4A4A40]">{data.budgetEstimation}</span>
          </div>
          <div className="w-px h-12 bg-[#EBEAE4]" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#A3A398] tracking-widest flex items-center gap-1.5"><ActivityIcon size={16} /> Rythme</span>
            <span className="text-xl font-bold text-[#D4A373]">{data.pace}</span>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 bg-[#5A5A40] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-[#4A4A30] transition-colors"
        >
          <Copy size={18} />
          Exporter l'itinéraire
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto mb-6 scrollbar-hide border-b border-[#EBEAE4]">
        {data.days.map((day, idx) => (
          <button
            key={day.dayTitle}
            onClick={() => setActiveDayIdx(idx)}
            className={`whitespace-nowrap pb-4 text-sm transition-all ${
              activeDayIdx === idx
                ? 'font-semibold border-b-2 border-[#D4A373] text-[#2D2D2A]'
                : 'font-medium text-[#A3A398] hover:text-[#4A4A40]'
            }`}
          >
            {day.dayTitle}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      <div className="relative">
        {/* Vertical Line */}
        <div 
          className="absolute left-8 md:left-[28px] top-6 bottom-6 w-px bg-dashed bg-[#D4A373]/30 hidden md:block" 
          style={{ backgroundImage: 'linear-gradient(to bottom, #D4A373 50%, transparent 50%)', backgroundSize: '1px 12px' }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 relative z-10"
          >
            {activeDay.activities.map((activity, idx) => {
              const key = `${activeDayIdx}-${idx}`;
              const isVisited = visitedActivities[key] || false;
              return (
                <div key={idx} className="relative">
                  <div className="md:pl-[84px]">
                    <ActivityCard
                      activity={{ ...activity, visited: isVisited }}
                      index={idx}
                      onToggleVisited={() => handleToggleVisited(activeDayIdx, idx)}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
