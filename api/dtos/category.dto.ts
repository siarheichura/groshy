import { Category } from "../shared/interfaces/Category";

export class CategoryDto {
  id: string;
  name: string;
  type: string;
  emoji: string;
  // basic: boolean;

  constructor(model: Category) {
    this.id = model.id;
    this.name = model.name;
    this.type = model.type;
    this.emoji = model.emoji;
    // this.basic = model.basic;
  }
}
