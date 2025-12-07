import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminDeletePost, adminGetPosts } from '../../../api/blogAdmin';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const fetchData = async () => {
    const res = await adminGetPosts({ search, status });
    setPosts(res.items || []);
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
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link to="/admin/blog/create" className="bg-ocean-blue text-white px-4 py-2 rounded-lg">
          + Bài viết mới
        </Link>
      </div>
      <div className="flex gap-3">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Tìm tiêu đề"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2"
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
                <td className="px-4 py-2 text-sm text-gray-900">{post.title}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{post.category || '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-700 capitalize">{post.status}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{post.isFeatured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 space-x-2">
                  <Link className="text-ocean-blue" to={`/admin/blog/${post._id}/edit`}>Edit</Link>
                  <button className="text-christmas-red" onClick={() => handleDelete(post._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogListPage;
