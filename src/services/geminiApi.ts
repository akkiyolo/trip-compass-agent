
import { toast } from "@/components/ui/use-toast";
import { TravelFormData, FlightDetails } from "@/types/travel";
import { getFlightDetails } from "@/services/flightApi";

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
  flightDetails?: FlightDetails;
}

const GEMINI_API_KEY = "AIzaSyAgckSiXT8GYUfJeoZu16NDud6wKiUiS4Y";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export async function generateTravelPlan(formData: TravelFormData): Promise<TravelPlan> {
  try {
    const prompt = `
      I need a detailed travel plan with the following parameters:
      - Traveling from: ${formData.source}
      - Destination: ${formData.destination}
      - Travel dates: ${formData.startDate} to ${formData.endDate}
      - Budget: ${formData.budget}
      - Number of travelers: ${formData.travelers}
      - Interests: ${formData.interests.join(", ")}
      
      Please provide your response in the following JSON format exactly, with no additional text or explanations:
      {
        "itinerary": "Day 1: ... Day 2: ... etc.",
        "recommendations": {
          "places": ["Place 1", "Place 2", "Place 3"],
          "accommodations": ["Accommodation 1", "Accommodation 2", "Accommodation 3"],
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "restaurants": ["Restaurant 1", "Restaurant 2", "Restaurant 3"],
          "transportationTips": ["Tip 1", "Tip 2", "Tip 3"]
        },
        "budget": {
          "breakdown": "Accommodation: X%, Food: Y%, Activities: Z%, Transportation: W%",
          "estimatedTotal": "Estimated total for your stay: $XXXX"
        },
        "travelTips": ["Tip 1", "Tip 2", "Tip 3"]
      }
    `;

    console.log("Sending prompt to Gemini:", prompt);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Gemini API response:", responseData);

    // Extract the text from the response
    const generatedText = responseData.candidates[0].content.parts[0].text;
    
    // Parse the JSON from the text
    try {
      // Extract the JSON part from the response text
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : generatedText;
      const travelPlan: TravelPlan = JSON.parse(jsonStr);
      
      // Validate that the parsed object has the expected structure
      if (!travelPlan.itinerary || !travelPlan.recommendations || !travelPlan.budget || !travelPlan.travelTips) {
        throw new Error("Gemini response is missing required fields");
      }

      // If transportation details were requested, fetch flight details
      if (formData.includeTransportation) {
        try {
          const flightDetails = await getFlightDetails();
          travelPlan.flightDetails = flightDetails;
        } catch (flightError) {
          console.error("Error fetching flight details:", flightError);
          toast({
            title: "Warning",
            description: "Couldn't fetch flight details. Travel plan was generated without them.",
            variant: "destructive"
          });
        }
      }
      
      return travelPlan;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response text:", generatedText);
      
      // Fall back to the mock response if parsing fails
      toast({
        title: "Warning",
        description: "Couldn't parse AI response. Using fallback travel plan.",
        variant: "destructive"
      });
      
      const fallbackPlan = createFallbackTravelPlan(formData);
      
      // If transportation details were requested, fetch flight details
      if (formData.includeTransportation) {
        try {
          const flightDetails = await getFlightDetails();
          fallbackPlan.flightDetails = flightDetails;
        } catch (flightError) {
          console.error("Error fetching flight details:", flightError);
        }
      }
      
      return fallbackPlan;
    }
    
  } catch (error) {
    console.error("Error generating travel plan:", error);
    toast({
      title: "Error",
      description: "Failed to generate travel plan. Please try again.",
      variant: "destructive"
    });
    
    // In case of API failure, return a fallback plan
    const fallbackPlan = createFallbackTravelPlan(formData);
    
    // If transportation details were requested, fetch flight details
    if (formData.includeTransportation) {
      try {
        const flightDetails = await getFlightDetails();
        fallbackPlan.flightDetails = flightDetails;
      } catch (flightError) {
        console.error("Error fetching flight details:", flightError);
      }
    }
    
    return fallbackPlan;
  }
}

// Fallback function to provide a mock response if the API fails
function createFallbackTravelPlan(formData: TravelFormData): TravelPlan {
  return {
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
}
