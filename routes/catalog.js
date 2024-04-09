const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

///------------ ITEM ROUTES ///
// GET catalog home page.
router.get("/", itemController.index);

// GET request for initial display of form to add Item
router.get("/item/create", itemController.item_create_get);

// POST request for creating Item
router.post("/item/create", itemController.item_create_post);

// GET request for a particular item
router.get("/item/:id", itemController.item_detail);

// GET request for all items page.
router.get("/items", itemController.item_list);

///------------ CATEGORY ROUTES ///

// GET request for initial display of form to add Category
router.get("/category/create", categoryController.category_create_get);

// POST request for creating Category
router.post("/category/create", categoryController.category_create_post);

// GET request for a particular category
router.get("/category/:id", categoryController.category_detail);

// GET request for all items page.
router.get("/categories", categoryController.category_list);

module.exports = router;
