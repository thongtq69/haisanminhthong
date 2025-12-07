import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminGetProducts } from '../../api/adminProducts';
import { adminGetCategories } from '../../api/adminCategories';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categories] = await Promise.all([
          adminGetProducts({ limit: 1 }),
          adminGetCategories(),
        ]);

        setStats({
          products: productsRes.meta?.total || 0,
          categories: categories.length || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ products: 0, categories: 0, loading: false });
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.products}</p>
            </div>
            <div className="text-4xl">🦀</div>
          </div>
          <Link
            to="/admin/products"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Categories</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.categories}</p>
            </div>
            <div className="text-4xl">📁</div>
          </div>
          <Link
            to="/admin/categories"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            + Add Product
          </Link>
          <Link
            to="/admin/categories/new"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            + Add Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

