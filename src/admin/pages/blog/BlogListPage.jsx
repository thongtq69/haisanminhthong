import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminDeletePost, adminGetPosts } from '../../../api/blogAdmin';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminGetPosts({ search, status });
      setPosts(res.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, status]);

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa bài viết này?')) return;
    await adminDeletePost(id);
    fetchData();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Blog</h1>
        <Link to="/admin/blog/create" className="bg-ocean-blue text-white px-4 py-2 rounded-lg">
          + Bài viết mới
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          className="border rounded-lg px-3 py-2 w-full md:w-64"
          placeholder="Tìm tiêu đề"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 w-full md:w-48"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cover</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tiêu đề</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Featured</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="px-4 py-2">
                  {post.coverImage || post.thumbnail ? (
                    <img
                      src={post.coverImage || post.thumbnail}
                      alt={post.title}
                      className="w-14 h-14 rounded object-cover border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded bg-gray-100 border" />
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 max-w-xs">
                  <div className="font-semibold line-clamp-2">{post.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{post.excerpt || post.shortDescription}</div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{post.category || '-'}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{post.isFeatured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {post.publishedAt || post.createdAt
                    ? new Date(post.publishedAt || post.createdAt).toLocaleDateString('vi-VN')
                    : '-'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 space-x-2">
                  <Link className="text-ocean-blue" to={`/admin/blog/${post._id}/edit`}>
                    Edit
                  </Link>
                  <button className="text-christmas-red" onClick={() => handleDelete(post._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="text-sm text-gray-500 mt-2">Đang tải...</p>}
      </div>
    </div>
  );
};

export default BlogListPage;
