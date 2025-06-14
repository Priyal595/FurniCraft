
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Box,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { useCartStore } from '../stores/cartStore';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const nextImage = () =>
    setCurrentImageIndex((idx) =>
      idx === product.images.length - 1 ? 0 : idx + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((idx) =>
      idx === 0 ? product.images.length - 1 : idx - 1
    );

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* ── image carousel ─────────────────────────── */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </div>

        {/* ── details ─────────────────────────────────── */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>⭐</span>
              <span>{product.rating}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={handleAddToCart} className="w-full">
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => alert('AR View feature coming soon!')}
            >
              <Box size={16} className="mr-2" />
              AR View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
