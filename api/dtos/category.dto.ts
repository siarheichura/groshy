import { Category } from './../models/Category';

export class CategoryDto {
  id: string;
  name: string;
  type: string;

  constructor(model: Category) {
    this.id = model.id;
    this.name = model.name;
    this.type = model.type;
  }
}
