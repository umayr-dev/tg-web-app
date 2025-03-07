import React from 'react';
import './index.css';

const App = () => {
  const cards = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`);

  return (
    <div className="container">
      <h1 className="title">Mahsulotlar Kategoriyasi</h1>
      <div className="grid">
        {cards.map((card, index) => (
          <div key={index} className={`card ${index % 3 === 0 ? 'big' : index % 2 === 0 ? 'medium' : 'small'}`}>
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
