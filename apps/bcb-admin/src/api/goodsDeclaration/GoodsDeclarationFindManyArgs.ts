import { GoodsDeclarationWhereInput } from "./GoodsDeclarationWhereInput";
import { GoodsDeclarationOrderByInput } from "./GoodsDeclarationOrderByInput";

export type GoodsDeclarationFindManyArgs = {
  where?: GoodsDeclarationWhereInput;
  orderBy?: Array<GoodsDeclarationOrderByInput>;
  skip?: number;
  take?: number;
};
