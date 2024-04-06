const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

///------------ ITEM ROUTES ///
// GET catalog home page.
router.get("/", itemController.index);

// GET request for all items page.
router.get("/items", itemController.item_list);

// GET request for a particular item
router.get("/item/:id", itemController.item_detail);

///------------ CATEGORY ROUTES ///
// GET request for all items page.
router.get("/categories", categoryController.category_list);

// GET request for a particular category
router.get("/category/:id", categoryController.category_detail);

module.exports = router;
