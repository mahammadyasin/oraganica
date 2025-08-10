import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";

export const ListProduct = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000); // Default price filter
  const [maxAvailablePrice, setMaxAvailablePrice] = useState(10000);
  const [category, setCategory] = useState("ALL");
  console.log("check filtered data=============", filtered);

  function handleClick(selectedCategory) {
    setCategory(selectedCategory);
  }
  const fetchData = async () => {
    try {
      const response = await axiosFetch({
        url: `product/filter?category=${category}`,
        method: "GET",
      });

      if (Array.isArray(response.data)) {
        const prices = response.data.map((item) => item.price);
        const maxPrice = Math.max(...prices);

        setData(response.data);
        setFiltered(response.data);
        setMaxAvailablePrice(maxPrice);
        setMaxPrice(maxPrice); // Set initial filter value to full range
      } else {
        setData([]);
        setFiltered([]);
        setMaxAvailablePrice(10000);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
      setFiltered([]);
      setMaxAvailablePrice(10000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // Filter based on search and price
  useEffect(() => {
    if (!Array.isArray(data)) return;

    const filteredData = data.filter((product) => {
      const nameMatch = product?.productName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const priceMatch = product?.price <= maxPrice;
      return nameMatch && priceMatch;
    });

    setFiltered(filteredData);
  }, [searchQuery, maxPrice, data]);

  return (
    <section id="products" className="section product">
      <div className="container">
        <p className="section-subtitle"> -- Organic Products --</p>
        <h2 className="h2 section-title">All Organic Products</h2>

        {/* Search and Price Filter */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              type="search"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div>
            <label> Price: Rs {maxPrice}</label>
            <input
              type="range"
              min="0"
              max={maxAvailablePrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              style={{ background: "hsl(152, 95%, 39%)" }}
            />
          </div>
        </div>

        {/* Product Filter Categories (non-functional here) */}
        <ul className="filter-list">
          <li>
            <button className="filter-btn" onClick={() => handleClick("ALL")}>
              <img
                src="./images/filter-1.png"
                width={20}
                alt=""
                className="default"
              />
              <img
                src="./images/filter-1-active.png"
                width={20}
                alt=""
                className="color"
              />
              <p className="filter-text">ALL</p>
            </button>
          </li>
          <li>
            <button
              className="filter-btn"
              onClick={() => handleClick("FRESH_VEGETABLES")}
            >
              <img
                src="./images/filter-1.png"
                width={20}
                alt=""
                className="default"
              />
              <img
                src="./images/filter-1-active.png"
                width={20}
                alt=""
                className="color"
              />
              <p className="filter-text">Fresh Vegetables</p>
            </button>
          </li>
          <li>
            <button
              className="filter-btn"
              onClick={() => handleClick("FISH_AND_MEAT")}
            >
              <img
                src="./images/filter-2.png"
                width={20}
                alt=""
                className="default"
              />
              <img
                src="./images/filter-2-active.png"
                width={20}
                alt=""
                className="color"
              />
              <p className="filter-text">Fish &amp; Meat</p>
            </button>
          </li>
          <li>
            <button
              className="filter-btn"
              onClick={() => handleClick("HEALTY_FRUITS")}
            >
              <img
                src="./images/filter-3.png"
                width={20}
                alt=""
                className="default"
              />
              <img
                src="./images/filter-3-active.png"
                width={20}
                alt=""
                className="color"
              />
              <p className="filter-text">Healthy Fruit</p>
            </button>
          </li>
          <li>
            <button
              className="filter-btn"
              onClick={() => handleClick("DAIRY_PRODUCTS")}
            >
              <img
                src="./images/filter-1.png"
                width={20}
                alt=""
                className="default"
              />
              <img
                src="./images/filter-1-active.png"
                width={20}
                alt=""
                className="color"
              />
              <p className="filter-text">Dairy Products</p>
            </button>
          </li>
        </ul>

        {/* Render Filtered Products */}
        <ul className="grid-list">
          {filtered?.length > 0 ? (
            filtered.map((item) => (
              <ProductCard
                key={item.productid}
                id={item?.productId}
                name={item.productName}
                description={item.description}
                price={item.price}
                img={item.img}
                weight={item.weight}
                fatchData={fetchData} // Uncomment if you need it in ProductCard
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};
