import Cart from "../models/cart.models.js";
import { Product } from "../models/product.model.js";
import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
    const { productId, quantity, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: true, message: 'User ID is required.' });
    }
    if (!productId) {
        return res.status(400).json({ error: true, message: 'Product ID is required.' });
    }
    if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ error: true, message: 'Quantity must be a positive number.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: true, message: 'Product not found.' });
        }

        if (product.totalStock < quantity) {
            return res.status(400).json({
                error: true,
                message: 'Insufficient stock available.',
                availableStock: product.totalStock
            });
        }

        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            cart = new Cart({ user: user._id, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            const currentItem = cart.products[productIndex];
            const newQuantity = currentItem.quantity + quantity;

            if (newQuantity < 1) {
                cart.products.splice(productIndex, 1);
                product.totalStock += currentItem.quantity;
            } else if (newQuantity > product.totalStock + currentItem.quantity) {
                return res.status(400).json({
                    error: true,
                    message: 'Insufficient stock available for the requested quantity.',
                    availableStock: product.totalStock + currentItem.quantity
                });
            } else {
                const quantityDifference = quantity;
                currentItem.quantity = newQuantity;
                product.totalStock -= quantityDifference;
            }
        } else {
            if (quantity > product.totalStock) {
                return res.status(400).json({
                    error: true,
                    message: 'Insufficient stock available.',
                    availableStock: product.totalStock
                });
            }
            cart.products.push({
                product: productId,
                quantity,
                priceAtTime: product.price
            });
            product.totalStock -= quantity;
        }

        await product.save();
        await cart.save();

        const totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);

        await cart.populate('products.product');

        res.status(200).json({
            error: false,
            message: 'Cart updated successfully.',
            cart,
            totalPrice
        });
    } catch (err) {
        console.error('Add to cart error:', err);
        res.status(500).json({ error: true, message: 'Server error.', details: err.message });
    }
};





export const getCart = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: true, message: 'User ID is required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found.' });
        }

        const cart = await Cart.findOne({ user: user._id }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ error: false, cart: null, totalPrice: 0 });
        }

        const totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);

        res.status(200).json({ error: false, cart, totalPrice });
    } catch (err) {
        console.error('Get cart error:', err);
        res.status(500).json({ error: true, message: 'Server error.', details: err.message });
    }
};

export const updateCart = async (req, res) => {
  const { userId, productId, quantityChange } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: true, message: "User ID and Product ID are required." });
  }

  if (typeof quantityChange !== 'number') {
    return res.status(400).json({ error: true, message: "Quantity change must be a number." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: true, message: "User not found." });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: true, message: "Product not found." });

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ error: true, message: "Cart not found." });

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    const currentQuantity = productIndex !== -1 ? cart.products[productIndex].quantity : 0;
    const newQuantity = currentQuantity + quantityChange;

    if (newQuantity < 0) {
      return res.status(400).json({ error: true, message: "Cannot reduce below 0 quantity in cart." });
    }

    if (newQuantity > product.totalStock + currentQuantity) {
      return res.status(400).json({
        error: true,
        message: `Cannot increase beyond available stock.`,
        availableStock: product.totalStock + currentQuantity,
      });
    }

    if (productIndex > -1) {
      const cartItem = cart.products[productIndex];

      if (newQuantity === 0) {
        cart.products.splice(productIndex, 1);
        product.totalStock += cartItem.quantity;
      } else {
        const change = quantityChange;

        cartItem.quantity = newQuantity;

        if (change > 0) {
          product.totalStock -= change;
        } else if (change < 0) {
          product.totalStock += Math.abs(change);
        }
      }
    } else {
      // Product not in cart
      if (quantityChange < 1) {
        return res.status(400).json({ error: true, message: "Cannot add item with quantity less than 1." });
      }

      if (quantityChange > product.totalStock) {
        return res.status(400).json({
          error: true,
          message: "Insufficient stock to add item.",
          availableStock: product.totalStock,
        });
      }

      cart.products.push({
        product: productId,
        quantity: quantityChange,
        priceAtTime: product.price,
      });

      product.totalStock -= quantityChange;
    }

    await product.save();
    await cart.save();
    await cart.populate('products.product');

    const totalPrice = cart.products.reduce(
      (sum, item) => sum + item.quantity * item.priceAtTime,
      0
    );

    res.status(200).json({
      error: false,
      message: "Cart updated successfully.",
      cart,
      totalPrice,
    });

  } catch (err) {
    console.error("Update cart error:", err);
    res.status(500).json({ error: true, message: "Server error.", details: err.message });
  }
};





// Delete entire cart for user
export const deleteCart = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: true, message: "User ID is required." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: true, message: "User not found." });

        const cart = await Cart.findOne({ user: user._id });
        if (!cart) return res.status(404).json({ error: true, message: "Cart not found." });

        for (const item of cart.products) {
            const product = await Product.findById(item.product);
            if (product) {
                product.totalStock += item.quantity;
                await product.save();
            }
        }

        await Cart.deleteOne({ user: user._id });

        res.status(200).json({ error: false, message: "Cart deleted successfully." });

    } catch (err) {
        console.error("Delete cart error:", err);
        res.status(500).json({ error: true, message: "Server error.", details: err.message });
    }
};



