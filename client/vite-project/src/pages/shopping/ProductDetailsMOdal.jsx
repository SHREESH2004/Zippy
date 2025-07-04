import React from 'react';

function ProductDetailModal({ product, onClose, onAddToCart, onRemoveFromCart, quantity = 0 }) {
    if (!product) return null;

    const isDiscounted = product.salePrice > product.price;

    // Random rating & review for demo
    const reviews = [
        { text: "Amazing quality and fit! Highly recommend.", rating: 5 },
        { text: "Good value for the price.", rating: 4 },
        { text: "Looks great but the fabric could be softer.", rating: 3 },
        { text: "Exceeded my expectations. Will buy again.", rating: 5 },
        { text: "Not what I expected, but okay for casual wear.", rating: 2 },
        { text: "Works perfectly, exactly as described.", rating: 5 },
        { text: "I’m very satisfied with the purchase.", rating: 4 },
        { text: "Could be better, but overall decent.", rating: 3 },
        { text: "The product stopped working after a week.", rating: 1 },
        { text: "Fantastic customer support and fast delivery!", rating: 5 },
        { text: "Highly durable and well made.", rating: 5 },
        { text: "Color and design matched the pictures exactly.", rating: 4 },
        { text: "Shipping was slow, but product was worth the wait.", rating: 3 },
        { text: "Packaging was damaged but product was intact.", rating: 3 },
        { text: "I love this! It’s become an essential item for me.", rating: 5 },
        { text: "Not recommended for heavy use.", rating: 2 },
        { text: "Exceeded my expectations in every way.", rating: 5 },
        { text: "Affordable and reliable, great value.", rating: 4 },
        { text: "I had some issues but they were quickly resolved.", rating: 3 },
        { text: "Does the job, nothing fancy but effective.", rating: 3 }
    ];

    const reviewerNames = [
        "Jessica M.",
        "David R.",
        "Sophia L.",
        "Michael B.",
        "Emily K.",
        "James T.",
        "Olivia W.",
        "Ethan H.",
        "Ava P.",
        "Mason C.",
        "Isabella N.",
        "Lucas D.",
        "Mia S.",
        "Noah G.",
        "Amelia F.",
        "Liam J.",
        "Charlotte K.",
        "Benjamin V.",
        "Ella M.",
        "Alexander Q."
    ];

    // Pick a random index for both review and reviewer
    const randomIndex = Math.floor(Math.random() * reviews.length);
    const randomReview = reviews[randomIndex];
    const randomReviewer = reviewerNames[randomIndex];


    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= rating ? '#ffbf00' : '#ddd',
                        fontSize: '20px',
                        marginRight: '3px',
                        textShadow: i <= rating ? '0 0 5px #ffbf00' : 'none',
                    }}
                    aria-hidden="true"
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    // Close modal on clicking outside modal container
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.modal}>
                {/* Removed close button */}

                <img
                    src={product.image || 'https://via.placeholder.com/600'}
                    alt={product.name}
                    style={styles.image}
                />

                <h2 style={styles.name}>{product.name}</h2>
                <p style={styles.title}>{product.title}</p>

                <div style={styles.priceWrapper}>
                    {isDiscounted && (
                        <span style={styles.strikePrice}>${product.salePrice.toFixed(2)}</span>
                    )}
                    <span style={styles.price}>${product.price.toFixed(2)}</span>
                </div>

                <p style={styles.stock}>Stock: {product.totalStock}</p>
                <p style={styles.date}>
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                </p>

                <div style={styles.descReview}>
                    <p style={styles.descriptionText}>{product.description}</p>
                    <div style={styles.reviewRow}>
                        <div style={styles.stars}>{renderStars(randomReview.rating)}</div>
                        <div style={styles.reviewContent}>
                            <p style={styles.reviewText}>"{randomReview.text}"</p>
                            <p style={styles.reviewerName}>— {randomReviewer}</p>
                        </div>
                    </div>
                </div>

                <div style={styles.cartRow}>
                    <button
                        style={styles.addButton}
                        onClick={() => onAddToCart(product._id)}
                        disabled={quantity >= product.totalStock}
                    >
                        + Add to Cart
                    </button>

                    {quantity > 0 && (
                        <>
                            <span style={styles.quantityText}>In Cart: {quantity}</span>
                            <button
                                style={styles.removeButton}
                                onClick={() => onRemoveFromCart(product._id)}
                            >
                                − Remove
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '12px',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '24px 28px',
        width: '90%',
        maxWidth: '480px',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
        animation: 'fadeIn 0.3s ease-in-out',
        color: '#222',
        maxHeight: '85vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        width: '100%',
        height: '280px',
        objectFit: 'cover',
        borderRadius: '12px',
        marginBottom: '18px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    },
    name: {
        margin: '0 0 10px',
        fontSize: '22px',
        fontWeight: '700',
        color: '#111',
        letterSpacing: '0.02em',
        textTransform: 'capitalize',
    },
    title: {
        fontSize: '15px',
        color: '#666',
        marginBottom: '10px',
        fontWeight: '500',
    },
    priceWrapper: {
        fontSize: '18px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    strikePrice: {
        textDecoration: 'line-through',
        color: '#b0b0b0',
        fontSize: '14px',
    },
    price: {
        fontWeight: '700',
        color: '#007bff',
        fontSize: '20px',
    },
    stock: {
        fontSize: '13px',
        color: '#444',
        fontWeight: '600',
    },
    date: {
        fontSize: '11px',
        color: '#777',
        marginTop: '8px',
        fontWeight: '400',
    },
    descReview: {
        marginTop: '16px',
        padding: '12px 14px',
        backgroundColor: '#f5f9ff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.12)',
        color: '#002f6c',
        fontWeight: '500',
        letterSpacing: '0.015em',
        fontSize: '14px',
        fontFamily: "'Poppins', sans-serif",
        userSelect: 'none',
        lineHeight: '1.35',
    },
    descriptionText: {
        fontStyle: 'italic',
        marginBottom: '10px',
    },
    reviewRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
    },
    stars: {
        display: 'flex',
        marginTop: '2px',
        fontSize: '18px',
    },
    reviewContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    reviewText: {
        fontStyle: 'italic',
        color: '#004080',
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '3px',
    },
    reviewerName: {
        fontWeight: '700',
        fontSize: '13px',
        color: '#0059b3',
        fontStyle: 'normal',
    },

    cartRow: {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        justifyContent: 'flex-start',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '15px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 3px 10px rgba(0,123,255,0.35)',
        transition: 'background-color 0.3s ease',
    },
    removeButton: {
        padding: '10px 18px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '15px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 3px 10px rgba(220,53,69,0.35)',
        transition: 'background-color 0.3s ease',
    },
    quantityText: {
        fontSize: '15px',
        color: '#28a745',
        fontWeight: '700',
        fontFamily: "'Poppins', sans-serif",
    },
};

export default ProductDetailModal;
