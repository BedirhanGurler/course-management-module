import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { CourseDto, CourseData } from './courseTypes';
import { courseService } from '../../services/courseService';

interface CourseState {
  list: CourseDto[];
  stats: Omit<CourseData, 'data'>;
  selectedCourse: CourseDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  list: [],
  stats: {
    numberOfAllCourses: 0,
    numberOfActiveCourses: 0,
    numberOfPassiveCourses: 0,
  },
  selectedCourse: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchCourses = createAsyncThunk('course/fetchAll', async () => {
  return await courseService.list();
});

export const fetchCourseById = createAsyncThunk('course/fetchById', async (id: string) => {
  return await courseService.getById(id);
});

export const createCourse = createAsyncThunk('course/create', async (dto: CourseDto) => {
  return await courseService.create(dto);
});

export const updateCourse = createAsyncThunk('course/update', async (dto: CourseDto) => {
  return await courseService.update(dto);
});

export const deleteCourse = createAsyncThunk('course/delete', async (dto: CourseDto) => {
  return await courseService.delete(dto);
});

export const activateCourse = createAsyncThunk('course/activate', async (dto: CourseDto) => {
  return await courseService.activate(dto);
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearSelectedCourse(state) {
      state.selectedCourse = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.stats = {
          numberOfAllCourses: action.payload.numberOfAllCourses,
          numberOfActiveCourses: action.payload.numberOfActiveCourses,
          numberOfPassiveCourses: action.payload.numberOfPassiveCourses,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ders listesi alınamadı';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      });
  },
});

export const { clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
