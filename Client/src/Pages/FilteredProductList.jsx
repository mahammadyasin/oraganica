import React, { useEffect, useState } from "react";
import axios from "axios";

const FilteredProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const CATEGORIES = ["ALL", "Fresh Vegetables", "Fruits", "Grocery"];

  const fetchFilteredProducts = async () => {
    try {
      const params = {};
      if (category && category !== "ALL") params.category = category;
      if (fromPrice && toPrice) {
        params.fromPrice = fromPrice;
        params.toPrice = toPrice;
      }

      const res = await axios.get("http://localhost:9192/product/filter", {
        params,
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  const handleFilter = () => {
    fetchFilteredProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter Products</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setActiveCategory(e.target.value);
          }}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: activeCategory !== "ALL" ? "#d4edda" : "#fff",
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="From Price"
          value={fromPrice}
          onChange={(e) => setFromPrice(e.target.value)}
          style={{
            padding: "8px",
            width: "120px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="number"
          placeholder="To Price"
          value={toPrice}
          onChange={(e) => setToPrice(e.target.value)}
          style={{
            padding: "8px",
            width: "120px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          onClick={handleFilter}
          style={{
            padding: "8px 12px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.productId}
            style={{
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4>{product.productName}</h4>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductList;
