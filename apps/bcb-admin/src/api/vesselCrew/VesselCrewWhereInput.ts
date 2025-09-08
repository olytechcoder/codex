import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { VesselWhereUniqueInput } from "../vessel/VesselWhereUniqueInput";

export type VesselCrewWhereInput = {
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  nationality?: StringNullableFilter;
  passportNumber?: StringNullableFilter;
  role?: StringNullableFilter;
  vessel?: VesselWhereUniqueInput;
  visaStatus?: StringNullableFilter;
};
