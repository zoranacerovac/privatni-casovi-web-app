import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const adminRouter = express.Router()

adminRouter.route("/login").post(
    (req,res)=>new AdminController().login(req,res)
)

adminRouter.route("/getPendingUsers").get(
    (req,res)=>new AdminController().getPendingUsers(req,res)
)

adminRouter.route("/approved").post(
    (req,res)=>new AdminController().approved(req,res)
)

adminRouter.route("/denied").post(
    (req,res)=>new AdminController().denied(req,res)
)

adminRouter.route("/addSub").post(
    (req,res)=>new AdminController().addSub(req,res)
)

adminRouter.route("/getAllProfessorsAndSubjects").get(
    (req,res)=>new AdminController().getAllProfessorsAndSubjects(req,res)
)

adminRouter.route("/getAllProfessorsAndGrades").get(
    (req,res)=>new AdminController().getAllProfessorsAndGrades(req,res)
)

adminRouter.route("/getAllStudentsGender").get(
    (req,res)=>new AdminController().getAllStudentsGender(req,res)
)

adminRouter.route("/getAllLessons").get(
    (req,res)=>new AdminController().getAllLessons(req,res)
)

export default adminRouter;