import mongoose from 'mongoose';
const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
}, { timestamps: true})
const Address = mongoose.model('Address', addressSchema);
export default Address;
