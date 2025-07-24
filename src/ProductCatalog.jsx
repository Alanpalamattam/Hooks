import React, { useState, useEffect } from 'react';

const mockProducts = [
  { id: 1, name: 'iPhone 14', category: 'Electronics', brand: 'Apple', price: 999 },
  { id: 2, name: 'Galaxy S22', category: 'Electronics', brand: 'Samsung', price: 899 },
  { id: 3, name: 'MacBook Pro', category: 'Computers', brand: 'Apple', price: 1999 },
  { id: 4, name: 'Dell XPS 13', category: 'Computers', brand: 'Dell', price: 1199 },
  { id: 5, name: 'Sony WH-1000XM5', category: 'Accessories', brand: 'Sony', price: 399 },
  { id: 6, name: 'Surface Laptop', category: 'Computers', brand: 'Microsoft', price: 1299 },
];

export default function ProductCatalog() {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const [category, setCategory] = useState('');
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = [...new Set(products.map(p => p.category))];
  const brandList = [...new Set(products.map(p => p.brand))];

  useEffect(() => {
    let result = [...products];

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (brands.length > 0) {
      result = result.filter(p => brands.includes(p.brand));
    }

    if (minPrice !== '') {
      result = result.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(result);
  }, [category, brands, minPrice, maxPrice, products]);

  const handleBrandChange = (brand) => {
    setBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setCategory('');
    setBrands([]);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Product Catalog</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Brands */}
        <div>
          <label className="block font-semibold mb-2">Brand</label>
          <div className="border rounded p-2 max-h-40 overflow-y-auto">
            {brandList.map(brand => (
              <label key={brand} className="block">
                <input
                  type="checkbox"
                  checked={brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-semibold mb-2">Price Range ($)</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Product Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Brand: {product.brand}</p>
              <p className="text-sm text-green-700 font-semibold mt-2">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No products match the selected filters.</p>
        )}
      </div>
    </div>
  );
}
