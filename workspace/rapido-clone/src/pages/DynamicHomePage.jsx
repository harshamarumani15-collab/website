import { useState, useEffect } from 'react';
import InfiniteScroll from '../components/InfiniteScroll';
import { getImageService } from '../services/imageService';
import { Image as ImageIcon, Loader } from 'lucide-react';
import './DynamicHomePage.css';

/**
 * Dynamic HomePage with infinite scrolling image gallery
 */
function DynamicHomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const imageService = getImageService();

  // Fetch images for infinite scroll
  const fetchImages = async (page, pageSize) => {
    return await imageService.getImages({
      page,
      limit: pageSize,
      category: selectedCategory
    });
  };

  // Render individual image card
  const renderImageCard = (image, index) => (
    <div className="image-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="image-container">
        {image.loading ? (
          <div className="image-loading">
            <Loader className="spin" size={32} />
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.alt || `Gallery image ${index + 1}`}
            loading="lazy"
            onLoad={image.onLoad}
            onError={image.onError}
          />
        )}
        <div className="image-overlay">
          <div className="image-info">
            <h4>{image.title}</h4>
            <p>{image.category}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'nature', name: 'Nature', icon: '🏞️' },
    { id: 'city', name: 'City', icon: '🏙️' },
    { id: 'people', name: 'People', icon: '👥' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'food', name: 'Food', icon: '🍕' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  return (
    <div className="dynamic-home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Discover Amazing Images</h1>
          <p>Explore our curated collection of stunning visuals from around the world</p>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-label">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scroll Gallery */}
      <section className="gallery-section">
        <div className="container">
          <InfiniteScroll
            fetchItems={fetchImages}
            renderItem={renderImageCard}
            initialPageSize={12}
            pageSize={9}
            emptyMessage="No images found in this category"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10K+</h3>
              <p>Images Available</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Users</p>
            </div>
            <div className="stat-card">
              <h3>100+</h3>
              <p>Categories</p>
            </div>
            <div className="stat-card">
              <h3>1M+</h3>
              <p>Downloads</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DynamicHomePage;
