import React, { useRef, useEffect, useState } from 'react';
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${SERVER_URL}/admin/products/products/all`);

        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Fetching error:', err.message);
      }
    };

    fetchProducts();
  }, []);

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
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ height: '92vh', overflow: 'hidden', position: 'relative' }}>
        <div ref={scrollRef} style={{ display: 'flex', width: '100%', height: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
          {bannerImages.map((img, idx) => (
            <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative', scrollSnapAlign: 'start' }}>
              <img src={img} alt={`banner-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', color: '#fff' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>Unleash Your Style</h1>
                <p style={{ fontSize: '1.4rem', marginBottom: '30px', maxWidth: '600px', lineHeight: '1.6', color: '#f0f0f0' }}>
                  Shop the latest trends in fashion and feel fabulous every day.
                </p>
                <button
                  onClick={() => navigate('/shopping/listing')}
                  style={{
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
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', background: '#ffffffd0', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 10 }}
        >
          <ChevronLeft size={36} color="#111" />
        </button>
        <button
          onClick={() => scroll('right')}
          style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: '#ffffffd0', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 10 }}
        >
          <ChevronRight size={36} color="#111" />
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff' }}>
        <br />
        <br />
        <br />
        <br />
        <h2 style={{ fontSize: '2.6rem', marginBottom: '40px', fontWeight: 700 }}>Explore Our Top Brands</h2>
        <br />
        <br />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
          {brandLogos.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} style={{ height: '80px', objectFit: 'contain' }} />
          ))}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div style={{ marginTop: '50px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 style={{ fontSize: '2.2rem', color: '#111', fontWeight: '700', marginBottom: '20px' }}>
            Why Zippy Stores?
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
            Zippy Stores isn't just about fashion — it's a lifestyle. We curate premium styles from the world's
            top brands, fuse them with unbeatable deals, and deliver an elevated shopping experience straight to
            your screen. From everyday essentials to bold seasonal drops, we’ve got your fashion cravings covered.
            Shop smart. Shop stylish. Shop Zippy.
          </p>
          <br />
          <br />
          <button style={styles.shopBtn} onClick={() => navigate('/shopping/listing')}>
            Discover More
          </button>
        </div>
      </div>

      <div style={{ padding: '80px 40px', backgroundColor: '#f7f7f7' }}>
        <h2 style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '60px', fontWeight: '700', color: '#111' }}>
          Featured Products
        </h2>
        <br />
        <br />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginBottom: '8px' }}>{product.title}</h3>
                <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '10px' }}>{product.description?.slice(0, 80)}...</p>
                <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '6px' }}>
                  <strong>Brand:</strong> {product.brand} | <strong>Category:</strong> {product.category}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '12px' }}>
                  <strong>Stock:</strong> {product.totalStock} pcs
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#222' }}>
                    ₹{product.price} {product.salePrice && <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: '#aaa' }}>₹{product.salePrice}</span>}
                  </span>
                  <button
                    style={{
                      padding: '8px 18px',
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                    onClick={() => navigate('/shopping/listing')}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: '#fff', color: '#111', textAlign: 'center', padding: '60px 30px', fontSize: '1.1rem', fontWeight: '500', letterSpacing: '0.4px', lineHeight: '1.8' }}>
        <p style={{ margin: '10px 0' }}>© 2025 Zippy. All rights reserved.</p>
        <p style={{ margin: '10px 0' }}>Follow us on Instagram, Twitter & Facebook for exclusive offers.</p>
        <p style={{ margin: '10px 0' }}>Crafted with ❤️ by Shreesh Sanyal</p>
      </footer>
    </div>
  );
};
const styles = {
  shopBtn: {
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '16px 40px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
};

export default Shophome;
