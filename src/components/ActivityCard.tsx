import { Clock, MapPin, Banknote, Lightbulb, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onToggleVisited: () => void;
  index: number;
}

export default function ActivityCard({ activity, onToggleVisited, index }: ActivityCardProps) {
  // Using a reliable placeholder image service
  const query = encodeURIComponent(activity.imageUrl.replace(/\s+/g, ','));
  const imageUrl = `https://loremflickr.com/800/600/${query}?random=${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass-card rounded-2xl overflow-hidden relative flex flex-col md:flex-row gap-4 p-4 ${activity.visited ? 'opacity-70 grayscale-[30%]' : ''}`}
    >
      {/* Time column */}
      <div className="flex-none md:w-24 flex items-center md:items-start md:justify-center pt-2 md:absolute md:-left-20 md:top-1/2 md:-translate-y-1/2 z-10">
        <div className="w-12 h-12 rounded-full bg-white border-2 border-[#D4A373] flex items-center justify-center font-bold text-[#D4A373] shadow-sm shrink-0">
          {activity.time.replace(':', 'h')}
        </div>
      </div>

      {/* Image */}
      <div className="flex-none w-full md:w-48 h-40 rounded-xl overflow-hidden relative">
        <img src={imageUrl} alt={activity.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-xl font-bold text-[#4A4A40] ${activity.visited ? 'line-through text-[#8B8B80]' : ''}`}>
              {activity.title}
            </h3>
            <button 
              onClick={onToggleVisited}
              className={`p-1.5 rounded-full transition-colors ${activity.visited ? 'text-[#5A5A40] bg-[#FAEDCD]' : 'text-[#E5E5DF] hover:text-[#5A5A40] hover:bg-[#FAEDCD]'}`}
              title={activity.visited ? 'Marquer comme non visité' : 'Marquer comme visité'}
            >
              <CheckCircle2 size={24} className={activity.visited ? 'fill-current' : ''} />
            </button>
          </div>
          <p className="text-[#8B8B80] text-xs mb-4 line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-[#A3A398]">
          <div className="flex items-center gap-1.5">
            <span>⏱️ {activity.durationStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>💰 {activity.price}</span>
          </div>
        </div>
      </div>

      {/* Insider Tip */}
      <div className="w-full md:w-64 bg-[#F5F5F0] border-l-4 border-[#D4A373] rounded-lg p-3 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-2 text-[#4A4A40] font-bold text-[10px] uppercase tracking-wider">
          💡 Insider Tip
        </div>
        <p className="text-[#8B8B80] text-[10px] italic leading-relaxed">
          {activity.insiderTip}
        </p>
      </div>

    </motion.div>
  );
}
