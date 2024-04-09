const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name").exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  //console.log(req.params.id);

  res.render("category_detail", {
    category: category,
    category_items: itemsInCategory,
  });
});

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = [
  body(
    "category",
    "Category name must contain at least 3 characters and must not exceed 100 characters"
  )
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("description", "The description name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.category,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryAlreadyExists = await Category.findOne({
        name: req.body.category,
      }).exec();

      if (categoryAlreadyExists) {
        res.redirect(categoryAlreadyExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];
