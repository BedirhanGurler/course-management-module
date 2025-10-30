import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  activateCategory,
  deleteCategory,
} from '../features/category/categorySlice';
import type { CategoryDto } from '../features/category/categoryTypes';
import { FaEdit, FaToggleOn, FaToggleOff, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const initialForm: CategoryDto = {
  name: '',
  code: '',
  description: '',
};

const CategoryManagementPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state: { category: any; }) => state.category);

  const [form, setForm] = useState<CategoryDto>(initialForm);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code) return;

    const action = editMode && form.id
      ? updateCategory(form)
      : createCategory(form);

    dispatch(action)
  .unwrap()
  .then(() => {
    dispatch(fetchCategories());
    toast.success(editMode ? 'Kategori başarıyla güncellendi!' : 'Kategori başarıyla eklendi!');
    setForm(initialForm);
    setEditMode(false);
  })
  .catch((error) => {
    toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    console.error('Hata:', error);
  });
  };

  const handleEdit = (category: CategoryDto) => {
    setForm(category);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditMode(false);
  };

  const toggleActive = (category: CategoryDto) => {
    const action = category.isActive
      ? deleteCategory(category)
      : activateCategory(category);

    dispatch(action)
  .unwrap()
  .then(() => {
    dispatch(fetchCategories());
    toast.success(
      category.isActive ? 'Kategori pasif yapıldı!' : 'Kategori aktif hale getirildi!'
    );
  })
  .catch(() => {
    toast.error('Kategori durumu değiştirilemedi!');
  });
  };

  const filteredList = list.filter((cat: CategoryDto) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
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
                {editMode ? '✏️ Kategoriyi Düzenle' : '➕ Yeni Kategori Ekle'}
              </h5>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Kategori Adı <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Kategori adını girin"
                    required
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Kategori Kodu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Örn: PROG-101"
                    required
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Kategori açıklamasını girin"
                    rows={4}
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {editMode ? '💾 Güncelle' : '✅ Kategori Ekle'}
                  </button>

                  {editMode && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={handleCancel}
                      style={{ borderRadius: '10px' }}
                    >
                      ❌ İptal
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
                <h5 className="fw-bold mb-0">📋 Mevcut Kategoriler</h5>

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
                    placeholder="Kategorilerde ara..."
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
                  <p className="text-muted mt-3">Kategoriler yükleniyor...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Kategori Adı</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Kod</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Açıklama</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>Durum</th>
                        <th className="fw-semibold text-secondary" style={{ padding: '16px' }}>İşlem Tarihi</th>
                        <th className="fw-semibold text-secondary text-center" style={{ padding: '16px' }}>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.map((cat: CategoryDto) => (
                        <tr key={cat.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td className="fw-semibold" style={{ padding: '16px' }}>{cat.name}</td>
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
                              {cat.code}
                            </span>
                          </td>
                          <td className="text-muted" style={{ padding: '16px', maxWidth: '300px' }}>
                            {cat.description || '-'}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span
                              className={`badge ${cat.isActive ? 'bg-success' : 'bg-secondary'}`}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {cat.isActive ? '✓ Aktif' : '⊗ Pasif'}
                            </span>
                          </td>
                          <td style={{ padding: '16px', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                            {cat.dateModified
                              ? new Date(cat.dateModified).toLocaleString('tr-TR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                              : '-'}
                          </td>

                          <td style={{ padding: '16px' }}>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(cat)}
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
                                onClick={() => toggleActive(cat)}
                                title={cat.isActive ? 'Pasif Yap' : 'Aktif Yap'}
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
                                {cat.isActive ? <FaToggleOff /> : <FaToggleOn />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredList.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-5">
                            <div className="text-muted">
                              <p className="mb-2" style={{ fontSize: '2rem' }}>📂</p>
                              <p className="mb-0">
                                {searchTerm ? 'Arama kriterine uygun kategori bulunamadı.' : 'Henüz kategori eklenmemiş.'}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
  

};

export default CategoryManagementPage;