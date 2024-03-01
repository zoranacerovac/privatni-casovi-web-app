import express from 'express'
import { LessonController } from '../controllers/lesson.controller'

const lessonRouter = express.Router()


lessonRouter.route("/addLesson").post(
    (req,res)=>new LessonController().addLesson(req,res)
)

lessonRouter.route("/getAllFutureLessons").post(
    (req,res)=>new LessonController().getAllFutureLessons(req,res)
)

lessonRouter.route("/getAllPassLessons").post(
    (req,res)=>new LessonController().getAllPassLessons(req,res)
)

lessonRouter.route("/getLessonRequest").post(
    (req,res)=>new LessonController().getLessonRequest(req,res)
)

lessonRouter.route("/acceptLesson").post(
    (req,res)=>new LessonController().acceptLesson(req,res)
)

lessonRouter.route("/deniedLesson").post(
    (req,res)=>new LessonController().deniedLesson(req,res)
)

lessonRouter.route("/getFiveLessons").post(
    (req,res)=>new LessonController().getFiveLessons(req,res)
)

lessonRouter.route("/getMyStudents").post(
    (req,res)=>new LessonController().getMyStudents(req,res)
)

lessonRouter.route("/getLessons").post(
    (req,res)=>new LessonController().getLessons(req,res)
)

lessonRouter.route("/sendCommentandRating").post(
    (req,res)=>new LessonController().sendCommentandRating(req,res)
)

lessonRouter.route("/getLessonForLastWeek").get(
    (req,res)=>new LessonController().getLessonForLastWeek(req,res)
)

lessonRouter.route("/getLessonForLastMonth").get(
    (req,res)=>new LessonController().getLessonForLastMonth(req,res)
)



export default lessonRouter;