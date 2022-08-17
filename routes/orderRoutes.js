import express from 'express'
import { createOrder, getOrders,getOrderById,confirmOrder } from '../controllers/orderControllers.js'
import { admin, isAuthenticated } from '../middlewares/authMiddlewares.js'
const router = express.Router()



router
    .route('/')
    .get(isAuthenticated,admin,getOrders)
    .post(isAuthenticated,createOrder)

router
    .route('/:id')
    .get(isAuthenticated,getOrderById)
    .post(isAuthenticated,admin,confirmOrder)






export default router