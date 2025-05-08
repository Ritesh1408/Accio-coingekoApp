import React, { useEffect, useState } from 'react';
import CryptoRow from './components/CryptoRow';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filters, setFilters] = useState({
    price: 'all',
    marketCap: 'all',
  });

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCryptoData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Sorting handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply filtering + search + sort
  useEffect(() => {
    let data = [...cryptoData];

    // Filter
    if (filters.price !== 'all') {
      const limit = parseInt(filters.price);
      data = data.filter(coin => coin.current_price <= limit);
    }

    if (filters.marketCap !== 'all') {
      const limit = parseInt(filters.marketCap);
      data = data.filter(coin => coin.market_cap <= limit);
    }

    // Search
    if (searchTerm.trim() !== '') {
      data = data.filter(
        coin =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    if (sortConfig.key) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }

    setFilteredData(data);
  }, [searchTerm, filters, sortConfig, cryptoData]);

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Top 10 Cryptocurrencies</h1>

      {/* Search and Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '8px', marginRight: '1rem' }}
        />

        <label>Price Filter:</label>
        <select name="price" onChange={handleFilterChange} style={{ margin: '0 1rem' }}>
          <option value="all">All</option>
          <option value="100">≤ $100</option>
          <option value="1000">≤ $1000</option>
          <option value="10000">≤ $10,000</option>
        </select>

        <label>Market Cap Filter:</label>
        <select name="marketCap" onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="10000000">≤ $10M</option>
          <option value="10000000">≤ $1B</option>
          <option value="10000000000">≤ $10B</option>
        </select>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('current_price')}>
              Price (USD) {sortConfig.key === 'current_price' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('market_cap')}>
              Market Cap {sortConfig.key === 'market_cap' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((coin, index) => (
              <CryptoRow key={coin.id} coin={coin} index={index + 1} />
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
