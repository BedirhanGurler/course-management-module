import axios from 'axios';
import type { CategoryDto, CategoryData } from '../features/category/categoryTypes';
import type { ResultModel } from '../models/ResultModel';

const BASE_URL = 'https://localhost:7267/adaptteen/category';

export const categoryService = {
  list: async (): Promise<CategoryData> => {
    const response = await axios.get<ResultModel<CategoryData>>(`${BASE_URL}/list`);
    return response.data.data;
  },

  getById: async (id: string): Promise<CategoryDto> => {
    const response = await axios.get<ResultModel<CategoryDto>>(`${BASE_URL}/get/id?=${id}`);
    return response.data.data;
  },

  create: async (dto: CategoryDto): Promise<CategoryDto> => {
    const response = await axios.post<ResultModel<CategoryDto>>(`${BASE_URL}/new`, dto);
    return response.data.data;
  },

  update: async (dto: CategoryDto): Promise<CategoryDto> => {
    const response = await axios.put<ResultModel<CategoryDto>>(`${BASE_URL}/update`, dto);
    return response.data.data;
  },

  delete: async (dto: CategoryDto): Promise<CategoryDto> => {
    const response = await axios.put<ResultModel<CategoryDto>>(`${BASE_URL}/delete`, dto);
    return response.data.data;
  },

  activate: async (dto: CategoryDto): Promise<CategoryDto> => {
    const response = await axios.put<ResultModel<CategoryDto>>(`${BASE_URL}/activate`, dto);
    return response.data.data;
  },
};
