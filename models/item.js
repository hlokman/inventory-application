const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: [0.01, "Price should be at least 0.01$"], max: [10000, "Price should not exceed 10000$"], required: true },
    stock: { type: Number, min: [1, "At least 1 of the item"], max: [99, "Not more than 99 pieces"], required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
})

itemSchema.virtual("url").get(function () {
    return `/catalog/item/${this._id}`
})

module.exports = mongoose.model("Item", itemSchema);