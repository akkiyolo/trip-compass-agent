
import { FlightDetails } from "@/types/travel";

export async function getFlightDetails(): Promise<FlightDetails> {
  // Mock response for now
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "2025-05-14 17:05"
            },
            "arrival_airport": {
              "name": "Don Mueang International Airport",
              "id": "DMK",
              "time": "2025-05-14 22:50"
            },
            "duration": 255,
            "airplane": "Airbus A330",
            "airline": "Thai AirAsia X",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/XJ.png",
            "travel_class": "Economy",
            "flight_number": "XJ 231",
            "legroom": "32 in",
            "extensions": [
              "Above average legroom (32 in)",
              "Carbon emissions estimate: 225 kg"
            ]
          },
          {
            "departure_airport": {
              "name": "Don Mueang International Airport",
              "id": "DMK",
              "time": "2025-05-15 06:40"
            },
            "arrival_airport": {
              "name": "Noi Bai International Airport",
              "id": "HAN",
              "time": "2025-05-15 08:30"
            },
            "duration": 110,
            "airplane": "Airbus A321neo",
            "airline": "Thai AirAsia",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/FD.png",
            "travel_class": "Economy",
            "flight_number": "FD 642",
            "legroom": "28 in",
            "extensions": [
              "Below average legroom (28 in)",
              "In-seat USB outlet",
              "Carbon emissions estimate: 75 kg"
            ]
          }
        ],
        "layovers": [
          {
            "duration": 470,
            "name": "Don Mueang International Airport",
            "id": "DMK",
            "overnight": true
          }
        ],
        "total_duration": 835,
        "carbon_emissions": {
          "this_flight": 301000,
          "typical_for_this_route": 224000,
          "difference_percent": 34
        },
        "price": 197,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
        "booking_token": "WyJDalJJT1hob01HZFdWRVk0TVRSQlFTMU5hbWRDUnkwdExTMHRMUzB0TFhaM2RHb3hNMEZCUVVGQlIyZHJSVWRyUVVKUlNUWkJFZ3RZU2pJek1YeEdSRFkwTWhvTENPdVpBUkFDR2dOVlUwUTRISERybVFFPSIsW1siREVMIiwiMjAyNS0wNS0xNCIsIkRNSyIsbnVsbCwiWEoiLCIyMzEiXSxbIkRNSyIsIjIwMjUtMDUtMTUiLCJIQU4iLG51bGwsIkZEIiwiNjQyIl1dXQ=="
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "2025-05-14 18:00"
            },
            "arrival_airport": {
              "name": "Netaji Subhash Chandra Bose International Airport",
              "id": "CCU",
              "time": "2025-05-14 20:15"
            },
            "duration": 135,
            "airplane": "Airbus A321neo",
            "airline": "IndiGo",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
            "travel_class": "Economy",
            "flight_number": "6E 2057",
            "legroom": "28 in",
            "extensions": [
              "Below average legroom (28 in)",
              "Carbon emissions estimate: 91 kg"
            ],
            "often_delayed_by_over_30_min": true
          },
          {
            "departure_airport": {
              "name": "Netaji Subhash Chandra Bose International Airport",
              "id": "CCU",
              "time": "2025-05-14 21:45"
            },
            "arrival_airport": {
              "name": "Noi Bai International Airport",
              "id": "HAN",
              "time": "2025-05-15 02:10"
            },
            "duration": 175,
            "airplane": "Airbus A320neo",
            "airline": "IndiGo",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
            "travel_class": "Economy",
            "flight_number": "6E 1631",
            "legroom": "28 in",
            "extensions": [
              "Below average legroom (28 in)",
              "Carbon emissions estimate: 122 kg"
            ],
            "overnight": true
          }
        ],
        "layovers": [
          {
            "duration": 90,
            "name": "Netaji Subhash Chandra Bose International Airport",
            "id": "CCU"
          }
        ],
        "total_duration": 400,
        "carbon_emissions": {
          "this_flight": 214000,
          "typical_for_this_route": 224000,
          "difference_percent": -4
        },
        "price": 213,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
        "booking_token": "WyJDalJJT1hob01HZFdWRVk0TVRSQlFTMU5hbWRDUnkwdExTMHRMUzB0TFhaM2RHb3hNMEZCUVVGQlIyZHJSVWRyUVVKUlNUWkJFZzAyUlRJd05UZDhOa1V4TmpNeEdnc0lsS1lCRUFJYUExVlRSRGdjY0pTbUFRPT0iLFtbIkRFTCIsIjIwMjUtMDUtMTQiLCJDQ1UiLG51bGwsIjZFIiwiMjA1NyJdLFsiQ0NVIiwiMjAyNS0wNS0xNCIsIkhBTiIsbnVsbCwiNkUiLCIxNjMxIl1dXQ=="
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "2025-05-14 22:05"
            },
            "arrival_airport": {
              "name": "Kuala Lumpur International Airport",
              "id": "KUL",
              "time": "2025-05-15 06:00"
            },
            "duration": 325,
            "airplane": "Boeing 737",
            "airline": "Batik Air",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
            "travel_class": "Economy",
            "flight_number": "OD 206",
            "legroom": "32 in",
            "extensions": [
              "Above average legroom (32 in)",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 328 kg"
            ],
            "overnight": true
          },
          {
            "departure_airport": {
              "name": "Kuala Lumpur International Airport",
              "id": "KUL",
              "time": "2025-05-15 10:10"
            },
            "arrival_airport": {
              "name": "Noi Bai International Airport",
              "id": "HAN",
              "time": "2025-05-15 12:30"
            },
            "duration": 200,
            "airplane": "Boeing 737MAX 8 Passenger",
            "airline": "Batik Air",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
            "travel_class": "Economy",
            "flight_number": "OD 571",
            "legroom": "29 in",
            "extensions": [
              "Below average legroom (29 in)",
              "Stream media to your device",
              "Carbon emissions estimate: 154 kg"
            ]
          }
        ],
        "layovers": [
          {
            "duration": 250,
            "name": "Kuala Lumpur International Airport",
            "id": "KUL"
          }
        ],
        "total_duration": 775,
        "carbon_emissions": {
          "this_flight": 483000,
          "typical_for_this_route": 224000,
          "difference_percent": 116
        },
        "price": 216,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
        "booking_token": "WyJDalJJT1hob01HZFdWRVk0TVRSQlFTMU5hbWRDUnkwdExTMHRMUzB0TFhaM2RHb3hNMEZCUVVGQlIyZHJSVWRyUVVKUlNUWkJFZ3RQUkRJd05ueFBSRFUzTVJvTENNU29BUkFDR2dOVlUwUTRISERFcUFFPSIsW1siREVMIiwiMjAyNS0wNS0xNCIsIktVTCIsbnVsbCwiT0QiLCIyMDYiXSxbIktVTCIsIjIwMjUtMDUtMTUiLCJIQU4iLG51bGwsIk9EIiwiNTcxIl1dXQ=="
      }
    ]
  };
}
