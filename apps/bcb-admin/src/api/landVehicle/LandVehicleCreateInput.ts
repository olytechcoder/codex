import { GoodsDeclarationCreateNestedManyWithoutLandVehiclesInput } from "./GoodsDeclarationCreateNestedManyWithoutLandVehiclesInput";
import { PersonCreateNestedManyWithoutLandVehiclesInput } from "./PersonCreateNestedManyWithoutLandVehiclesInput";

export type LandVehicleCreateInput = {
  entryPoint?: string | null;
  entryTime?: Date | null;
  goodsDeclarations?: GoodsDeclarationCreateNestedManyWithoutLandVehiclesInput;
  nationality?: string | null;
  ownerName?: string | null;
  people?: PersonCreateNestedManyWithoutLandVehiclesInput;
  plateNumber?: string | null;
  status?: string | null;
  vehicleType?: string | null;
};
