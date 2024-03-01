import express from 'express'
import { SubController } from '../controllers/subject.controller'

const subRouter = express.Router()


subRouter.route("/getAllSubject").get(
    (req,res)=>new SubController().getAllSubject(req,res)
)

subRouter.route("/getSpecificSubject").post(
    (req,res)=>new SubController().getSpecificSubject(req,res)
)

export default subRouter;