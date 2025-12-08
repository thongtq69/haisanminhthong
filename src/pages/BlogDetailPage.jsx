import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../api/blog';

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

const renderContent = (content) => {
  if (typeof content === 'string') {
    const trimmed = content.trim();
    const looksHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);

    if (looksHtml) {
      return (
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: trimmed }}
        />
      );
    }

    return trimmed
      .split('\n\n')
      .filter(Boolean)
      .map((block, idx) => (
        <p key={idx} className="text-gray-700 leading-relaxed mb-4">
          {block}
        </p>
      ));
  }
  return null;
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImg = (title = 'Bài viết hải sản') =>
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%231565C0"/><text x="50%" y="50%" fill="white" font-size="22" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(
      title
    )}</text></svg>`;

  useEffect(() => {
    const fetchDetail = async () => {
      let found = null;
      try {
        const data = await getPostBySlug(slug);
        if (data && (data.slug || data.title || data.id)) {
          found = data;
        }
      } catch (err) {
        console.error('Error loading post detail', err);
      } finally {
        setPost(found);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-snow-bg pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-snow-bg pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Không tìm thấy bài viết.</p>
          <Link to="/blog" className="text-ocean-blue font-semibold hover:underline mt-4 inline-block">
            ← Quay lại danh sách blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-snow-bg pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link to="/blog" className="text-ocean-blue font-semibold hover:underline inline-block">
          ← Quay lại danh sách blog
        </Link>

        <header className="space-y-3">
          <p className="text-sm text-gray-600">
            {formatDate(post.publishedAt || post.createdAt)}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </header>

        {(post.image || post.thumbnail || post.coverImage) && (
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={post.image || post.thumbnail || post.coverImage}
              alt={`Bài viết hải sản Ghẹ Biển Hương Phi - ${post.title}`}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImg(post.title);
              }}
            />
          </div>
        )}

        <article className="bg-white rounded-xl shadow-md p-6 space-y-4">
          {renderContent(post.content || post.body || post.contentHtml || '')}
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;
