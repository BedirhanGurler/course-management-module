import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/categorySlice';
import courseReducer from '../features/course/courseSlice';

const rootReducer = combineReducers({
  category: categoryReducer,
  course: courseReducer,
});

export default rootReducer;