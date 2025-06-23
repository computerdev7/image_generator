import express from "express"
import { getImg,getAllImg,updateImg,deleteImg } from "../controller/imageController.js"
import userToken from "../middleware/tokenMiddleware.js"

let route = express.Router()

route.post('/getimage',userToken,getImg)
route.get('/getallimage',userToken,getAllImg)
route.post('/update',userToken,updateImg)
route.delete('/delete',userToken,deleteImg)

export default route