import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { FlightWhereUniqueInput } from "../flight/FlightWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { PassengerWhereUniqueInput } from "../passenger/PassengerWhereUniqueInput";

export type SecurityCheckWhereInput = {
  checkTime?: DateTimeNullableFilter;
  cleared?: BooleanNullableFilter;
  documentVerified?: BooleanNullableFilter;
  flight?: FlightWhereUniqueInput;
  id?: StringFilter;
  luggageScanResult?: StringNullableFilter;
  officerName?: StringNullableFilter;
  passenger?: PassengerWhereUniqueInput;
};
