const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .exec();

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

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  res.render("category_delete", {
    title: `Delete Category ${category.name}`,
    category: category,
    category_items: itemsInCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  if (category === null) {
    res.redirect("/catalog/catagories");
  }

  await Category.findByIdAndDelete(req.body.categoryid);
  res.redirect("/catalog/categories");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    res.redirect("/catalog/categories");
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
    update: "update",
  });
});

exports.category_update_post = [
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
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        update: "update",
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(category.url);
    }
  }),
];
