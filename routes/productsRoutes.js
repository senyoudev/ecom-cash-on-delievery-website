import express from 'express'
import {getProducts,createProduct,getProductById, deleteProduct} from '../controllers/productControllers.js'
import { admin, isAuthenticated } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router
    .route('/')
    .get(getProducts)
    .post(isAuthenticated,admin,createProduct)

router
    .route('/:id')
    .get(getProductById)
    .delete(isAuthenticated,admin,deleteProduct)






export default router