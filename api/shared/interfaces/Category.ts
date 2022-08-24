import { OPERATION_TYPES_ENUM } from "../enums/OperationTypes.enum";
import { Types } from "mongoose";

export interface Category {
  id?: string;
  name: string;
  type: OPERATION_TYPES_ENUM;
  emoji?: string;
  basic?: boolean;
  user?: Types.ObjectId | string;
}
