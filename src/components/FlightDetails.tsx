
import React from "react";
import { BestFlight, Flight, Layover } from "@/types/travel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, AlertCircle } from "lucide-react";
import { format, parseISO, addMinutes } from "date-fns";

interface FlightDetailsProps {
  bestFlights: BestFlight[];
}

export const FlightDetails: React.FC<FlightDetailsProps> = ({ bestFlights }) => {
  const formatFlightTime = (timeString: string) => {
    try {
      const date = parseISO(timeString.replace(" ", "T"));
      return format(date, "h:mm a");
    } catch (error) {
      return timeString.split(" ")[1]; // Fallback to just showing the time part
    }
  };

  const formatFlightDate = (timeString: string) => {
    try {
      const date = parseISO(timeString.replace(" ", "T"));
      return format(date, "MMM d, yyyy");
    } catch (error) {
      return timeString.split(" ")[0]; // Fallback to just showing the date part
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Plane className="h-5 w-5 text-travel-primary" />
        Flight Options
      </h3>

      {bestFlights.slice(0, 2).map((bestFlight, index) => (
        <Card key={index} className="overflow-hidden border-2 border-travel-light">
          <CardHeader className="bg-travel-light py-3 px-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img src={bestFlight.airline_logo} alt="Airline" className="h-6" />
                <CardTitle className="text-lg">Option {index + 1}</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white">
                  {bestFlight.type}
                </Badge>
                <Badge variant="secondary" className="font-bold">
                  ${bestFlight.price}
                </Badge>
                <Badge variant="outline" className="bg-white flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(bestFlight.total_duration)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {bestFlight.flights.map((flight, flightIndex) => (
              <React.Fragment key={flightIndex}>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img src={flight.airline_logo} alt={flight.airline} className="h-5 mr-2" />
                      <span className="text-sm font-medium">{flight.airline} • {flight.flight_number}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{flight.travel_class} • {flight.airplane}</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-1">
                    <div className="col-span-3">
                      <div className="text-lg font-bold">{formatFlightTime(flight.departure_airport.time)}</div>
                      <div className="text-sm">{formatFlightDate(flight.departure_airport.time)}</div>
                      <div className="text-xs font-medium mt-1">{flight.departure_airport.name}</div>
                      <div className="text-xs text-muted-foreground">{flight.departure_airport.id}</div>
                    </div>

                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="text-xs text-muted-foreground">{formatDuration(flight.duration)}</div>
                      <div className="h-0.5 w-full bg-gray-300 my-1"></div>
                      <Plane className="h-3 w-3" />
                    </div>

                    <div className="col-span-3">
                      <div className="text-lg font-bold">{formatFlightTime(flight.arrival_airport.time)}</div>
                      <div className="text-sm">{formatFlightDate(flight.arrival_airport.time)}</div>
                      <div className="text-xs font-medium mt-1">{flight.arrival_airport.name}</div>
                      <div className="text-xs text-muted-foreground">{flight.arrival_airport.id}</div>
                    </div>
                  </div>

                  {flight.often_delayed_by_over_30_min && (
                    <div className="mt-1 text-xs flex items-center text-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Often delayed by more than 30 minutes
                    </div>
                  )}

                  {flight.overnight && (
                    <div className="mt-1 text-xs text-blue-600">
                      Overnight flight
                    </div>
                  )}

                  <div className="mt-2 flex flex-wrap gap-1">
                    {flight.extensions.map((ext, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {ext}
                      </Badge>
                    ))}
                  </div>
                </div>

                {flightIndex < bestFlight.flights.length - 1 && bestFlight.layovers[flightIndex] && (
                  <div className="my-3 px-3 py-2 bg-gray-50 rounded-md text-sm">
                    <div className="font-medium">Layover: {formatDuration(bestFlight.layovers[flightIndex].duration)}</div>
                    <div className="text-xs text-muted-foreground">
                      {bestFlight.layovers[flightIndex].name} ({bestFlight.layovers[flightIndex].id})
                      {bestFlight.layovers[flightIndex].overnight && " • Overnight"}
                    </div>
                  </div>
                )}

                {flightIndex < bestFlight.flights.length - 1 && (
                  <div className="my-4 border-t border-dashed"></div>
                )}
              </React.Fragment>
            ))}

            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">Carbon emissions:</span>{" "}
                  <span className={bestFlight.carbon_emissions.difference_percent < 0 ? "text-green-600" : "text-amber-600"}>
                    {bestFlight.carbon_emissions.difference_percent < 0 ? "-" : "+"}
                    {Math.abs(bestFlight.carbon_emissions.difference_percent)}% than average
                  </span>
                </div>
                <div>
                  <Badge className="bg-travel-primary">
                    Book for ${bestFlight.price}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FlightDetails;
