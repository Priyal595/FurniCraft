import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Handcrafted furniture with attention to detail'
    },
    {
      icon: Shield,
      title: '5-Year Warranty',
      description: 'Extended warranty on all furniture pieces'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free shipping on orders over $500'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Customer support whenever you need it'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-orange-50">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop)',
            opacity: 0.3
          }}
        />
        <div className="relative text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6">
            FurniCraft
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your space with our premium furniture collection. 
            Experience luxury, comfort, and style in every piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8 py-6 text-lg" aria-label="Shop Collection">
              <Link to="/products">
                Shop Collection <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg" aria-label="Learn More About FurniCraft">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Choose FurniCraft?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing you with the finest furniture 
              and exceptional service experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our most popular furniture pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Living Room',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
                description: 'Comfortable sofas and chairs'
              },
              {
                title: 'Dining Room',
                image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=400&fit=crop',
                description: 'Elegant tables and seating'
              },
              {
                title: 'Office',
                image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&h=400&fit=crop',
                description: 'Ergonomic and stylish workspace'
              }
            ].map((collection, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{collection.title}</h3>
                    <p className="text-white/90">{collection.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" aria-label="View All Products">
              <Link to="/products">
                View All Products <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
