import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const ProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
      axios
      .get(`https://kroff-api.eduflow.uz/api/v1/products?category_id=${categoryId}&page=${currentPage}`)
      .then((response) => {
          setProducts(response.data.data || []);
          setTotalPages(response.data.meta?.last_page || 1);
          console.log(response.data.data)
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
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>narx: {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
