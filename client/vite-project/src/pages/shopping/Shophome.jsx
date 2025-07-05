import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const bannerImages = [
  'https://i.pinimg.com/736x/78/1e/06/781e065bb940195c617c7d29d1cbee53.jpg',
  'https://cdn.prod.website-files.com/6256995755a7ea0a3d8fbd11/65d87b81e50543046c6d6b6d_BANNER_5.jpg',
  'https://startupsuccessstories.in/wp-content/uploads/2023/02/LQ-Milano-A-Sustainable-Kids-Wear-Brand-Announces-The-Launch-Of-Its-Aesthetic-Designs.jpg',
];

const brandLogos = [
  { src: 'https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png', alt: 'Nike' },
  { src: 'https://imgs.search.brave.com/Y78h9spOp02irL98eP_toGzeyd18cjNBPKebtkNotwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0FkaWRhcy1Mb2dv/LW9sZC01MDB4Mjgx/LmpwZw', alt: 'Adidas' },
  { src: 'https://1000logos.net/wp-content/uploads/2017/05/PUMA-logo.jpg', alt: 'Puma' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Levis-logo-quer.svg/1200px-Levis-logo-quer.svg.png', alt: "Levi's" },
  { src: 'https://fashionlawjournal.com/wp-content/uploads/2021/05/Zara.png', alt: 'Zara' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/800px-H%26M-Logo.svg.png', alt: 'H&M' },
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

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <p style={styles.subheading}>Shop the latest trends in fashion and feel fabulous every day.</p>
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

      <div style={styles.logoSection}>
        <h2 style={styles.brandsHeading}>Explore Our Top Brands</h2>
        <div style={styles.logoGrid}>
          {brandLogos.map((logo, idx) => (
            <img key={idx} src={logo.src} alt={logo.alt} style={styles.logoImage} />
          ))}
        </div>

        <div style={styles.textContent}>
          <h3 style={styles.subTitle}>Why Shop With Us?</h3>
          <p style={styles.description}>At Zippy, we bring you the hottest collections from globally loved brands. Whether you're looking for everyday essentials, bold new styles, or seasonal steals, we've got you covered with unmatched quality and unbeatable deals.</p>
          <button style={styles.shopBtn} onClick={() => navigate('/shopping/listing')}>
            Discover More
          </button>
        </div>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Zippy. All rights reserved.</p>
        <p style={styles.footerText}>Follow us on Instagram, Twitter & Facebook for exclusive offers.</p>
        <p style={styles.footerText}>Crafted with ❤️ by Shreesh Sanyal</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#000',
  },
  carouselWrapper: {
    position: 'relative',
    height: '92vh',
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
    filter: 'brightness(80%)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '80px',
    color: '#fff',
  },
  heading: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textShadow: '0 6px 24px rgba(0,0,0,0.5)',
  },
  subheading: {
    fontSize: '1.4rem',
    marginBottom: '30px',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#f0f0f0',
  },
  shopBtn: {
    background: '#000',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '50px',
    padding: '16px 40px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(255,255,255,0.2)',
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
  logoSection: {
    padding: '80px 20px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  brandsHeading: {
    fontSize: '2.6rem',
    fontWeight: '700',
    marginBottom: '60px',
    color: '#111',
  },
  logoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '50px',
    alignItems: 'center',
  },
  logoImage: {
    height: '90px',
    maxWidth: '160px',
    objectFit: 'contain',
    filter: 'grayscale(0%)',
  },
  textContent: {
    marginTop: '60px',
    maxWidth: '900px',
    margin: '60px auto 0',
  },
  subTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#111',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '30px',
  },
  footer: {
    backgroundColor: '#fff',
    color: '#111',
    textAlign: 'center',
    padding: '60px 30px',
    fontSize: '1.1rem',
    fontWeight: '500',
    letterSpacing: '0.4px',
    lineHeight: '1.8',
  },
  footerText: {
    margin: '10px 0',
  },
};

export default Shophome;