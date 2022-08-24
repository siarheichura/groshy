import { CategoryModel } from "../models/Category";
import { Category } from "../shared/interfaces/Category";
import { CategoryDto } from "../dtos/category.dto";

class CategoryService {
  async createUserBasicCategories(userId: string) {
    const basicCategories = await CategoryModel.find({ basic: { $exists: true }, user: { $exists: false } })
    const basicCategoriesDto = basicCategories.map(category => new CategoryDto(category))
    const basicUserCategories = basicCategoriesDto.map(category => ({ ...category, user: userId }))
    await CategoryModel.insertMany(basicUserCategories)
  }

  async getBasicCategories(type: string) {
    const categories = await CategoryModel.find({ type, basic: true })
    const categoriesDto = categories.map(category => new CategoryDto(category))
    return categoriesDto
  }

  async getUserCategories(userId: string, type: string) {
    const categories = type === 'all' ? await CategoryModel.find({ user: userId }) : await CategoryModel.find({ type, user: userId })
    const categoriesDto = categories.map(category => new CategoryDto(category))
    return categoriesDto
  }

  async addCategory(categoryData: Category) {
    const category = await CategoryModel.create(categoryData)
    const categoryDto = new CategoryDto(category)
    return categoryDto
  }

  async editCategory(categoryId: string, categoryData: Category) {
    const category = await CategoryModel.findByIdAndUpdate(categoryId, categoryData)
    const categoryDto = new CategoryDto(category)
    return categoryDto
  }

  async deleteCategory(categoryId: string) {
    const category = await CategoryModel.findByIdAndDelete(categoryId)
    const categoryDto = new CategoryDto(category)
    return categoryDto
  }

  async deleteAllUserCategories(userId: string) {
    await CategoryModel.deleteMany({ user: userId })
  }
}

export const categoryService = new CategoryService()
