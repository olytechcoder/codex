import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { PassengerListRelationFilter } from "../passenger/PassengerListRelationFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { SecurityCheckListRelationFilter } from "../securityCheck/SecurityCheckListRelationFilter";

export type FlightWhereInput = {
  airline?: StringNullableFilter;
  destinationAirport?: StringNullableFilter;
  flightNumber?: StringNullableFilter;
  id?: StringFilter;
  originAirport?: StringNullableFilter;
  passengers?: PassengerListRelationFilter;
  scheduledArrival?: DateTimeNullableFilter;
  scheduledDeparture?: DateTimeNullableFilter;
  securityChecks?: SecurityCheckListRelationFilter;
  status?: StringNullableFilter;
};
