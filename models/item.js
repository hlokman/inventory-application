const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
  description: { type: String, minLength: 3, required: true },
  price: {
    type: Number,
    min: [0.01, "Price should be at least 0.01$"],
    max: [10000, "Price should not exceed 10000$"],
    required: true,
  },
  stock: {
    type: Number,
    min: [0, "Number can't be negative"],
    max: [99, "Not more than 99 pieces"],
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

itemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
