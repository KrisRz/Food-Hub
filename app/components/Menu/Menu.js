'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { MENU_ITEMS } from '@/lib/constants';
import Card from '@/ui/Card';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Badge from '@/ui/Badge';

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(MENU_ITEMS.map(item => item.category))];

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;
    
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} hover className="flex flex-col">
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-t-lg"
                priority={item.id <= 2}
                style={{ objectFit: 'cover' }}
              />
              <Badge 
                variant="primary" 
                className="absolute top-2 right-2 z-10"
              >
                {item.category}
              </Badge>
            </div>
            <div className="flex-grow p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 