// src/components/CryptoRow.js
import React from 'react';

const CryptoRow = ({ coin, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <img src={coin.image} alt={coin.name} width="30" height="30" />
      </td>
      <td>{coin.name}</td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>${coin.market_cap.toLocaleString()}</td>
    </tr>
  );
};

export default CryptoRow;
