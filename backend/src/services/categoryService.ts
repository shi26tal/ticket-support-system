import { categoryRepository } from "../repository/categoryRepository.js";

export const getCategories = (role: string) => {
  // customers and agents see only active ones, admin sees all
  return categoryRepository.findAll(role !== "ADMIN");
};

export const createCategory = async (name: string) => {

    const existingCategory = await categoryRepository.findByName(name);
  if (existingCategory) {
    throw new Error("Category already exists");
  }
  return categoryRepository.create(name);
};


export const updateCategory = async (
  id: number,
  data: { name?: string; isActive?: boolean },
) => {
    const existingCategoryId = await categoryRepository.findById(id);

  if (!existingCategoryId) {
    throw new Error("Category not found");
  }

  if (data.name) {
    const existing = await categoryRepository.findByName(data.name);
    if (existing && existing.id !== id) {
      throw new Error("Category name already in use");
    }
  }

  return categoryRepository.update(id, data);
};