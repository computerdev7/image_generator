import express from "express"
import {getAllImg,deleteImg,downloadImg } from "../controller/imageController.js"
import { getImg } from "../controller/imageGetController.js"
import { updateImg } from "../controller/imageUpdateController.js"
import userToken from "../middleware/tokenMiddleware.js"

let route = express.Router()

route.post('/getimage',userToken,getImg)
route.get('/getallimage/:limit',userToken,getAllImg)
route.post('/update',userToken,updateImg)
route.delete('/delete',userToken,deleteImg)
route.get('/download/:img',userToken,downloadImg)

export default route