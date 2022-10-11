import express from 'express';
import { createCategory, deleteCategory } from "../controllers/categoryController.js";

export const router = express.Router();

router.route('/').post(createCategory);
router.route('/:id').delete(deleteCategory);

