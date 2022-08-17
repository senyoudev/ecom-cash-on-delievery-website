import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity can not be less than 1.']
                },
                price: {
                    type: Number,
                    required: true
                },
                total: {
                    type: Number,
                    required: true
                }
            }
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },
        confirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        confirmedAt: {
            type: Date,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

export default Order