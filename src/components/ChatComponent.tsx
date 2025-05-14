
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { TravelFormData } from "@/types/travel";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatComponentProps {
  formData: TravelFormData;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ formData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hello! I'm your travel assistant. Your plan for ${formData.destination} is ready. Do you have any questions about your trip or would you like any specific recommendations?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsSubmitting(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputValue, formData);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      }]);
      setIsSubmitting(false);
    }, 1000);
  };

  // A simple function to generate AI responses based on the user input
  const generateAiResponse = (userInput: string, formData: TravelFormData): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("weather") || input.includes("temperature")) {
      return `The weather in ${formData.destination} is typically pleasant during your travel dates. I recommend checking a weather app closer to your departure date for the most accurate forecast.`;
    }
    
    if (input.includes("restaurant") || input.includes("food") || input.includes("eat")) {
      return `For food in ${formData.destination}, I'd recommend trying the local specialties. Some popular restaurants include "Local Delicacy", "Tourist's Favorite", and "Authentic Experience".`;
    }
    
    if (input.includes("activity") || input.includes("thing to do") || input.includes("attraction")) {
      return `There are many great activities in ${formData.destination}! Based on your interests (${formData.interests.join(", ")}), I would recommend visiting the local museums, taking a walking tour, and experiencing the nightlife in the downtown area.`;
    }
    
    if (input.includes("hotel") || input.includes("stay") || input.includes("accommodation")) {
      return `For your ${formData.budget} budget, some good accommodation options in ${formData.destination} are "Central Hotel", "Traveler's Rest", and "Local Boutique Inn".`;
    }
    
    if (input.includes("transportation") || input.includes("getting around") || input.includes("travel")) {
      return `The best way to get around ${formData.destination} is usually a combination of public transportation and walking. Taxis are readily available but may be more expensive.`;
    }

    return `Thank you for your question about ${formData.destination}. Based on your travel preferences and interests (${formData.interests.join(", ")}), I'd recommend exploring the local culture and cuisine. Is there anything specific you'd like to know about your destination?`;
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-travel-light shadow-lg">
      <CardHeader className="bg-travel-primary text-white">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Travel Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="h-8 w-8">
                  {message.sender === 'ai' ? (
                    <AvatarImage src="/placeholder.svg" alt="AI" />
                  ) : null}
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
                
                <div 
                  className={`rounded-lg p-3 text-sm ${
                    message.sender === 'user' 
                      ? 'bg-travel-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask me anything about your trip..."
            value={inputValue}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isSubmitting || !inputValue.trim()}
            className="bg-travel-primary hover:bg-travel-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatComponent;
