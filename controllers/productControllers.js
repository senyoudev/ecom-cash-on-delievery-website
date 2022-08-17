import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})

    res.status(201).json({products: products.length > 0 ? products : "There is no products yet"})
    
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async(req,res) => {
    const {
        name,
        price,
        description,
        image,
        sex,
        sizes,
        countInStock,
      } = req.body

      const product = new Product({
            name,
            price,
            description,
            image,
            sex,
            sizes,
            countInStock,
            user: req.user._id,
      })

      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
})

// @desc    Fetch a specific products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.status(201).json(product)
    } else {
        res.status(404)
        res.json("Product not found")
    }
    
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct
}