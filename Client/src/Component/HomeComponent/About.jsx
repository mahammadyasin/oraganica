import React, { useState } from 'react';

const OrganicProductShowcase = () => {
 const [products] = useState([
  {
    id: 1,
    name: "Organic Apples",
    price: "$5.99",
    originalPrice: "$6.99",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
    description:
      "Fresh, crisp organic apples sourced directly from trusted local orchards. Perfect for snacking, baking, or juicing, these apples are grown without synthetic pesticides to ensure a healthy and natural taste.",
    badge: "Fresh"
  },
  {
    id: 2,
    name: "Organic Spinach",
    price: "$3.49",
    originalPrice: "$4.99",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    description:
      "Nutrient-rich organic spinach leaves packed with iron, vitamins, and antioxidants. Ideal for salads, smoothies, and cooking. Harvested fresh and free from harmful chemicals for a truly wholesome experience.",
    badge: "Popular"
  },
  {
    id: 3,
    name: "Organic Carrots",
    price: "$2.99",
    originalPrice: "$3.99",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    description:
      "Sweet and crunchy organic carrots that add color and nutrition to any meal. Perfect for roasting, juicing, or enjoying raw as a healthy snack. Grown naturally without synthetic fertilizers.",
    badge: "Sale"
  },
]);

  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-success mb-3" style={{fontWeight: 'bold'}}>🌱 Pure Organic Market</h1>
          <p className="lead text-dark">Fresh, healthy, and sustainably grown organic products</p>

        </div>
      </div>

      {/* Featured Banner */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body text-center py-4">
              <h3 className="text-success mb-2" style={{fontWeight: 'bold'}}>🚚 Free Delivery on Orders Over $50</h3>
              <p className="mb-0 text-dark">Farm-fresh organic produce delivered to your doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="h3 text-dark mb-4">Featured Products</h2>
        </div>
        
        {products.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 position-relative">
              {/* Badge */}
              <span className={`badge position-absolute top-0 start-0 m-2 ${
                product.badge === 'Fresh' ? 'bg-success' : 
                product.badge === 'Popular' ? 'bg-primary' : 'bg-danger'
              }`} style={{zIndex: 1}}>
                {product.badge}
              </span>
              
              {/* Product Image */}
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name}
                style={{height: '250px', objectFit: 'cover'}}
              />
              
              {/* Card Body */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark" style={{fontWeight: 'bold'}}>{product.name}</h5>
                <p className="card-text text-dark flex-grow-1" style={{fontSize: '0.95rem'}}>{product.description}</p>
                
                {/* Price */}
                <div className="mb-3">
                  <span className="h5 text-success me-2" style={{fontWeight: 'bold'}}>{product.price}</span>
                  <small className="text-secondary text-decoration-line-through">{product.originalPrice}</small>
                </div>
                
                {/* Add to Cart Button */}
                {/* <button 
                  className="btn btn-success w-100"
                  onClick={addToCart}
                  style={{fontWeight: 'bold', padding: '10px'}}
                >
                  Add to Cart
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fs-4">🌿</span>
            </div>
            <h5 className="text-dark" style={{fontWeight: 'bold'}}>100% Organic</h5>
            <p className="text-dark" style={{fontSize: '0.9rem'}}>Certified organic products from trusted farms</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fs-4">🚛</span>
            </div>
            <h5 className="text-dark" style={{fontWeight: 'bold'}}>Fast Delivery</h5>
            <p className="text-dark" style={{fontSize: '0.9rem'}}>Same-day delivery available in select areas</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
              <span className="fs-4">💚</span>
            </div>
            <h5 className="text-dark" style={{fontWeight: 'bold'}}>Eco-Friendly</h5>
            <p className="text-dark" style={{fontSize: '0.9rem'}}>Sustainable packaging and farming practices</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrganicProductShowcase;