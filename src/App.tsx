import { useState } from 'react';
import Hero from './components/Hero';
import SelectionForm from './components/SelectionForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import type { ItineraryResponse } from './types';

export default function App() {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: { destination: string; duration: string; mood: string; budget: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'itinéraire');
      }

      const result = await response.json();
      setItinerary(result);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <main className="container mx-auto px-4 pt-12">
        <Hero />
        
        <div className="mt-8">
          <SelectionForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
            {error}
          </div>
        )}

        {itinerary && !isLoading && (
          <ItineraryDisplay data={itinerary} />
        )}
      </main>
    </div>
  );
}
