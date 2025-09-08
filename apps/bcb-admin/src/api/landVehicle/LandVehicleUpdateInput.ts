import { GoodsDeclarationUpdateManyWithoutLandVehiclesInput } from "./GoodsDeclarationUpdateManyWithoutLandVehiclesInput";
import { PersonUpdateManyWithoutLandVehiclesInput } from "./PersonUpdateManyWithoutLandVehiclesInput";

export type LandVehicleUpdateInput = {
  entryPoint?: string | null;
  entryTime?: Date | null;
  goodsDeclarations?: GoodsDeclarationUpdateManyWithoutLandVehiclesInput;
  nationality?: string | null;
  ownerName?: string | null;
  people?: PersonUpdateManyWithoutLandVehiclesInput;
  plateNumber?: string | null;
  status?: string | null;
  vehicleType?: string | null;
};
