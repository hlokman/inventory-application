const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name").exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});
