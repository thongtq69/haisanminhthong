import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminCreatePost, adminGetPost, adminUpdatePost } from '../../../api/blogAdmin';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const BlogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    tags: '',
    coverImage: '',
    excerpt: '',
    content: '',
    isFeatured: false,
    status: 'draft',
    publishedAt: '',
    seoTitle: '',
    seoDescription: '',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEdit) return;
      const res = await adminGetPost(id);
      const data = res.data;
      setForm({
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || '',
        tags: (data.tags || []).join(', '),
        coverImage: data.coverImage || data.thumbnail || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        isFeatured: data.isFeatured || false,
        status: data.status || 'draft',
        publishedAt: data.publishedAt ? data.publishedAt.substring(0, 16) : '',
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
      });
    };
    fetchData();
  }, [id, isEdit]);

  const handleChange = (field) => (e) => {
    const value = field === 'isFeatured' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoverFile = async (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (statusOverride) => {
    const payload = {
      ...form,
      status: statusOverride || form.status,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (isEdit) {
      await adminUpdatePost(id, payload);
    } else {
      await adminCreatePost(payload);
    }
    navigate('/admin/blog');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}</h1>
        <div className="space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() => handleSubmit('draft')}
          >
            Lưu nháp
          </button>
          <button
            className="bg-ocean-blue text-white px-4 py-2 rounded-lg"
            onClick={() => handleSubmit('published')}
          >
            Xuất bản
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Tiêu đề"
            value={form.title}
            onChange={handleChange('title')}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Slug (để trống để tự tạo)"
            value={form.slug}
            onChange={handleChange('slug')}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Category"
            value={form.category}
            onChange={handleChange('category')}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Tags (phân cách bằng dấu phẩy)"
            value={form.tags}
            onChange={handleChange('tags')}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Cover image URL"
            value={form.coverImage}
            onChange={handleChange('coverImage')}
          />
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <input type="file" accept="image/*" onChange={(e) => handleCoverFile(e.target.files)} />
            <span className="text-xs">Chọn ảnh từ máy/điện thoại, sẽ upload lên Cloudinary</span>
            {uploading && <span className="text-xs text-ocean-blue">Đang upload...</span>}
          </div>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={handleChange('excerpt')}
          />
        </div>

        <div className="space-y-3">
          <textarea
            className="w-full border rounded-lg px-3 py-2 h-48"
            placeholder="Content (HTML/Markdown)"
            value={form.content}
            onChange={handleChange('content')}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange('isFeatured')}
            />
            <label htmlFor="isFeatured">Featured</label>
          </div>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={form.status}
            onChange={handleChange('status')}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <input
            type="datetime-local"
            className="w-full border rounded-lg px-3 py-2"
            value={form.publishedAt}
            onChange={handleChange('publishedAt')}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="SEO Title"
            value={form.seoTitle}
            onChange={handleChange('seoTitle')}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={2}
            placeholder="SEO Description"
            value={form.seoDescription}
            onChange={handleChange('seoDescription')}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogFormPage;
