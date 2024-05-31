import React, { useState, useEffect } from 'react';

const RandomFilter = ({ onUpdateFilters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:5000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Extract fits and fabric types from data
  console.log(data);
  const fits = [...new Set(data.map((product) => product.fit))];
  const fabricTypes = [...new Set(data.map((product) => product.fabric_type))];

  const handleFilterClick = (filterType, value) => {
    onUpdateFilters(filterType, value);
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <h3>Fits</h3>
        {fits.map((fit) => (
          <button
            key={fit}
            onClick={() => handleFilterClick('fit', fit)}
          >
            {fit}
          </button>
        ))}
      </div>
      <div>
        <h3>Fabric Types</h3>
        {fabricTypes.map((fabricType) => (
          <button
            key={fabricType}
            onClick={() => handleFilterClick('fabric_type', fabricType)}
          >
            {fabricType}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RandomFilter;
