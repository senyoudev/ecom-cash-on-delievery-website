import express from 'express'
import { signIn,register, setAdmin } from '../controllers/userControllers.js'


const router = express.Router()


router
    .route('/admin/:id')
    .post(setAdmin)


router
    .route('/signin')
    .post(signIn)


router
    .route('/register')
    .post(register)








export default router