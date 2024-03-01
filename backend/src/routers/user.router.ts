import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)
//Funkcija radi sa klekcijom subjekti
userRouter.route("/getAllSubjects").get(
    (req,res)=>new UserController().getAllSubjects(req,res)
)

userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/changePassword").post(
    (req,res)=>new UserController().changePassword(req,res)
)

userRouter.route("/getStudents").get(
    (req,res)=>new UserController().getStudents(req,res)
)

userRouter.route("/getTeacher").get(
    (req,res)=>new UserController().getTeacher(req,res)
)

userRouter.route("/getSpecificUser").post(
    (req,res)=>new UserController().getSpecificUser(req,res)
)

userRouter.route("/changeDataUser").post(
    (req,res)=>new UserController().changeDataUser(req,res)
)

userRouter.route("/changeDataProfessor").post(
    (req,res)=>new UserController().changeDataProfessor(req,res)
)





export default userRouter;