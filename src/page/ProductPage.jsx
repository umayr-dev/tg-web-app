import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://kroff-api.eduflow.uz/api/v1/products?category_id=${categoryId}&page=${currentPage}&per_page=10`)
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data.data || []);
        setTotalPages(response.data.meta?.last_page || 1);
      })
      .catch((error) => {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
      });
  }, [categoryId, currentPage]);

  return (
    <div className="container">
      <h2 className="title">Mahsulotlar</h2>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="no-products">Mahsulot topilmadi</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <img src={product.photo} alt={product.name} className="product-img" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Narx: {product.price} som</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal oyna */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>
              ✖
            </button>
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <img src={selectedProduct.photo} alt={selectedProduct.name} className="modal-img" />
            <p className="modal-price">Narx: {selectedProduct.price} som</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
