import { Link, useLocation } from 'react-router-dom';
import {
  Home, Info, Phone, Package, User,
  ShoppingCart, Palette
} from 'lucide-react';

import { useCartStore } from '../stores/cartStore';

const Navbar = () => {
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home',        path: '/',           icon: Home },
    { name: 'Products',    path: '/products',   icon: Package },
    { name: 'Style Match', path: '/style-match',icon: Palette },   // NEW
    { name: 'About',       path: '/about',      icon: Info },
    { name: 'Contact',     path: '/contact',    icon: Phone },
    { name: 'Login',       path: '/login',      icon: User },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-primary"
          >
            FurniCraft
          </Link>

          {/* ── Nav links ───────────────────────────────────── */}
          <div className="flex items-center space-x-8">
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            ))}

            {/* ── Cart ──────────────────────────────────────── */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
