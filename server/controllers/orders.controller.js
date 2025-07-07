import Cart from "../models/cart.models.js";
import Address from "../models/addres.models.js";
import Order from "../models/orders.models.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cart,
      address,
      shippingAddress,
      paymentMethod,
      shippingCost,
      discount,
      tax,
      totalAmount
    } = req.body;

    const [userExists, cartExists, addressExists, shippingExists] = await Promise.all([
      User.findById(userId),
      Cart.findById(cart),
      Address.findById(address),
      Address.findById(shippingAddress)
    ]);

    if (!userExists || !cartExists || !addressExists || !shippingExists) {
      return res.status(400).json({ message: "Invalid cart, user or address reference." });
    }

    const order = new Order({
      user: userId,
      cart,
      address,
      shippingAddress,
      paymentMethod,
      shippingCost,
      discount,
      tax,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("cart")
      .populate("address")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const orders = await Order.find({ user: userId })
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product', // <-- This will fetch actual product data
          model: 'Product'
        }
      })
      .populate('address')
      .populate('shippingAddress')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("cart")
      .populate("address")
      .populate("shippingAddress");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
