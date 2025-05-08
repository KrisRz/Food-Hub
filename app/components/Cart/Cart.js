'use client';

import { useState } from 'react';
import { calculateTotal, formatPrice } from '@/app/lib/utils';
import Card from '@/app/ui/Card';
import Button from '@/app/ui/Button';
import Badge from '@/app/ui/Badge';

function Cart({ items, onRemoveItem, onUpdateQuantity }) {
  const [showPayment, setShowPayment] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const total = calculateTotal(items);

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
  };

  const handleBackToCart = () => {
    setShowPayment(false);
    setOrderComplete(false);
  };

  if (orderComplete) {
    return (
      <Card className="text-center p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Order Complete!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll start preparing your food right away.
        </p>
        <Button onClick={handleBackToCart} variant="primary">
          Place Another Order
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      
      {items.length === 0 ? (
        <Card className="text-center p-8">
          <p className="text-gray-500">Your cart is empty</p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <div className="w-20 h-20 mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-primary font-medium">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ×
                    </Button>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-4 font-medium">{item.quantity}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(total)}
              </span>
            </div>
            
            {!showPayment ? (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleBackToCart}
                >
                  ← Back to Cart
                </Button>
                <div className="text-center">
                  <Badge variant="warning">
                    Payment processing will be implemented here
                  </Badge>
                </div>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default Cart; 