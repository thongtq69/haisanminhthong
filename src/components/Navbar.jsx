import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IconCrab, IconBell } from './ui/Icons';
import Badge from './ui/Badge';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href, e) => {
    e.preventDefault();

    // If it's a route (starts with /), use navigate
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
      return;
    }

    // Handle anchor links (#)
    if (href.startsWith('#')) {
      const sectionId = href.substring(1); // Remove #

      // If not on homepage, navigate to homepage first
      if (!isHomePage) {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        // Already on homepage, just scroll
        scrollToSection(sectionId);
      }
      return;
    }

    // Handle "Trang chủ" or root
    if (href === '/' || href === '#hero') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Ghẹ tươi sống', href: '#products' },
    { label: 'Ghẹ chế biến', href: '#products' },
    { label: 'Combo Giáng sinh', href: '#combos' },
    { label: 'Hải sản khác', href: '#categories' },
    { label: 'Công thức / Blog', href: '/blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <IconCrab className="w-8 h-8" />
            <span className="text-2xl font-bold text-ocean-blue">Ghẹ Biển Hương Phi</span>
          </motion.div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                whileHover={{ y: -2 }}
                className="text-gray-700 hover:text-christmas-red font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-700 hover:text-christmas-red"
            >
              <IconBell className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-700 hover:text-christmas-red"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-700 hover:text-christmas-red"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 bg-christmas-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>

            <motion.a
              href="tel:+84123456789"
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-accent-blue transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold">Hotline</span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:block"
            >
              <Badge color="christmas-red">Khuyến mãi Noel</Badge>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
