import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  adminGetProductById,
  adminCreateProduct,
  adminUpdateProduct,
} from '../../../api/adminProducts';
import { adminGetCategories } from '../../../api/adminCategories';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = id ? 'edit' : 'create';

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    type: 'crab',
    price: '',
    originalPrice: '',
    description: '',
    shortDescription: '',
    images: '',
    tags: '',
    origin: '',
    status: 'available',
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();

    if (mode === 'edit' && id) {
      fetchProduct();
    }
  }, [id, mode]);

  const fetchCategories = async () => {
    try {
      const data = await adminGetCategories();
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const product = await adminGetProductById(id);
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category?._id || product.category || '',
        type: product.type || 'crab',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        images: Array.isArray(product.images) ? product.images.join('\n') : '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
        origin: product.origin || '',
        status: product.status || 'available',
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Không thể tải thông tin sản phẩm');
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
    if (!formData.name || !formData.category || !formData.price) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc (Tên, Category, Price)');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare payload
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        category: formData.category,
        type: formData.type,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        shortDescription: formData.shortDescription,
        images: formData.images,
        tags: formData.tags,
        origin: formData.origin || undefined,
        status: formData.status,
      };

      if (mode === 'create') {
        await adminCreateProduct(payload);
        alert('Tạo sản phẩm thành công!');
      } else {
        await adminUpdateProduct(id, payload);
        alert('Cập nhật sản phẩm thành công!');
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('Error submitting product:', err);
      setError(err.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageFile = async (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        images: prev.images ? `${url}\n${prev.images}` : url,
      }));
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
          {mode === 'create' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
        </h1>
        <button
          onClick={() => navigate('/admin/products')}
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

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tên sản phẩm <span className="text-red-500">*</span>
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
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">Chọn category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="crab">Crab</option>
              <option value="seafood">Seafood</option>
              <option value="combo">Combo</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">
              Nếu có, sản phẩm sẽ tự động được đánh dấu là đang sale
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Origin</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Ví dụ: Cà Mau, Phú Quốc"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Images (URLs, mỗi URL một dòng)
          </label>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageFile(e.target.files)}
              className="text-sm"
            />
            <span className="text-xs text-slate-500">Chọn ảnh từ máy/điện thoại để tự động đính kèm (data URL)</span>
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
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ghẹ xanh, tươi sống, Noel"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang lưu...' : mode === 'create' ? 'Tạo sản phẩm' : 'Cập nhật'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
