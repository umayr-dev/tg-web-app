import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import ProductPage from "./page/ProductPage";

// 📌 Kategoriya kartochkasi
const CategoryCard = ({ category, size, onClick }) => {
  return (
    <div
      className={`category-card ${size} ${category.special ? "special" : ""}`}
      onClick={() => onClick(category.id)}
    >
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

// 📌 Kategoriya grid (kategoriya bosilganda mahsulot sahifasiga yo‘naltiradi)
const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        <CategoryCard
          key={category.id}
          category={category}
          size={category.size}
          onClick={(id) => navigate(`/products/${id}`)}
        />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Mahsulotlar kategoriyasi</h1>
        <Routes>
          <Route path="/" element={<CategoryGrid />} />
          <Route path="/products/:categoryId" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
