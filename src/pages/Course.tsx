import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCourses,
  createCourse,
  updateCourse,
  activateCourse,
  deleteCourse,
} from '../features/course/courseSlice';
import { fetchCategories } from '../features/category/categorySlice';
import type { CourseDto } from '../features/course/courseTypes';
import { FaEdit, FaToggleOn, FaToggleOff, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialForm: CourseDto = {
  name: '',
  code: '',
  categoryId: '',
  description: '',
};

const CourseManagementPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state: { course: any; }) => state.course);
  const { list: categories } = useAppSelector((state: { category: any; }) => state.category);

  const [form, setForm] = useState<CourseDto>(initialForm);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code || !form.categoryId) {
      toast.error('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }

    const action = editMode && form.id
      ? updateCourse(form)
      : createCourse(form);

    dispatch(action).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success(editMode ? 'Ders başarıyla güncellendi!' : 'Ders başarıyla eklendi!');
        dispatch(fetchCourses());
        setForm(initialForm);
        setEditMode(false);
      } else {
        toast.error('İşlem sırasında bir hata oluştu!');
      }
    });
  };

  const handleEdit = (course: CourseDto) => {
    setForm(course);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditMode(false);
  };

  const toggleActive = (course: CourseDto) => {
    const action = course.isActive
      ? deleteCourse(course)
      : activateCourse(course);

    dispatch(action).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success(course.isActive ? 'Ders pasif yapıldı!' : 'Ders aktif yapıldı!');
        dispatch(fetchCourses());
      } else {
        toast.error('Durum değiştirilemedi!');
      }
    });
  };

  const filteredList = list.filter((course: CourseDto) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: any) => cat.id === categoryId);
    return category?.name || '-';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="row g-4">
        <div className="col-lg-4">
          <div 
            className="card border-0 shadow-sm" 
            style={{ 
              position: 'sticky', 
              top: '100px',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <div 
              className="card-header border-0 text-white p-4"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <h5 className="mb-0 fw-bold">
                {editMode ? '✏️ Dersi Düzenle' : '➕ Yeni Ders Ekle'}
              </h5>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Ders Adı <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Dersin adını girin"
                    required
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Ders Kodu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Örn: CS-101"
                    required
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Kategori Seçiniz <span className="text-danger">*</span>
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="form-select form-select-lg"
                    required
                    style={{ borderRadius: '10px' }}
                  >
                    <option value="">Bir kategori seçin</option>
                    {categories
                      .filter((cat: any) => cat.isActive)
                      .map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">
                    Ders Açıklaması
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ders hakkında kısa bir açıklama girin"
                    rows={4}
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white fw-semibold"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {loading ? '⏳ İşleniyor...' : editMode ? '💾 Güncelle' : '✅ Kaydet'}
                  </button>
                  
                  {editMode && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={handleCancel}
                      style={{ borderRadius: '10px' }}
                    >
                      ❌ Temizle
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="card-header bg-white border-0 p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                <h5 className="fw-bold mb-0">📚 Mevcut Dersler</h5>
                
                <div className="input-group" style={{ maxWidth: '350px' }}>
                  <span 
                    className="input-group-text bg-white border-end-0"
                    style={{ borderRadius: '10px 0 0 10px' }}
                  >
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Ders ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: '0 10px 10px 0' }}
                  />
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                  </div>
                  <p className="text-muted mt-3">Dersler yükleniyor...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Ders Adı</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Ders Kodu</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Kategori</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Açıklama</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Durum</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>İşlem Tarihi</th>
                        <th className="fw-semibold text-secondary text-center" style={{ padding: '16px' }}>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.map((course: CourseDto) => (
                        <tr key={course.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td className="fw-semibold" style={{ padding: '16px' }}>{course.name}</td>
                          <td style={{ padding: '16px' }}>
                            <span 
                              className="badge"
                              style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {course.code}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span className="badge bg-info text-dark" style={{ padding: '6px 12px', borderRadius: '8px' }}>
                              {getCategoryName(course.categoryId || '')}
                            </span>
                          </td>
                          <td className="text-muted" style={{ padding: '16px', maxWidth: '250px' }}>
                            {course.description || '-'}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span 
                              className={`badge ${course.isActive ? 'bg-success' : 'bg-secondary'}`}
                              style={{ 
                                padding: '6px 12px', 
                                borderRadius: '8px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {course.isActive ? '✓ Aktif' : '⊗ Pasif'}
                            </span>
                          </td>
                          <td className="text-muted" style={{ padding: '16px', fontSize: '0.9rem' }}>
                            {formatDate(course.dateModified)}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(course)}
                                title="Düzenle"
                                style={{
                                  borderRadius: '8px',
                                  padding: '6px 12px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => toggleActive(course)}
                                title={course.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                                style={{
                                  borderRadius: '8px',
                                  padding: '6px 12px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 193, 7, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                {course.isActive ? <FaToggleOff /> : <FaToggleOn />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredList.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-5">
                            <div className="text-muted">
                              <p className="mb-2" style={{ fontSize: '2rem' }}>📚</p>
                              <p className="mb-0">
                                {searchTerm ? 'Arama kriterine uygun ders bulunamadı.' : 'Henüz ders eklenmemiş.'}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagementPage;