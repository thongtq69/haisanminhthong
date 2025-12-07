import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getPosts } from '../api/blog';
import { Link } from 'react-router-dom';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('vi-VN');

const placeholderSvg = (title) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="800" height="450" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="28" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(title)}</text></svg>`;

const BlogCard = ({ post, large = false }) => (
  <motion.article
    whileHover={{ y: -4, scale: 1.01 }}
    className={`bg-white rounded-xl shadow-md overflow-hidden ${large ? 'md:col-span-2' : ''}`}
  >
    <Link to={`/blog/${post.slug}`}>
      <div className={`${large ? 'h-72' : 'h-48'} overflow-hidden`}>
        <img
          src={post.coverImage || post.thumbnail || placeholderSvg(post.title)}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {post.category && <span className="px-2 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs">{post.category}</span>}
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-christmas-red">{post.title}</h3>
        <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  </motion.article>
);

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const params = useMemo(() => {
    const p = { page, limit: 9, status: 'published' };
    if (search) p.search = search;
    if (category) p.category = category;
    return p;
  }, [page, search, category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts(params);
        const items = res.items || res.data || [];
        setTotal(res.total || items.length);
        const feat = items.find((p) => p.isFeatured);
        setFeatured(feat || null);
        setPosts(items.filter((p) => p !== feat));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(total / 9));

  return (
    <main className="bg-snow-bg min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="text-center space-y-3">
          <p className="text-sm uppercase tracking-wide text-ocean-blue font-semibold">Góc chia sẻ</p>
          <h1 className="text-4xl font-bold text-gray-900">Hải sản & Công thức ngon</h1>
          <p className="text-gray-700">Cảm hứng nấu ăn, tips bảo quản, khuyến mãi mùa lễ hội.</p>
          <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
            <input
              className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              placeholder="Tìm bài viết..."
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            />
            <input
              className="border rounded-lg px-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              placeholder="Danh mục (vd: Công thức)"
              value={category}
              onChange={(e) => { setPage(1); setCategory(e.target.value); }}
            />
          </div>
        </section>

        {featured && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Bài viết nổi bật</h2>
            <BlogCard post={featured} large />
          </section>
        )}

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </section>

        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Trang trước
          </button>
          <span>Trang {page}/{totalPages}</span>
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Trang sau
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogListPage;
