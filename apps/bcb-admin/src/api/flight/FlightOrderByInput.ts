import { SortOrder } from "../../util/SortOrder";

export type FlightOrderByInput = {
  airline?: SortOrder;
  createdAt?: SortOrder;
  destinationAirport?: SortOrder;
  flightNumber?: SortOrder;
  id?: SortOrder;
  originAirport?: SortOrder;
  scheduledArrival?: SortOrder;
  scheduledDeparture?: SortOrder;
  status?: SortOrder;
  updatedAt?: SortOrder;
};
