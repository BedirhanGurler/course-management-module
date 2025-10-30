import axios from 'axios';
import type { CourseDto, CourseData } from '../features/course/courseTypes';
import type { ResultModel } from '../models/ResultModel';

const BASE_URL = 'https://localhost:7267/adaptteen/course';

export const courseService = {
  list: async (): Promise<CourseData> => {
    const response = await axios.get<ResultModel<CourseData>>(`${BASE_URL}/list`);
    return response.data.data;
  },

  getById: async (id: string): Promise<CourseDto> => {
    const response = await axios.get<ResultModel<CourseDto>>(`${BASE_URL}/get/id?=${id}`);
    return response.data.data;
  },

  create: async (dto: CourseDto): Promise<CourseDto> => {
    const response = await axios.post<ResultModel<CourseDto>>(`${BASE_URL}/new`, dto);
    return response.data.data;
  },

  update: async (dto: CourseDto): Promise<CourseDto> => {
    const response = await axios.put<ResultModel<CourseDto>>(`${BASE_URL}/update`, dto);
    return response.data.data;
  },

  delete: async (dto: CourseDto): Promise<CourseDto> => {
    const response = await axios.put<ResultModel<CourseDto>>(`${BASE_URL}/delete`, dto);
    return response.data.data;
  },

  activate: async (dto: CourseDto): Promise<CourseDto> => {
    const response = await axios.put<ResultModel<CourseDto>>(`${BASE_URL}/activate`, dto);
    return response.data.data;
  },
};
