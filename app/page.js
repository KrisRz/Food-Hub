'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Menu from '@/components/Menu/Menu';
import Cart from '@/components/Cart/Cart';
import FoodOrderForm from '@/components/FoodOrderForm/FoodOrderForm';
import Button from '@/ui/Button';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="flex-grow">
          <Menu onAddToCart={addToCart} />
        </div>
        <div className="w-1/3 min-w-[300px] p-4 bg-gray-50">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowCart(!showCart)}
            className="mb-4"
          >
            {showCart ? 'Hide Cart' : 'Show Cart'}
          </Button>
          {showCart ? (
            <Cart
              items={cartItems}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ) : (
            <FoodOrderForm />
          )}
        </div>
      </div>
    </main>
  );
} 