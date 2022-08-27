import { Schema, model } from 'mongoose'
import { OPERATION_TYPES_ENUM } from '../shared/enums/OperationTypes.enum'
import { Category } from '../shared/interfaces/Category'

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
  type: { type: String, enum: OPERATION_TYPES_ENUM, required: true },
  emoji: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
})

export const CategoryModel = model('Category', CategorySchema)
