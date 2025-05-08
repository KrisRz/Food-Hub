'use client';

import Badge from '@/app/ui/Badge';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FoodHub</h1>
            <p className="mt-1 text-sm text-gray-500">
              Your favorite food delivery platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="primary">Open Now</Badge>
            <Badge variant="success">Free Delivery</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}