import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { getPosts } from '../api/blog';
import Button from './ui/Button';

const BlogCard = ({ post, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-christmas-red text-white px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-christmas-red transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Button variant="outline" size="sm">
          Đọc Thêm
        </Button>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts({ limit: 6 });
        // Transform data to match BlogCard format
        const transformedData = (response.data || []).map((post) => ({
          id: post._id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.thumbnail,
          date: new Date(post.publishedAt).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          category: post.tags?.[0] || 'Blog',
        }));
        setBlogPosts(transformedData);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
            Công Thức & Blog Mùa Đông
          </h2>
          <p className="text-xl text-gray-600">
            Mẹo vặt, công thức và hướng dẫn cho hành trình hải sản của bạn
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Đang tải bài viết...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

