import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LandVehicleWhereUniqueInput } from "../landVehicle/LandVehicleWhereUniqueInput";

export type PersonWhereInput = {
  firstName?: StringNullableFilter;
  id?: StringFilter;
  idNumber?: StringNullableFilter;
  landVehicle?: LandVehicleWhereUniqueInput;
  lastName?: StringNullableFilter;
  nationality?: StringNullableFilter;
  passportNumber?: StringNullableFilter;
  visaStatus?: StringNullableFilter;
};
