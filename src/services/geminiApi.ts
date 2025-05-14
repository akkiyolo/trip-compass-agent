
import { toast } from "@/components/ui/use-toast";
import { TravelFormData } from "@/types/travel";

export interface TravelPlan {
  itinerary: string;
  recommendations: {
    places: string[];
    accommodations: string[];
    activities: string[];
    restaurants: string[];
    transportationTips: string[];
  };
  budget: {
    breakdown: string;
    estimatedTotal: string;
  };
  travelTips: string[];
}

export async function generateTravelPlan(formData: TravelFormData): Promise<TravelPlan> {
  try {
    // In a real implementation, this would be an actual API call to Gemini
    // For this demo, we'll simulate a response after a delay
    const prompt = `
      I need a detailed travel plan with the following parameters:
      - Traveling from: ${formData.source}
      - Destination: ${formData.destination}
      - Travel dates: ${formData.startDate} to ${formData.endDate}
      - Budget: ${formData.budget}
      - Number of travelers: ${formData.travelers}
      - Interests: ${formData.interests.join(", ")}
      
      Please provide:
      1. A day-by-day itinerary
      2. Recommended places to visit, accommodations, activities, and restaurants
      3. Budget breakdown
      4. Travel tips specific to the destination
    `;

    // Log the prompt for debugging purposes
    console.log("Sending prompt to Gemini:", prompt);
    
    // In a real implementation, this would call the Gemini API
    // For now we'll simulate a response after a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Placeholder response - in reality, this would come from the Gemini API
    const mockResponse: TravelPlan = {
      itinerary: `Day 1: Arrive in ${formData.destination}, check into hotel, explore nearby areas\nDay 2: Visit top attractions in the morning, local food tour in the evening\nDay 3: Day trip to surrounding areas`,
      recommendations: {
        places: ["Central Park", "Main Museum", "Historic District"],
        accommodations: ["Luxury Hotel", "Budget-friendly Inn", "Local Guesthouse"],
        activities: ["Guided Walking Tour", "Cooking Class", "Sunset Cruise"],
        restaurants: ["Local Cuisine Restaurant", "Seafood Bistro", "Street Food Market"],
        transportationTips: ["Use public transit for city center", "Rent a car for day trips", "Walking is best for the historic district"]
      },
      budget: {
        breakdown: "Accommodation: 40%, Food: 30%, Activities: 20%, Transportation: 10%",
        estimatedTotal: "Estimated total for your stay: $1,500"
      },
      travelTips: [
        "Book accommodations in advance",
        "Learn a few basic phrases in the local language",
        "Check the weather forecast before packing"
      ]
    };

    return mockResponse;
    
  } catch (error) {
    console.error("Error generating travel plan:", error);
    toast({
      title: "Error",
      description: "Failed to generate travel plan. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
}
