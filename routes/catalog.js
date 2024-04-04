const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

/// ITEM ROUTES ///
// GET catalog home page.
router.get("/", itemController.index);

// GET all items page.
router.get("/items", itemController.item_list);

/// CATEGORY ROUTES ///
// GET all items page.
router.get("/categories", categoryController.category_list);

module.exports = router;
