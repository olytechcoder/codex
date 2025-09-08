import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { VesselWhereUniqueInput } from "../vessel/VesselWhereUniqueInput";

export type CargoManifestWhereInput = {
  cargoDescription?: StringNullableFilter;
  cargoType?: StringNullableFilter;
  id?: StringFilter;
  manifestNumber?: StringNullableFilter;
  portOfDischarge?: StringNullableFilter;
  portOfLoading?: StringNullableFilter;
  totalWeight?: FloatNullableFilter;
  vessel?: VesselWhereUniqueInput;
};
