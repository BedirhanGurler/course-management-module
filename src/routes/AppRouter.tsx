import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/Home';
import CategoryListPage from '../pages/Category';
import CourseListPage from '../pages/Course';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryListPage />} />
      <Route path="/course" element={<CourseListPage />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
