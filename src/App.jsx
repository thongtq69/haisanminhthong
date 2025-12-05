import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import FlashSaleSection from './components/FlashSaleSection';
import FeatureSection from './components/FeatureSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <CategorySection />
      <ProductGrid />
      <FlashSaleSection />
      <FeatureSection />
      <BlogSection />
      <Footer />
    </div>
  );
}

export default App;
