import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://kroff-api.eduflow.uz/api/v1/products?=${categoryId}&page=${currentPage}`)
      .then((response) => {
        console.log("API Response:", response.data); // ✅ API dan kelgan ma’lumotni tekshirish
        setProducts(response.data.data || []);
        setTotalPages(response.data.meta?.last_page || 1);
      })
      .catch((error) => {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
      });
  }, [categoryId, currentPage]);

  return (
    <div className="product-page">
      <h2 className="title">Mahsulotlar</h2>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
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
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <img src={product.photo} alt={product.name?.uz} className="product-image" /> {/* ✅ Rasm qo'shildi */}
              <h3>{product.name || ""}</h3> {/* ✅ To‘g‘ri nom */}
              <p>Narx: {product.price ? `${product.price} so'm` : ""}</p> {/* ✅ To‘g‘ri narx */}
            </div>
          ))}
        </div>
      )}

      {/* Modal oyna */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name || ""}</h2>
            <img src={selectedProduct.photo} alt={selectedProduct.name?.uz} className="modal-image" />
            <p>Narx: {selectedProduct.price ? `${selectedProduct.price} so'm` : ""}</p>
            <button className="close-button" onClick={() => setSelectedProduct(null)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
