import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { addCategory, editCategory, listCategories } from "../controllers/categoryController.js"
import { authorize } from "../middleware/authorize.js"
import { validateRequest } from "../middleware/validateRequest.js"
import { createCategorySchema, updateCategorySchema } from "../validations/categoryValidation.js"


const router = express.Router()

router.get("/",authenticateToken,listCategories)
router.post("/",authenticateToken,authorize("ADMIN"),validateRequest(createCategorySchema),addCategory)
router.patch("/:id",authenticateToken,authorize("ADMIN"),validateRequest(updateCategorySchema),editCategory)

export default router