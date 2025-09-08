import { GoodsDeclaration } from "../goodsDeclaration/GoodsDeclaration";
import { Person } from "../person/Person";

export type LandVehicle = {
  createdAt: Date;
  entryPoint: string | null;
  entryTime: Date | null;
  goodsDeclarations?: Array<GoodsDeclaration>;
  id: string;
  nationality: string | null;
  ownerName: string | null;
  people?: Array<Person>;
  plateNumber: string | null;
  status: string | null;
  updatedAt: Date;
  vehicleType: string | null;
};
