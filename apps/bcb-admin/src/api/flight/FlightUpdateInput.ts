import { PassengerUpdateManyWithoutFlightsInput } from "./PassengerUpdateManyWithoutFlightsInput";
import { SecurityCheckUpdateManyWithoutFlightsInput } from "./SecurityCheckUpdateManyWithoutFlightsInput";

export type FlightUpdateInput = {
  airline?: string | null;
  destinationAirport?: string | null;
  flightNumber?: string | null;
  originAirport?: string | null;
  passengers?: PassengerUpdateManyWithoutFlightsInput;
  scheduledArrival?: Date | null;
  scheduledDeparture?: Date | null;
  securityChecks?: SecurityCheckUpdateManyWithoutFlightsInput;
  status?: string | null;
};
