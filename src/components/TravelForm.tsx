import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar as CalendarIcon, MapPin, Users, DollarSign, Plane } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { interestOptions, budgetOptions, TravelFormData } from "@/types/travel";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }).refine(date => date > new Date(), {
    message: "End date cannot be in the past",
  }),
  budget: z.string({
    required_error: "Please select a budget",
  }),
  travelers: z.coerce
    .number()
    .min(1, "At least 1 traveler is required")
    .max(20, "Maximum 20 travelers allowed"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  includeTransportation: z.boolean().optional().default(false),
});

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

export const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      destination: "",
      travelers: 2,
      interests: [],
      includeTransportation: false,
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      source: values.source,
      destination: values.destination,
      startDate: format(values.startDate, "yyyy-MM-dd"),
      endDate: format(values.endDate, "yyyy-MM-dd"),
      budget: values.budget,
      travelers: values.travelers,
      interests: values.interests,
      includeTransportation: values.includeTransportation,
    });
  };

  return (
    <Card className="w-full max-w-3xl border border-travel-light shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-travel-primary" />
                      From
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-travel-secondary" />
                      To
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-travel-primary" />
                      Start Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-travel-secondary" />
                      End Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            (form.getValues("startDate") && date < form.getValues("startDate"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-travel-primary" />
                      Budget
                    </FormLabel>
                    <div className="flex gap-4">
                      {budgetOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <input
                              type="radio"
                              className="peer h-4 w-4 text-travel-primary focus:ring-travel-primary"
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-travel-secondary" />
                      Number of Travelers
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>What are you interested in?</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
                    {interestOptions.map((interest) => (
                      <FormField
                        key={interest.value}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.value}
                              className="flex flex-row items-start space-x-2 rounded-md border p-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    return checked
                                      ? field.onChange([...currentValues, interest.value])
                                      : field.onChange(
                                          currentValues.filter((value) => value !== interest.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {interest.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeTransportation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2">
                      <Plane className="h-4 w-4 text-travel-primary" />
                      Include Transportation Details
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Get flight options for your trip
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-travel-primary hover:bg-travel-dark"
              disabled={isLoading}
            >
              {isLoading ? "Generating Travel Plan..." : "Plan My Trip"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TravelForm;
