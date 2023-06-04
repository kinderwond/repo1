import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/products-search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
      <div>
        <h1>Product Search</h1>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((product) => (
              <li key={product._id}>
                <p>Name: {product.translated_name}</p>
                <p>Calories: {product.calories}</p>
                <p>Fat: {product.fat}</p>
                <p>Protein: {product.protein}</p>
                <p>Carbohydrate: {product.carbohydrate}</p>
              </li>
          ))}
        </ul>
      </div>
  );
}
