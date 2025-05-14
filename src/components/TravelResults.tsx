
import React from "react";
import { TravelPlan } from "@/services/geminiApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Calendar, DollarSign, Route, Compass, Hotel, Plane, Car, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TravelResultsProps {
  travelPlan: TravelPlan;
  formData: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: number;
    interests: string[];
  };
  onReset: () => void;
}

export const TravelResults: React.FC<TravelResultsProps> = ({
  travelPlan,
  formData,
  onReset,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="w-full max-w-4xl">
      <Card className="mb-6 overflow-hidden border-2 border-travel-light shadow-lg">
        <div className="bg-travel-primary text-white py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Your Travel Plan</h2>
              <p className="text-white/80">
                {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
              </p>
            </div>
            <Button variant="secondary" onClick={onReset}>
              Plan New Trip
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-travel-muted rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-travel-primary" />
              <span className="text-sm font-medium">From: <span className="font-bold">{formData.source}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-travel-secondary" />
              <span className="text-sm font-medium">To: <span className="font-bold">{formData.destination}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-travel-primary" />
              <span className="text-sm font-medium">{formData.travelers} traveler{formData.travelers > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-travel-secondary" />
              <span className="text-sm font-medium">{formData.budget} budget</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-travel-primary" />
              Itinerary
            </h3>
            <div className="bg-white p-4 rounded-lg border">
              {travelPlan.itinerary.split('\n').map((day, i) => (
                <div key={i} className="mb-2 last:mb-0 pb-2 last:pb-0 border-b last:border-0">
                  {day}
                </div>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="recommendations">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
                <Compass className="h-5 w-5 text-travel-primary" />
                Recommendations
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-travel-light p-3">
                      <CardTitle className="text-sm font-semibold">Places to Visit</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <ul className="list-disc pl-5">
                        {travelPlan.recommendations.places.map((place, i) => (
                          <li key={i} className="mb-1">{place}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-travel-light p-3">
                      <CardTitle className="text-sm font-semibold">Accommodations</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <ul className="list-disc pl-5">
                        {travelPlan.recommendations.accommodations.map((acc, i) => (
                          <li key={i} className="mb-1">{acc}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-travel-light p-3">
                      <CardTitle className="text-sm font-semibold">Activities</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <ul className="list-disc pl-5">
                        {travelPlan.recommendations.activities.map((activity, i) => (
                          <li key={i} className="mb-1">{activity}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-travel-light p-3">
                      <CardTitle className="text-sm font-semibold">Restaurants</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <ul className="list-disc pl-5">
                        {travelPlan.recommendations.restaurants.map((restaurant, i) => (
                          <li key={i} className="mb-1">{restaurant}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="budget">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-travel-secondary" />
                Budget Breakdown
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 bg-travel-muted rounded-lg">
                  <p className="mb-4">{travelPlan.budget.breakdown}</p>
                  <p className="font-bold">{travelPlan.budget.estimatedTotal}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tips">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
                <Plane className="h-5 w-5 text-travel-primary" />
                Travel Tips
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 p-3">
                  {travelPlan.travelTips.map((tip, i) => (
                    <li key={i} className="mb-2">{tip}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="transportation">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
                <Car className="h-5 w-5 text-travel-secondary" />
                Transportation Tips
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 p-3">
                  {travelPlan.recommendations.transportationTips.map((tip, i) => (
                    <li key={i} className="mb-2">{tip}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Your Interests</h3>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-travel-light">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Generated by Gemini-1.5-flash</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelResults;
