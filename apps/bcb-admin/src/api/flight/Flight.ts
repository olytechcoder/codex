import { Passenger } from "../passenger/Passenger";
import { SecurityCheck } from "../securityCheck/SecurityCheck";

export type Flight = {
  airline: string | null;
  createdAt: Date;
  destinationAirport: string | null;
  flightNumber: string | null;
  id: string;
  originAirport: string | null;
  passengers?: Array<Passenger>;
  scheduledArrival: Date | null;
  scheduledDeparture: Date | null;
  securityChecks?: Array<SecurityCheck>;
  status: string | null;
  updatedAt: Date;
};
