export interface CategoryDto {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  isActive?: boolean;
  dateCreated?: string;
  dateModified?: string;
}

export interface CategoryData {
  numberOfAllCategories: number;
  numberOfActiveCategories: number;
  numberOfPassiveCategories: number;
  data: CategoryDto[];
}