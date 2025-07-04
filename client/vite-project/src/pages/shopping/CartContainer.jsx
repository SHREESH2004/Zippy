import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import CartPopup from './cardpopup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCart } from '../../store/cart'; // Adjust the import path as needed
import { useSelector as useTypedSelector } from 'react-redux';

const CartContainer = () => {
    const [cartVisible, setCartVisible] = useState(false);

    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.auth.user); // assuming auth slice is set
    const userId = user?._id || localStorage.getItem('userId'); // Get user ID from auth state or localStorage

    const { items: cartItems, totalPrice } = useSelector((state) => state.cart);

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, userId]);

    const handleAdd = (item) => {
        dispatch(
            updateCart({
                userId,
                productId: item.product._id,
                quantityChange: +1,
            })
        );
    };

    const handleRemove = (item) => {
        dispatch(
            updateCart({
                userId,
                productId: item.product._id,
                quantityChange: -1,
            })
        );
    };


    const handleBuyNow = () => {
        setCartVisible(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* 🛒 Cart Icon */}
            <button
                onClick={() => setCartVisible((prev) => !prev)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#111',
                }}
                title="Cart"
            >
                <ShoppingCart size={24} />
            </button>

            {/* 🧾 Cart Popup */}
            {cartVisible && (
                <CartPopup
                    cartItems={cartItems}
                    totalPrice={totalPrice}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    onBuyNow={handleBuyNow}
                />
            )}
        </div>
    );
};

export default CartContainer;
