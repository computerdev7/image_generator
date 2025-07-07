import express from "express"
import { login,signup,logout } from "../controller/authController.js"

let route = express.Router()

route.post('/login',login)
route.post('/signup',signup)
route.post('/logout',logout)

export default route