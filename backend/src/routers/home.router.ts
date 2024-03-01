import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const homeRouter = express.Router()


// userRouter.route("/register").post(
//     (req,res)=>new UserController().register(req,res)
// )


export default homeRouter;