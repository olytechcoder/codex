import { LandVehicleWhereUniqueInput } from "../landVehicle/LandVehicleWhereUniqueInput";

export type GoodsDeclarationUpdateInput = {
  customsStatus?: string | null;
  declarationNumber?: string | null;
  description?: string | null;
  landVehicle?: LandVehicleWhereUniqueInput | null;
  ownerName?: string | null;
  value?: number | null;
};
