
export interface TravelFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
  includeTransportation?: boolean; // New optional field
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

// Define the flight API types
export interface FlightDetails {
  best_flights: BestFlight[];
}

export interface BestFlight {
  flights: Flight[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  booking_token: string;
}

export interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: string[];
  overnight?: boolean;
  often_delayed_by_over_30_min?: boolean;
}

export interface Airport {
  name: string;
  id: string;
  time: string;
}

export interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

export interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}
