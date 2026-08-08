import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Compass, Wallet, Sparkles } from 'lucide-react';

interface SelectionFormProps {
  onGenerate: (data: any) => void;
  isLoading: boolean;
}

const QUICK_DESTINATIONS = [
  { label: 'Paris', emoji: '🇫🇷' },
  { label: 'Tokyo', emoji: '🇯🇵' },
  { label: 'Rome', emoji: '🇮🇹' },
  { label: 'New York', emoji: '🇺🇸' },
];

const DURATIONS = ['1 jour', '2 jours', '3 jours'];
const MOODS = [
  { id: 'culturel', label: 'Culturel', emoji: '🏛️' },
  { id: 'gourmand', label: 'Gourmand', emoji: '🍔' },
  { id: 'festif', label: 'Festif', emoji: '🎉' },
  { id: 'detente', label: 'Détente', emoji: '🌿' },
];
const BUDGETS = [
  { id: 'eco', label: 'Éco', symbol: '€' },
  { id: 'modere', label: 'Modéré', symbol: '€€' },
  { id: 'luxe', label: 'Luxe', symbol: '€€€' },
];

export default function SelectionForm({ onGenerate, isLoading }: SelectionFormProps) {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('2 jours');
  const [mood, setMood] = useState('Culturel');
  const [budget, setBudget] = useState('Modéré');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    onGenerate({ destination, duration, mood, budget });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel rounded-3xl p-6 md:p-8 max-w-4xl mx-auto w-full relative z-10"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Destination */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#A3A398] uppercase tracking-wider">
            <MapPin size={18} className="text-[#D4A373]" />
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Où voulez-vous aller ?"
              className="w-full text-lg px-4 py-3 rounded-xl border border-[#E5E5DF] bg-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#D4A373] transition-all placeholder:text-[#A3A398]"
              required
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_DESTINATIONS.map((dest) => (
              <button
                key={dest.label}
                type="button"
                onClick={() => setDestination(dest.label)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors shadow-sm ${
                  destination === dest.label
                    ? 'bg-[#FAEDCD] border-[#D4A373] text-[#2D2D2A]'
                    : 'bg-white border-[#E5E5DF] text-[#2D2D2A] hover:border-[#D4A373]'
                }`}
              >
                {dest.emoji} {dest.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Duration */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#A3A398] uppercase tracking-wider">
              <Calendar size={18} className="text-[#D4A373]" />
              Durée
            </label>
            <div className="flex flex-wrap gap-2 bg-[#F5F5F0] p-1 rounded-xl">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    duration === d 
                      ? 'bg-white text-[#2D2D2A] shadow-sm' 
                      : 'text-[#8B8B80] hover:bg-white/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#A3A398] uppercase tracking-wider">
              <Compass size={18} className="text-[#D4A373]" />
              Ambiance
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.label)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-2 border ${
                    mood === m.label 
                      ? 'bg-[#FAEDCD] border-[#D4A373] text-[#2D2D2A]' 
                      : 'bg-[#F5F5F0] border-transparent text-[#2D2D2A] hover:border-[#D4A373]'
                  }`}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#A3A398] uppercase tracking-wider">
              <Wallet size={18} className="text-[#D4A373]" />
              Budget
            </label>
            <div className="flex w-full bg-[#F5F5F0] rounded-xl p-1 border border-[#E5E5DF]">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.label)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    budget === b.label
                      ? 'bg-white text-[#D4A373] shadow-sm'
                      : 'text-[#8B8B80] hover:text-[#2D2D2A]'
                  }`}
                >
                  {b.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
            <button
            type="submit"
            disabled={isLoading || !destination}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#BFA081] text-white font-bold text-lg py-4 shadow-lg shadow-[#D4A373]/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération en cours...
                </>
              ) : (
                <>
                  Générer mon itinéraire <Sparkles size={20} />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
