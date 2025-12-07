import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPostBySlug, getPosts } from '../api/blog';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('vi-VN');
const placeholderSvg = (title) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="1200" height="600" fill="url(%23grad)"/><text x="50%" y="50%" fill="white" font-size="36" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(title)}</text></svg>`;

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
        const rel = await getPosts({ category: data.category, limit: 5, status: 'published' });
        setRelated((rel.items || []).filter((p) => p.slug !== slug));
        document.title = data.seoTitle || data.title;
      } catch (err) {
        console.error(err);
        navigate('/blog');
      }
    };
    fetchPost();
  }, [slug, navigate]);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-snow-bg pt-20">
        <p>Đang tải bài viết...</p>
      </main>
    );
  }

  return (
    <main className="bg-snow-bg min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-sm text-gray-600 flex gap-2">
          <Link to="/" className="hover:text-christmas-red">Trang chủ</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-christmas-red">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{post.title}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {post.category && <span className="px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs">{post.category}</span>}
            <span className="text-sm text-gray-600">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="text-lg text-gray-700">{post.excerpt}</p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={post.coverImage || post.thumbnail || placeholderSvg(post.title)}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        </div>

        <article
          className="prose max-w-none prose-lg bg-white p-6 rounded-xl shadow"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <section className="bg-white p-6 rounded-xl shadow space-y-3">
          <h3 className="text-xl font-bold text-gray-900">Bài viết liên quan</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r._id} to={`/blog/${r.slug}`} className="block border rounded-lg p-3 hover:border-ocean-blue">
                <div className="flex gap-3">
                  <div className="w-24 h-20 rounded bg-gray-100 overflow-hidden">
                    <img
                      src={r.coverImage || r.thumbnail || placeholderSvg(r.title)}
                      alt={r.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">{formatDate(r.publishedAt || r.createdAt)}</div>
                    <div className="font-semibold text-gray-900 line-clamp-2">{r.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BlogDetailPage;
