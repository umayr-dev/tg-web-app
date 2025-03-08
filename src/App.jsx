
import { useState , useEffect } from "react";
import "./index.css";

const testCategories = [
  { id: 1, name: "Benefit/EMAL", count: 7, special: false, logo: null },
  { id: 2, name: "Benefit/Бенефит гипсокартон", count: 1, special: false, logo: null },
  { id: 3, name: "Benefit/Бенефит калаpaнт для колеровичные", count: 16, special: false, logo: null },
  { id: 4, name: "Benefit/Бенефит сухой смес", count: 1, special: false, logo: null },
  { id: 5, name: "Benefit/ВД-АК", count: 15, special: false, logo: null },
  { id: 6, name: "COLORANT SILKCOAT", count: 12, special: false, logo: null },
  { id: 7, name: "DEMIR PROFIL", count: 33, special: false, logo: "https://files.forlabs.uz/forlabs/15845ed6-a07a-4b53-9112-f83bcf4e6f35" },
  { id: 8, name: "FUGA VISMUT", count: 11, special: false, logo: null },
  { id: 9, name: "Mir Instrument", count: 459, special: false, logo: null },
  { id: 10, name: "OOO. ASMACO", count: 47, special: false, logo: null },
  { id: 11, name: "OOO.OSCAR.UZ", count: 186, special: false, logo: null },
  { id: 12, name: "OOO.SILKCOAT", count: 102, special: false, logo: "https://files.forlabs.uz/forlabs/15845ed6-a07a-4b53-9112-f83bcf4e6f35" },
  { id: 13, name: "SEFFAF PVX TRUBO FITINGLAR", count: 145, special: false, logo: null },
  { id: 14, name: "Strum", count: 58, special: false, logo: null },
  { id: 15, name: "VERO SKOCH", count: 34, special: false, logo: null },
  { id: 16, name: "VERO SKOCH", count: 34, special: false, logo: null },
  { id: 17, name: "VERO SKOCH", count: 34, special: false, logo: null },
  { id: 18, name: "VERO SKOCH", count: 34, special: false, logo: null }
];

const CategoryCard = ({ category, size }) => {
  return (
    <div className={`category-card ${size} ${category.special ? "special" : ""}`}>
      {category.logo && (
        <div className="logo-container">
          <img src={category.logo} alt={`${category.name} logo`} />
        </div>
      )}
      <div className="category-name">{category.name}</div>
      <div className="category-count">{category.count}</div>
    </div>
  );
};

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(testCategories);
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
