import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'seafood_cart';

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [], mode: 'cart' };
  } catch {
    return { items: [], mode: 'cart' };
  }
};

const saveCart = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState('cart'); // cart | buy_now

  useEffect(() => {
    const stored = loadCart();
    setItems(stored.items || []);
    setMode(stored.mode || 'cart');
  }, []);

  useEffect(() => {
    saveCart({ items, mode });
  }, [items, mode]);

  const addToCart = (item) => {
    setMode('cart');
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product === item.product && i.variantKey === item.variantKey
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + item.quantity };
        return updated;
      }
      return [...prev, item];
    });
  };

  const setBuyNow = (item) => {
    setMode('buy_now');
    setItems([item]);
  };

  const clearCart = () => {
    setItems([]);
    setMode('cart');
  };

  return (
    <CartContext.Provider value={{ items, mode, addToCart, setBuyNow, clearCart, setMode, setItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
