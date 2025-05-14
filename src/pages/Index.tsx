
import React, { useState } from "react";
import TravelForm from "@/components/TravelForm";
import TravelResults from "@/components/TravelResults";
import { generateTravelPlan, TravelPlan } from "@/services/geminiApi";
import { TravelFormData } from "@/types/travel";
import { useToast } from "@/components/ui/use-toast";
import { Plane } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [formData, setFormData] = useState<TravelFormData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: TravelFormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const plan = await generateTravelPlan(data);
      setTravelPlan(plan);
      toast({
        title: "Success!",
        description: data.includeTransportation 
          ? "Your travel plan with flight options is ready."
          : "Your travel plan is ready.",
      });
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTravelPlan(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen travel-gradient">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <Plane className="h-8 w-8 text-travel-primary mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-travel-dark">
              AI Travel Planner
            </h1>
          </div>
          <p className="text-travel-primary text-lg mt-2">
            Plan your perfect trip with our Gemini-powered AI assistant
          </p>
        </header>

        {!travelPlan ? (
          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="animate-pulse-soft">
                  <Plane className="h-16 w-16 text-travel-primary mb-4" />
                </div>
                <p className="text-lg">Planning your perfect trip...</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Our AI is curating personalized recommendations just for you
                </p>
              </div>
            ) : (
              <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
            )}
          </div>
        ) : (
          <div className="flex justify-center results-gradient py-6 px-4 rounded-lg">
            {formData && (
              <TravelResults 
                travelPlan={travelPlan} 
                formData={formData}
                onReset={handleReset}
              />
            )}
          </div>
        )}

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Powered by Gemini-1.5-flash AI model</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
