import { StringNullableFilter } from "../../util/StringNullableFilter";
import { FlightWhereUniqueInput } from "../flight/FlightWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { SecurityCheckListRelationFilter } from "../securityCheck/SecurityCheckListRelationFilter";

export type PassengerWhereInput = {
  boardingPassId?: StringNullableFilter;
  firstName?: StringNullableFilter;
  flight?: FlightWhereUniqueInput;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  nationality?: StringNullableFilter;
  passportNumber?: StringNullableFilter;
  seatNumber?: StringNullableFilter;
  securityChecks?: SecurityCheckListRelationFilter;
  visaStatus?: StringNullableFilter;
};
