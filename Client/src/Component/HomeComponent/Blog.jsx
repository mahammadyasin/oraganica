import React, { useState } from 'react';

const OrganicBlog = () => {
  const [blogPosts] = useState([
    {
      id: 1,
      title: "10 Benefits of Eating Organic Foods",
      excerpt: "Discover why choosing organic foods can improve your health and support sustainable farming practices.",
      content: "Organic foods are grown without synthetic pesticides, fertilizers, or GMOs. They offer numerous health benefits including higher nutrient content, better taste, and reduced exposure to harmful chemicals...",
      author: "Dr. Sarah Green",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
      category: "Health",
      tags: ["organic", "health", "nutrition"]
    },
    {
      id: 2,
      title: "How to Start Your Own Organic Garden",
      excerpt: "A beginner's guide to growing your own organic vegetables and herbs at home.",
      content: "Starting an organic garden is easier than you think. With proper planning, soil preparation, and natural pest control methods, you can grow fresh, healthy produce right in your backyard...",
      author: "Mike Farmer",
      date: "March 12, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      category: "Gardening",
      tags: ["gardening", "organic", "DIY"]
    },
    {
      id: 3,
      title: "Seasonal Organic Produce Guide",
      excerpt: "Learn which organic fruits and vegetables are in season and how to make the most of them.",
      content: "Eating seasonally not only ensures you get the freshest, most nutritious produce, but it also supports local farmers and reduces environmental impact...",
      author: "Emma Natural",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
      category: "Seasonal",
      tags: ["seasonal", "produce", "farming"]
    },
    {
      id: 4,
      title: "The Environmental Impact of Organic Farming",
      excerpt: "Understanding how organic farming practices help protect our planet and biodiversity.",
      content: "Organic farming practices prioritize soil health, water conservation, and biodiversity. These methods help create sustainable food systems that protect our environment for future generations...",
      author: "Dr. Earth Conscious",
      date: "March 8, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      category: "Environment",
      tags: ["environment", "sustainability", "farming"]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingPost, setReadingPost] = useState(null);

  const categories = ["All", "Health", "Gardening", "Seasonal", "Environment"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleReadMore = (post) => {
    setReadingPost(post);
  };

  const handleBackToBlog = () => {
    setReadingPost(null);
  };

  if (readingPost) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <button 
              className="btn btn-outline-success mb-4"
              onClick={handleBackToBlog}
            >
              ← Back to Blog
            </button>
            
            <article>
              <img 
                src={readingPost.image} 
                alt={readingPost.title}
                className="img-fluid rounded mb-4"
                style={{width: '100%', height: '400px', objectFit: 'cover'}}
              />
              
              <div className="mb-4">
                <span className="badge bg-success me-2">{readingPost.category}</span>
                <span className="text-dark">{readingPost.date}</span>
                <span className="text-secondary mx-2">•</span>
                <span className="text-dark">{readingPost.readTime}</span>
              </div>
              
              <h1 className="display-5 text-dark mb-4" style={{fontWeight: 'bold'}}>
                {readingPost.title}
              </h1>
              
              <div className="d-flex align-items-center mb-4">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '50px', height: '50px'}}>
                  <span className="text-white fw-bold">
                    {readingPost.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h6 className="text-dark mb-0" style={{fontWeight: 'bold'}}>By {readingPost.author}</h6>
                  <small className="text-secondary">Organic Food Expert</small>
                </div>
              </div>
              
              <div className="text-dark" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                <p>{readingPost.content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              
              <div className="mt-5 pt-4 border-top">
                <h6 className="text-dark mb-3" style={{fontWeight: 'bold'}}>Tags:</h6>
                {readingPost.tags.map(tag => (
                  <span key={tag} className="badge bg-light text-dark me-2 mb-2" style={{padding: '8px 12px'}}>
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Blog Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-success mb-3" style={{fontWeight: 'bold'}}>🌱 Organic Living Blog</h1>
          <p className="lead text-dark">Tips, guides, and insights for a healthier, more sustainable lifestyle</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`btn me-2 mb-2 ${
                  selectedCategory === category 
                    ? 'btn-success' 
                    : 'btn-outline-success'
                }`}
                onClick={() => setSelectedCategory(category)}
                style={{fontWeight: 'bold', padding: '8px 20px'}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="row g-0">
                <div className="col-md-6">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title}
                    className="img-fluid rounded-start h-100"
                    style={{objectFit: 'cover', minHeight: '300px'}}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body h-100 d-flex flex-column justify-content-center p-5">
                    <div className="mb-3">
                      <span className="badge bg-success me-2">{filteredPosts[0].category}</span>
                      <span className="badge bg-warning text-dark">Featured</span>
                    </div>
                    <h2 className="card-title text-dark mb-3" style={{fontWeight: 'bold'}}>
                      {filteredPosts[0].title}
                    </h2>
                    <p className="card-text text-dark mb-4">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <small className="text-dark">By {filteredPosts[0].author}</small>
                      <small className="text-secondary">{filteredPosts[0].readTime}</small>
                    </div>
                    <button 
                      className="btn btn-success"
                      onClick={() => handleReadMore(filteredPosts[0])}
                      style={{fontWeight: 'bold'}}
                    >
                      Read Full Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="h3 text-dark" style={{fontWeight: 'bold'}}>
            Latest Articles
            {selectedCategory !== "All" && (
              <span className="text-success"> - {selectedCategory}</span>
            )}
          </h2>
        </div>
        
        {filteredPosts.slice(1).map(post => (
          <div key={post.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img 
                src={post.image} 
                alt={post.title}
                className="card-img-top"
                style={{height: '200px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-success">{post.category}</span>
                </div>
                <h5 className="card-title text-dark mb-3" style={{fontWeight: 'bold'}}>
                  {post.title}
                </h5>
                <p className="card-text text-dark flex-grow-1">
                  {post.excerpt}
                </p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-dark">By {post.author}</small>
                  <small className="text-secondary">{post.readTime}</small>
                </div>
                <button 
                  className="btn btn-outline-success"
                  onClick={() => handleReadMore(post)}
                  style={{fontWeight: 'bold'}}
                >
                  Read More
                </button>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <small className="text-secondary">{post.date}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-light border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <h3 className="text-success mb-3" style={{fontWeight: 'bold'}}>📧 Subscribe to Our Newsletter</h3>
              <p className="text-dark mb-4">Get the latest organic living tips and exclusive offers delivered to your inbox</p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email address"
                      style={{padding: '12px'}}
                    />
                    <button className="btn btn-success" style={{fontWeight: 'bold', padding: '12px 20px'}}>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrganicBlog;