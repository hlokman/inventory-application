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

// GET request for initial display of form to delete Item
router.get("/item/:id/delete", itemController.item_delete_get);

// POST request to delete Item
router.post("/item/:id/delete", itemController.item_delete_post);

// GET request for initial display of form to update Item
router.get("/item/:id/update", itemController.item_update_get);

// POST request update Item
router.post("/item/:id/update", itemController.item_update_post);

// GET request for a particular item
router.get("/item/:id", itemController.item_detail);

// GET request for all items page.
router.get("/items", itemController.item_list);

///------------ CATEGORY ROUTES ///

// GET request for initial display of form to add Category
router.get("/category/create", categoryController.category_create_get);

// POST request for creating Category
router.post("/category/create", categoryController.category_create_post);

// GET request for initial display of form to delete Category
router.get("/category/:id/delete", categoryController.category_delete_get);

// POST request to delete Category
router.post("/category/:id/delete", categoryController.category_delete_post);

// GET request for initial display of form to update Category
router.get("/category/:id/update", categoryController.category_update_get);

// POST request to update Category
router.post("/category/:id/update", categoryController.category_update_post);

// GET request for a particular category
router.get("/category/:id", categoryController.category_detail);

// GET request for all items page.
router.get("/categories", categoryController.category_list);

module.exports = router;
