import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import './InfiniteScroll.css';

/**
 * InfiniteScroll Component
 * A reusable component for infinite scrolling with dynamic content loading
 * 
 * @param {Function} fetchItems - Async function to fetch items (should return array of items)
 * @param {React.ComponentType} renderItem - Function to render each item
 * @param {number} initialPageSize - Number of items to load initially
 * @param {number} pageSize - Number of items to load on each scroll
 * @param {string} emptyMessage - Message to show when no items are available
 */
function InfiniteScroll({
  fetchItems,
  renderItem,
  initialPageSize = 12,
  pageSize = 9,
  emptyMessage = 'No more items to load'
}) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const observer = useRef();
  const loaderRef = useRef(null);

  // Fetch items
  const loadItems = useCallback(async (pageNum, isInitial = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const size = isInitial ? initialPageSize : pageSize;
      const newItems = await fetchItems(pageNum, size);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => isInitial ? newItems : [...prev, ...newItems]);
        setHasMore(newItems.length === size);
      }
    } catch (err) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }, [fetchItems, initialPageSize, pageSize, loading]);

  // Initial load
  useEffect(() => {
    loadItems(1, true);
  }, []);

  // Setup intersection observer
  useEffect(() => {
    if (loading || !hasMore) return;

    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    }, options);

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  // Load next page when page number changes
  useEffect(() => {
    if (page > 1) {
      loadItems(page);
    }
  }, [page, loadItems]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show scroll to top button after scrolling down
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="infinite-scroll-container">
      {/* Items Grid */}
      <div className="items-grid">
        {items.map((item, index) => (
          <div key={item.id || index} className="item-wrapper">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state" ref={loaderRef}>
          <div className="loading-spinner"></div>
          <p>Loading more...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => loadItems(page)} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* No More Items */}
      {!hasMore && items.length > 0 && (
        <div className="no-more-items">
          <p>{emptyMessage}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && !error && (
        <div className="empty-state">
          <p>No items available</p>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

export default InfiniteScroll;
