import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './components/ProductDetail/ProductDetailPage';
import CrabAndSeafoodCategoryPage from './pages/categories/CrabAndSeafoodCategoryPage';
import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProductListPage from './admin/pages/products/ProductListPage';
import ProductFormPage from './admin/pages/products/ProductFormPage';
import CategoryListPage from './admin/pages/categories/CategoryListPage';
import CategoryFormPage from './admin/pages/categories/CategoryFormPage';
import OrderListPage from './admin/pages/orders/OrderListPage';
import AdminBlogListPage from './admin/pages/blog/BlogListPage';
import AdminBlogFormPage from './admin/pages/blog/BlogFormPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import BlogListPublicPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <CartProvider>
              <div className="min-h-screen">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route
                    path="/danh-muc-ghe-hai-san"
                    element={<CrabAndSeafoodCategoryPage />}
                  />
                  <Route path="/blog" element={<BlogListPublicPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                </Routes>
                <Footer />
              </div>
            </CartProvider>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:id/edit" element={<ProductFormPage />} />
          <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/:id/edit" element={<CategoryFormPage />} />
          <Route path="orders" element={<OrderListPage />} />
          <Route path="blog" element={<AdminBlogListPage />} />
          <Route path="blog/create" element={<AdminBlogFormPage />} />
          <Route path="blog/:id/edit" element={<AdminBlogFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
