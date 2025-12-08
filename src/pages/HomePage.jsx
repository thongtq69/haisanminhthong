import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import FlashSaleSection from '../components/FlashSaleSection';
import FeatureSection from '../components/FeatureSection';
import BlogSection from '../components/BlogSection';

const HomePage = () => {
  return (
    <main className="bg-white">
      <header className="sr-only">
        <h1>Ghẹ Biển Hương Phi – Ghẹ Xanh Tươi Sống &amp; Hải Sản Giao Nhanh</h1>
      </header>

      <HeroSection />
      <SearchBar />
      <CategorySection />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Combo ghẹ biển tươi sống cho gia đình và dịp Noel
        </h2>
        <p className="text-gray-700">
          Ghẹ tươi, đóng thùng đá, giữ lạnh, tiện lợi cho các bữa tiệc gia đình, đặc biệt dịp Noel. Đặt hàng online nhanh chóng, đảm bảo chất lượng ghẹ xanh tươi sống.
        </p>
        <a className="text-ocean-blue font-semibold hover:underline" href="/combo-noel">
          Xem combo ghẹ Noel
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Ghẹ xanh tươi mỗi ngày – chọn kỹ, giữ độ ngọt thịt
        </h2>
        <p className="text-gray-700">
          Ghẹ được chọn kỹ từng con, giữ lạnh đúng chuẩn để bảo toàn độ ngọt thịt và vị umami tự nhiên. Nguồn gốc rõ ràng, giao nhanh trong ngày.
        </p>
        <a className="text-ocean-blue font-semibold hover:underline" href="/san-pham">
          Xem sản phẩm hải sản tươi sống
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Giao hàng nhanh &amp; đặt ghẹ online</h2>
        <p className="text-gray-700">
          Chọn sản phẩm, thêm vào giỏ và đặt online. Ghẹ được đóng thùng đá, giữ lạnh, giao nhanh trong khu vực nội thành. Hỗ trợ tư vấn, xác nhận đơn qua điện thoại.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Lý do nên chọn Ghẹ Biển Hương Phi</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Ghẹ tươi sống, chọn kỹ từng con</li>
          <li>Đóng thùng đá đảm bảo chất lượng</li>
          <li>Giao hàng nhanh</li>
          <li>Giá tốt, minh bạch</li>
        </ul>
      </section>

      <ProductGrid />
      <FlashSaleSection />
      <FeatureSection />
      <BlogSection />
    </main>
  );
};

export default HomePage;
