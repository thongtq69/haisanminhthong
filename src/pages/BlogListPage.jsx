import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPosts } from '../api/blog';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const FeaturedBlogCard = ({ post }) => (
  <motion.article
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl shadow-md overflow-hidden"
  >
    <Link to={`/blog/${post.slug}`}>
      {post.image || post.thumbnail || post.coverImage ? (
        <div className="h-64 md:h-96 overflow-hidden">
          <img
            src={post.image || post.thumbnail || post.coverImage}
            alt={`Bài viết hải sản Ghẹ Biển Hương Phi - ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="px-2 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs font-semibold">
            {post.tags?.[0] || 'Blog'}
          </span>
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-christmas-red">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
        )}
        <span className="text-ocean-blue font-semibold hover:underline inline-flex items-center gap-1">
          Đọc tiếp
        </span>
      </div>
    </Link>
  </motion.article>
);

const BlogCard = ({ post, index }) => (
  <motion.article
    whileHover={{ y: -4, scale: 1.01 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-white rounded-xl shadow-md overflow-hidden"
  >
    <Link to={`/blog/${post.slug}`}>
      {post.image || post.thumbnail || post.coverImage ? (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image || post.thumbnail || post.coverImage}
            alt={`Bài viết hải sản Ghẹ Biển Hương Phi - ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs">
            {post.tags?.[0] || 'Blog'}
          </span>
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-christmas-red">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
        )}
        <span className="text-ocean-blue font-semibold hover:underline inline-flex items-center gap-1">
          Đọc tiếp
        </span>
      </div>
    </Link>
  </motion.article>
);

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts({ limit: 50, status: 'published' });
        const items = res.items || res.data || [];
        setPosts(items);
      } catch (err) {
        console.error('Error loading posts', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q)
      );
    }

    if (category.trim()) {
      const c = category.toLowerCase();
      result = result.filter(
        (p) =>
          (p.tags || []).some((t) => t.toLowerCase().includes(c)) ||
          (p.category || '').toLowerCase().includes(c)
      );
    }

    result.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
    );

    return result;
  }, [posts, search, category]);

  const featuredPost = useMemo(() => {
    if (!filteredPosts.length) return null;
    const byFlag = filteredPosts.find((p) => p.isFeatured);
    return byFlag || filteredPosts[0];
  }, [filteredPosts]);

  const otherPosts = useMemo(() => {
    if (!featuredPost) return [];
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  return (
    <main className="bg-snow-bg min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <p className="text-sm uppercase tracking-wide text-ocean-blue font-semibold">
            Góc chia sẻ
          </p>
          <h1 className="text-4xl font-bold text-gray-900">
            Hải sản &amp; Công thức ngon
          </h1>
          <p className="text-gray-700">
            Cảm hứng nấu ăn, tips bảo quản, khuyến mãi mùa lễ hội.
          </p>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
            <input
              className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              placeholder="Tìm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="border rounded-lg px-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              placeholder="Danh mục (vd: Công thức, Kinh nghiệm...)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </section>

        {loading && <p className="text-gray-600 text-center">Đang tải bài viết...</p>}

        {!loading && filteredPosts.length === 0 && (
          <p className="text-gray-600 text-center">
            Chưa có bài viết phù hợp với từ khóa / danh mục.
          </p>
        )}

        {!loading && featuredPost && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Bài viết nổi bật</h2>
            <FeaturedBlogCard post={featuredPost} />
          </section>
        )}

        {!loading && otherPosts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Bài viết khác</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <BlogCard
                  key={post.id || post._id || post.slug || index}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default BlogListPage;
