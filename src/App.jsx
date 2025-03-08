import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";

const CategoryCard = ({ category, size }) => {
  return (
    <div className={`category-card ${size} ${category.special ? "special" : ""}`}>
      {category.photo && (
        <div className="logo-container">
          <img src={category.photo} alt={`${category.name} logo`} />
        </div>
      )}
      <div className="category-name">{category.name}</div>
      <div className="category-count">{category.product_count}</div>
    </div>
  );
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // axios.get("")
    axios.get("https://kroff-api.eduflow.uz/api/v1/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Kategoriya yuklashda xatolik:", error);
      });
  }, []);

  const pattern = [
    ["long", "short"],
    ["short", "short", "short"],
    ["short", "long"],
    ["short", "short", "short"]
  ];

  let patternIndex = 0;
  let categoryIndex = 0;
  const arrangedCategories = [];

  while (categoryIndex < categories.length) {
    const currentPattern = pattern[patternIndex % pattern.length];
    currentPattern.forEach((size) => {
      if (categoryIndex >= categories.length) return;
      arrangedCategories.push({ ...categories[categoryIndex++], size });
    });
    patternIndex++;
  }

  return (
    <div className="category-grid">
      {arrangedCategories.map((category) => (
        <CategoryCard key={category.id} category={category} size={category.size} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      <h1>Mahsulotlar kategoriyasi</h1>
      <CategoryGrid />
    </div>
  );
};

export default App;