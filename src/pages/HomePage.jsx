import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import FlashSaleSection from '../components/FlashSaleSection';
import FeatureSection from '../components/FeatureSection';
import BlogSection from '../components/BlogSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <CategorySection />
      <ProductGrid />
      <FlashSaleSection />
      <FeatureSection />
      <BlogSection />
    </>
  );
};

export default HomePage;

