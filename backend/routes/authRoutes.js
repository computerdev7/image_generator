import express from "express"
import { login,signup } from "../controller/authController.js"

let route = express.Router()

route.post('/login',login)
route.post('/signup',signup)

export default route