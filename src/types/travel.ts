
export interface TravelFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
}

export const interestOptions = [
  { value: "nature", label: "Nature" },
  { value: "history", label: "History" },
  { value: "culture", label: "Culture" },
  { value: "food", label: "Food & Cuisine" },
  { value: "adventure", label: "Adventure" },
  { value: "relaxation", label: "Relaxation" },
  { value: "shopping", label: "Shopping" },
  { value: "nightlife", label: "Nightlife" },
  { value: "art", label: "Art & Museums" },
  { value: "sports", label: "Sports" }
];

export const budgetOptions = [
  { value: "budget", label: "Budget" },
  { value: "moderate", label: "Moderate" },
  { value: "luxury", label: "Luxury" }
];
