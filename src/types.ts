export interface Activity {
  time: string;
  title: string;
  description: string;
  imageUrl: string;
  durationStr: string;
  price: string;
  insiderTip: string;
  visited?: boolean;
}

export interface DayItinerary {
  dayTitle: string;
  activities: Activity[];
}

export interface ItineraryResponse {
  budgetEstimation: string;
  pace: string;
  days: DayItinerary[];
}
