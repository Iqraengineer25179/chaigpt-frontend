import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        items: [
            {
                // productId is optional — static menu items have no MongoDB product document
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: false },
                name:      { type: String, required: true },
                price:     { type: Number, required: true },
                quantity:  { type: Number, required: true },
                image:     { type: String, default: "" },
            },
        ],
        amount:   { type: Number, required: true },
        address: {
            firstName: { type: String, required: true },
            lastName:  { type: String, required: true },
            street:    { type: String, required: true },
            city:      { type: String, required: true },
            state:     { type: String, required: true },
            zipCode:   { type: String, required: true },
            phone:     { type: String, required: true },
        },
        status:        { type: String, default: "Processing" },
        paymentMethod: { type: String, default: "COD" },  // COD | Online
        payment:       { type: Boolean, default: false },
    },
    { timestamps: true }
);

const orderModel =
    mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
