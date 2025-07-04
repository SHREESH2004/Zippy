import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerImages = [
  'https://i.pinimg.com/736x/78/1e/06/781e065bb940195c617c7d29d1cbee53.jpg',
  'https://as2.ftcdn.net/jpg/02/18/77/39/1000_F_218773939_y0Qi9j9Sv9DyjQfbD9WFkn50AdB8tM7i.jpg',
];

const Shophome = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth * 0.8;
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.carouselWrapper}>
        <button style={styles.arrowLeft} onClick={() => scroll('left')}>
          <ChevronLeft size={40} color="#222" />
        </button>

        <div style={styles.carousel} ref={scrollRef}>
          {bannerImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Banner ${idx + 1}`} style={styles.bannerImage} />
          ))}
        </div>

        <button style={styles.arrowRight} onClick={() => scroll('right')}>
          <ChevronRight size={40} color="#222" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '90vh',
    width: '100%',
    overflow: 'hidden',
    fontFamily: 'Poppins, sans-serif',
    position: 'relative',
  },
  carouselWrapper: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  carousel: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    height: '100%',
    width: '100%',
    scrollSnapType: 'x mandatory',
  },
  bannerImage: {
    height: '100%',
    width: '100vw',
    objectFit: 'cover',
    scrollSnapAlign: 'start',
    flexShrink: 0,
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    background: '#ffffffcc',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 2,
    cursor: 'pointer',
    padding: '12px',
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    background: '#ffffffcc',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 2,
    cursor: 'pointer',
    padding: '12px',
  },
};

export default Shophome;
