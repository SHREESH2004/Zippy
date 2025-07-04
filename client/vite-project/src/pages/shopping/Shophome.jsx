import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const bannerImages = [
  'https://i.pinimg.com/736x/78/1e/06/781e065bb940195c617c7d29d1cbee53.jpg',
  'https://cdn.prod.website-files.com/6256995755a7ea0a3d8fbd11/65d87b81e50543046c6d6b6d_BANNER_5.jpg',
  'https://startupsuccessstories.in/wp-content/uploads/2023/02/LQ-Milano-A-Sustainable-Kids-Wear-Brand-Announces-The-Launch-Of-Its-Aesthetic-Designs.jpg',
];

const Shophome = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const scrollAmount = window.innerWidth * 0.9;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.carouselWrapper}>
        <button style={styles.arrowLeft} onClick={() => scroll('left')}>
          <ChevronLeft size={36} color="#111" />
        </button>

        <div style={styles.carousel} ref={scrollRef}>
          {bannerImages.map((img, idx) => (
            <div key={idx} style={styles.slide}>
              <img src={img} alt={`Banner ${idx + 1}`} style={styles.bannerImage} />
              <div style={styles.overlay}>
                <h1 style={styles.heading}>Unleash Your Style</h1>
                <button style={styles.shopBtn} onClick={() => navigate('/shopping/listing')}>
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button style={styles.arrowRight} onClick={() => scroll('right')}>
          <ChevronRight size={36} color="#111" />
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
    backgroundColor: '#000',
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
  slide: {
    position: 'relative',
    flexShrink: 0,
    width: '100vw',
    height: '100%',
    scrollSnapAlign: 'start',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(85%)',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '80px',
    paddingRight: '80px',
    color: '#fff',
  },
  heading: {
    fontSize: '3.4rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    lineHeight: 1.2,
    textShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },
  shopBtn: {
    background: '#000',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '40px',
    padding: '14px 32px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    zIndex: 3,
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    background: '#ffffffd0',
    border: 'none',
    borderRadius: '50%',
    zIndex: 5,
    cursor: 'pointer',
    padding: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    background: '#ffffffd0',
    border: 'none',
    borderRadius: '50%',
    zIndex: 5,
    cursor: 'pointer',
    padding: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
};

export default Shophome;
