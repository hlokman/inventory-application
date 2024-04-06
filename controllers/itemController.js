const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
//const { body, validationResult } = require("express-validator");

/*exports.index = asyncHandler(async (req, res, next) => {
  const [allItems, allCategories] = await Promise.all([
    Item.countDocuments({ name: "sofa" }).exec(),
    Category.countDocuments({ name: "bedroom" }).exec(),
  ]);

  res.render("index", {
    title: "Inventory Management Home",
    category_count: allCategories,
    item_count: allItems,
  });
});*/

exports.index = async (req, res, next) => {
  try {
    const [allItems, allCategories] = await Promise.all([
      Item.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
    ]);

    res.render("index", {
      title: "Inventory Management Home",
      category_count: allCategories,
      item_count: allItems,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.item_list = async (req, res, next) => {
  try {
    const allItems = await Item.find({}, "name").sort({ name: 1 }).exec();

    res.render("item_list", {
      title: "Item List",
      item_list: allItems,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.item_detail = async (req, res, next) => {
  try {
    const item_detail = await Item.findById(req.params.id)
      .populate("category")
      .exec();

    res.render("item_detail", {
      item_detail: item_detail,
    });
  } catch (err) {
    console.log(err);
  }
};
