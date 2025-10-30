// src/features/category/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { CategoryDto, CategoryData } from './categoryTypes';
import { categoryService } from '../../services/categoryService';

interface CategoryState {
  list: CategoryDto[];
  stats: Omit<CategoryData, 'data'>;
  selectedCategory: CategoryDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  stats: {
    numberOfAllCategories: 0,
    numberOfActiveCategories: 0,
    numberOfPassiveCategories: 0,
  },
  selectedCategory: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
  return await categoryService.list();
});

export const fetchCategoryById = createAsyncThunk('category/fetchById', async (id: string) => {
  return await categoryService.getById(id);
});

export const createCategory = createAsyncThunk('category/create', async (dto: CategoryDto) => {
  return await categoryService.create(dto);
});

export const updateCategory = createAsyncThunk('category/update', async (dto: CategoryDto) => {
  return await categoryService.update(dto);
});

export const deleteCategory = createAsyncThunk('category/delete', async (dto: CategoryDto) => {
  return await categoryService.delete(dto);
});

export const activateCategory = createAsyncThunk('category/activate', async (dto: CategoryDto) => {
  return await categoryService.activate(dto);
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.stats = {
          numberOfAllCategories: action.payload.numberOfAllCategories,
          numberOfActiveCategories: action.payload.numberOfActiveCategories,
          numberOfPassiveCategories: action.payload.numberOfPassiveCategories,
        };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kategori listesi alınamadı';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      });
  },
});

export const { clearSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
