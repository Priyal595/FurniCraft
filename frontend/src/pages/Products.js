import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { products } from '../data/products';
import ProductCard  from '../components/ProductCard';
import { Button }   from '../components/ui/button';
import { Input }    from '../components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useFilter } from '../context/FilterContext';

/* Helper to normalise categories */
const normalize = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, ' ').replace(/s$/, '');

const Products = () => {
  /* shared filters */
  const {
    categoryFilter, setCategoryFilter,
    priceFilter,    setPriceFilter,
  } = useFilter();

  /* local state */
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy,     setSortBy]     = useState('name');
  const [viewMode,   setViewMode]   = useState('grid');

  /* ─── React to URL params (voice navigation) ─── */
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const cat = params.get('category');
    if (cat) setCategoryFilter(cat.toLowerCase().trim());

    const max = parseInt(params.get('max'), 10);
    if (!isNaN(max)) {
      if (max < 500)          setPriceFilter('under-500');
      else if (max <= 1000)   setPriceFilter('500-1000');
      else if (max <= 2000)   setPriceFilter('1000-2000');
      else                    setPriceFilter('over-2000');
    }
  }, [location.search, setCategoryFilter, setPriceFilter]);

  /* ─── Options & derived list ─── */
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredAndSorted = useMemo(() => {
    const filterCatNorm = normalize(categoryFilter);

    let list = products.filter((p) => {
      const prodCatNorm = normalize(p.category);

      const matchesCat =
        filterCatNorm === 'all' ||
        prodCatNorm === filterCatNorm ||
        prodCatNorm.includes(filterCatNorm) ||
        filterCatNorm.includes(prodCatNorm);

      let matchesPrice = true;
      switch (priceFilter) {
        case 'under-500':   matchesPrice = p.price < 500; break;
        case '500-1000':    matchesPrice = p.price >= 500  && p.price <= 1000; break;
        case '1000-2000':   matchesPrice = p.price >= 1000 && p.price <= 2000; break;
        case 'over-2000':   matchesPrice = p.price > 2000; break;
        default: matchesPrice = true;
      }

      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCat && matchesPrice && matchesSearch;
    });

    list.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':  return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating':     return b.rating - a.rating;
        default:           return a.name.localeCompare(b.name);
      }
    });

    return list;
  }, [searchTerm, categoryFilter, priceFilter, sortBy]);

  /* ─── UI ─── */
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection of premium furniture
          </p>
        </div>

        {/* filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20}/>
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* category */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger><SelectValue placeholder="Category"/></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === 'all' ? 'All Categories' : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* price */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger><SelectValue placeholder="Price Range"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 – ₹1 000</SelectItem>
                  <SelectItem value="1000-2000">₹1 000 – ₹2 000</SelectItem>
                  <SelectItem value="over-2000">Over ₹2 000</SelectItem>
                </SelectContent>
              </Select>

              {/* sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger><SelectValue placeholder="Sort By"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* view toggle */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid size={16}/>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List size={16}/>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* result count */}
        <div className="mb-4 text-muted-foreground">
          Showing {filteredAndSorted.length} of {products.length} products
        </div>

        {/* grid / list */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredAndSorted.map((p) => (
            <ProductCard key={p.id} product={p} view={viewMode}/>
          ))}
        </div>

        {/* empty state */}
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
