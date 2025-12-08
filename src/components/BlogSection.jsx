import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';
import { getPosts } from '../api/blog';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const buildFallbackDataUri = (title = 'Bài viết hải sản') =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill=\"%231565C0\"/><text x=\"50%\" y=\"50%\" fill=\"white\" font-size=\"22\" font-family=\"Arial\" text-anchor=\"middle\" dominant-baseline=\"middle\">${encodeURIComponent(
    title
  )}</text></svg>`;

const BlogCard = ({ post, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const displayImage =
    post.image ||
    post.thumbnail ||
    post.coverImage ||
    buildFallbackDataUri(post.title);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={displayImage}
          alt={`Bài viết hải sản Ghẹ Biển Hương Phi - ${post.title}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = buildFallbackDataUri(post.title);
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-christmas-red text-white px-3 py-1 rounded-full text-sm font-semibold">
            {post.tags?.[0] || 'Blog'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{formatDate(post.publishedAt)}</p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-christmas-red transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-ocean-blue font-semibold hover:underline inline-flex items-center gap-1"
        >
          Đọc tiếp
        </Link>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts({ limit: 6, status: 'published' });
        const items = res.items || res.data || [];
        setApiPosts(items);
      } catch (err) {
        console.error('Error fetching blog posts for home:', err);
        setApiPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const postsToShow = useMemo(() => {
    const normalizedApi = apiPosts.map((p) => ({
      id: p.id || p._id || p.slug,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || '',
      image: p.image || p.thumbnail || p.coverImage,
      publishedAt: p.publishedAt || p.createdAt,
      tags: p.tags || [],
    }));

    const normalizedStatic = staticBlogPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      image: p.image,
      publishedAt: p.publishedAt,
      tags: p.tags || [],
    }));

    if (normalizedApi.length >= 3) {
      return [...normalizedApi]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3);
    }

    const merged = [...normalizedApi];
    normalizedStatic.forEach((s) => {
      if (merged.length >= 3) return;
      const exists = merged.some((p) => p.slug === s.slug);
      if (!exists) merged.push(s);
    });

    if (merged.length > 0) {
      return [...merged]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3);
    }

    return [...normalizedStatic]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);
  }, [apiPosts]);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Công Thức &amp; Blog Mùa Đông
          </h2>
          <p className="text-xl text-gray-600">
            Mẹo vặt, công thức và hướng dẫn cho hành trình hải sản của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
