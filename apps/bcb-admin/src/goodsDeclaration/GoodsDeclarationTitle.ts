import { GoodsDeclaration as TGoodsDeclaration } from "../api/goodsDeclaration/GoodsDeclaration";

export const GOODSDECLARATION_TITLE_FIELD = "ownerName";

export const GoodsDeclarationTitle = (record: TGoodsDeclaration): string => {
  return record.ownerName?.toString() || String(record.id);
};
