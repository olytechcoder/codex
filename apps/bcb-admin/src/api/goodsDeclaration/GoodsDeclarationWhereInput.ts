import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LandVehicleWhereUniqueInput } from "../landVehicle/LandVehicleWhereUniqueInput";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";

export type GoodsDeclarationWhereInput = {
  customsStatus?: StringNullableFilter;
  declarationNumber?: StringNullableFilter;
  description?: StringNullableFilter;
  id?: StringFilter;
  landVehicle?: LandVehicleWhereUniqueInput;
  ownerName?: StringNullableFilter;
  value?: FloatNullableFilter;
};
