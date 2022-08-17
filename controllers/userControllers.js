import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/User.js'


// @desc    Auth the user & Get the token
// @route   POST /api/users/signin
// @access  Public
const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401).json({
            message: "Invalid user data"
        })
    }
})



// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        res.json({ message: 'User already exists' })
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        res.json({ message: 'Invalid user data' })
    }
})


// @desc    Make a user as an admin
// @route   POST /api/users/admin/:id
// @access  Private(until we configure the first admin,we give this functionnality only to admin)
const setAdmin = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        user.isAdmin = true
        await user.save()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(404).json({message:"user not found"})
    }
})

export {
    signIn,
    register,
    setAdmin
}