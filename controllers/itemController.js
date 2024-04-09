const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { all } = require("../routes");
const { body, validationResult } = require("express-validator");
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

exports.item_create_get = async (req, res, next) => {
  try {
    const allCategories = await Category.find().exec();

    res.render("item_form", {
      title: "Create Item",
      category_list: allCategories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.item_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  body(
    "name",
    "Item name must not be empty and must contain at least 3 characters"
  )
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("description", "The description name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("price", "The price must be between 0.01 and 10000")
    .trim()
    .isFloat({ min: 0.01, max: 10000 })
    .escape(),
  body("stock", "The stock must be an integer between 0 and 99")
    .trim()
    .isInt({ min: 0, max: 99 })
    .escape(),
  body("category", "You must choose a category")
    .custom((value) => Array.isArray(value) && value.length === 1)
    .withMessage("You must choose a category (and only one)")
    .escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
      });

      if (!errors.isEmpty()) {
        const allCategories = await Category.find().exec();

        allCategories.forEach((cat) => {
          if (req.body.category.includes(cat._id.toString())) {
            cat.checked = "true";
          }
        });
        /*allCategories.forEach((cat) => {
          console.log(cat.checked);
        });*/

        res.render("item_form", {
          title: "Create Item",
          category_list: allCategories,
          item: item,
          errors: errors.array(),
        });
        return;
      } else {
        await item.save();
        res.redirect(item.url);
      }
    } catch (err) {
      console.log(err);
    }
  },
];

exports.item_delete_get = async (req, res, next) => {
  try {
    const item_detail = await Item.findById(req.params.id).exec();

    if (item_detail === null) {
      res.redirect("/catalog/items");
    }

    res.render("item_delete", {
      title: `Delete Item ${item_detail.name}`,
      item_detail: item_detail,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.item_delete_post = async (req, res, next) => {
  try {
    const item_detail = await Item.findById(req.params.id).exec();

    if (item_detail === null) {
      res.redirect("/catalog/items");
    }

    await Item.findByIdAndDelete(req.body.itemid);
    res.redirect("/catalog/items");
  } catch (err) {
    console.log(err);
  }
};

exports.item_update_get = async (req, res, next) => {
  try {
    const [item, category_list] = await Promise.all([
      Item.findById(req.params.id).exec(),
      Category.find({}).exec(),
    ]);

    if (item === null) {
      res.redirect("/catalog/items");
    }

    category_list.forEach((cat) => {
      if ([item.category._id.toHexString()].includes(cat._id.toString())) {
        cat.checked = "true";
      }
    });
    res.render("item_form", {
      title: "Update Item",
      item: item,
      category_list: category_list,
      update: "update",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.item_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  body(
    "name",
    "Item name must not be empty and must contain at least 3 characters"
  )
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("description", "The description name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("price", "The price must be between 0.01 and 10000")
    .trim()
    .isFloat({ min: 0.01, max: 10000 })
    .escape(),
  body("stock", "The stock must be an integer between 0 and 99")
    .trim()
    .isInt({ min: 0, max: 99 })
    .escape(),
  body("category", "You must choose a category")
    .custom((value) => Array.isArray(value) && value.length === 1)
    .withMessage("You must choose a category (and only one)")
    .escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const category_list = await Category.find({}).exec();

      const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        _id: req.params.id,
      });

      category_list.forEach((cat) => {
        if (req.body.category.includes(cat._id.toString())) {
          cat.checked = "true";
        }
      });

      if (!errors.isEmpty()) {
        res.render("item_form", {
          title: "Update Item",
          item: item,
          category_list: category_list,
          update: "update",
          errors: errors.array(),
        });
        return;
      } else {
        await Item.findByIdAndUpdate(req.params.id, item);
        res.redirect(item.url);
      }
    } catch (err) {
      console.log(err);
    }
  },
];
