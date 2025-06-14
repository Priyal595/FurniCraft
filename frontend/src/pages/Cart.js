import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Link } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout Process",
      description: "Redirecting to secure checkout...",
    });
    // Checkout functionality would be implemented here
  };

  const shipping = 49;
  const tax = getTotal() * 0.08;
  const total = getTotal() + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                <ArrowLeft className="mr-2" size={20} />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Items ({items.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive mt-2"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Free shipping on orders over $500</p>
                  <p>30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
