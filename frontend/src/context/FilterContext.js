import { createContext, useContext, useState } from 'react';

/* ---------- Context hooks ---------- */
const FilterContext = createContext();
export const useFilter = () => useContext(FilterContext);

/* ---------- Provider ---------- */
export const FilterProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState('all'); // "chair", "sofa", …
  const [priceFilter,    setPriceFilter]    = useState('all'); // "under-500", …

  const value = {
    categoryFilter,
    setCategoryFilter,
    priceFilter,
    setPriceFilter,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
