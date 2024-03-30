const express = require("express");

const {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} = require("../services/categoryService.js");
const {
	getCategoryValidator,
	createCategoryValidator,
	updateCategoryValidator,
	deleteCategoryValidator,
} = require("../utils/validators/categoryValidator.js");
// const { models } = require("mongoose");

const router = express.Router();

// router.post("/", getCategories);

router
	.route("/")
	.post(createCategoryValidator, createCategory)
	.get(getCategories);
router
	.route("/:id")
	.get(getCategoryValidator, getCategoryById)
	.put(updateCategoryValidator, updateCategory)
	.delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
