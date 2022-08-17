import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async(req,res) => {
    const {
        products,
        shippingAddress
    } = req.body
    if(products && products.length === 0) {
        res.status(400).json({message:"No items found on the cart"})
    } else {
        const order = new Order({
            user: req.user._id,
            products,
            shippingAddress,
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})
// @desc    Get all the orders
// @route   POST /api/orders/:id
// @access  Private/admin
const getOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({})

    res.status(201).json({orders:orders.length > 0 ? orders : "No orders yet"})
})

// @desc    Create an order
// @route   GEt /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async(req,res) => {
    
    const order = await Order.findById(req.params.id)
  
    if(order) {
        if(order.user.toString() == req.user._id || req.user.isAdmin === true) {
            res.status(201).json(order)
        } else {
            res.status(401).json({message:"you are not authorized to access this order"})
        }
    } else {
        res.status(404)
        res.json({message:"Product not found"})
    }
})

// @desc    Confirm an order when it is processed
// @route   POST /api/orders/:id
// @access  Private/Admin
const confirmOrder = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        order.confirmed = true
        order.confirmedAt = Date.now()
        const updatedOrder = await order.save()
    
        res.status(201).json(updatedOrder)
    } else {
        res.status(404).json({message:"Order not found"})
    }
})


export {
    createOrder,
    getOrders,
    getOrderById,
    confirmOrder
}