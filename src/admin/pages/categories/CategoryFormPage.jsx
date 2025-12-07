import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  adminGetCategoryById,
  adminCreateCategory,
  adminUpdateCategory,
} from '../../../api/adminCategories';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = id ? 'edit' : 'create';

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    image: '',
    images: '',
  });

  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchCategory();
    }
  }, [id, mode]);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const category = await adminGetCategoryById(id);
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        icon: category.icon || '',
        image: category.image || '',
        images: Array.isArray(category.images) ? category.images.join('\n') : '',
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching category:', err);
      setError('Không thể tải thông tin category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name) {
      setError('Vui lòng điền tên category');
      return;
    }

    try {
      setIsSubmitting(true);

      const imagesArray = formData.images
        ? formData.images
            .split(/\n|,/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description || undefined,
        icon: formData.icon || undefined,
        image: formData.image || imagesArray[0] || undefined,
        images: imagesArray.length ? imagesArray : undefined,
      };

      if (mode === 'create') {
        await adminCreateCategory(payload);
        alert('Tạo category thành công!');
      } else {
        await adminUpdateCategory(id, payload);
        alert('Cập nhật category thành công!');
      }

      navigate('/admin/categories');
    } catch (err) {
      console.error('Error submitting category:', err);
      setError(err.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverFile = async (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleIconFile = async (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, icon: url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryFiles = async (fileList) => {
    const files = fileList ? Array.from(fileList) : [];
    if (!files.length) return;
    try {
      setUploading(true);
      const uploaded = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      }
      setFormData((prev) => {
        const existing = prev.images
          ? prev.images
              .split(/\n|,/)
              .map((item) => item.trim())
              .filter(Boolean)
          : [];
        const combined = [...uploaded, ...existing];
        return {
          ...prev,
          image: prev.image || uploaded[0] || prev.image,
          images: combined.join('\n'),
        };
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {mode === 'create' ? 'Thêm category mới' : 'Chỉnh sửa category'}
        </h1>
        <button
          onClick={() => navigate('/admin/categories')}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← Quay lại
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tên category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Tự động tạo nếu để trống"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Icon (Emoji)</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="🦀"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <p className="text-xs text-slate-500 mt-1">Nhập emoji/icon hoặc tải ảnh phía dưới</p>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleIconFile(e.target.files)}
              className="text-sm"
            />
            {uploading && <span className="text-xs text-ocean-blue">Đang upload...</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh cover</label>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleCoverFile(e.target.files)}
              className="text-sm"
            />
            {formData.image && (
              <a
                href={formData.image}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 underline"
              >
                Xem ảnh hiện tại
              </a>
            )}
            {uploading && <span className="text-xs text-ocean-blue">Đang upload...</span>}
          </div>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Bộ sưu tập ảnh (mỗi URL một dòng)
          </label>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleGalleryFiles(e.target.files)}
              className="text-sm"
            />
            <span className="text-xs text-slate-500">
              Chọn nhiều ảnh từ máy/điện thoại, hệ thống sẽ tự upload lên Cloudinary.
            </span>
            {uploading && <span className="text-xs text-ocean-blue">Đang upload...</span>}
          </div>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            rows="4"
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-sm"
          />
          {formData.images && (
            <p className="text-xs text-slate-500 mt-1">
              Đã có {formData.images.split(/\n|,/).filter((item) => item.trim()).length} ảnh.
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang lưu...' : mode === 'create' ? 'Tạo category' : 'Cập nhật'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryFormPage;
