import { Category } from "@shared/interfaces/Category.interface";

export interface CategoriesState {
  categories: Category[]
}

export const initialCategoriesState: CategoriesState = {
  categories: []
}
