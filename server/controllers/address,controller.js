import Address from "../models/addres.models.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, state, phoneno, notes } = req.body;
        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            state,
            phoneno,
            notes
        });
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
}
export const getAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.find({ userId });
        if (addresses.length === 0) {
            return res.status(404).json({ message: "No addresses found for this user" });
        }
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error: error.message });
    }
}
export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const updatedData = req.body;
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            updatedData,
            { new: true, runValidators: true }
        );
        if (!updatedAddress) {                  
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: "Error updating address", error: error.message });
    }
}
export const deleteAddress = async (req, res) => {              
    try {
        const { addressId } = req.params;
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
}