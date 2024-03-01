import express from 'express'
import lesson from '../models/lesson';
import user from '../models/user';



export class LessonController {

    addLesson = async (req: express.Request, res: express.Response) => {
        let mess:string = "";

        let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        // console.log(today);

        let start = new Date( req.body.lesson.date)
        start.setHours(start.getHours() + 1);

        let duration = 1;
        if (req.body.lesson.double) {
            duration = 2
        }  

        let end = new Date(req.body.lesson.date)
        end.setHours(end.getHours() + duration + 1)
        // console.log(end);
        
        // console.log(req.body.lesson.professorUsername)
        // console.log(today);
        // console.log(start >= today);
        let reservedLessons = await lesson.find({"professorUsername":req.body.lesson.professorUsername
        , "confirmation":true, start:{$gte:today}})

        // console.log(reservedLessons);
        
        reservedLessons.forEach((lesson) =>{
            if(lesson){
         let startLesson = new Date(lesson.start);
         let endLesson = new Date(lesson.end);
            if(
                (start >= startLesson && start < endLesson) ||
                (end > startLesson && end <= endLesson) ||
                (startLesson >= start && startLesson < end) ||
                (endLesson > start && endLesson <= end)
            ){
                // console.log(" vec je zauzet termin");
                mess = "Ovaj termin je zauzet."
            }

        } })

        if(mess === "") {
            
            let cas = new lesson({
                "subject":req.body.lesson.subject,
                "studentUsername":req.body.lesson.studentUsername,
                "studentFirstname":req.body.lesson.studentFirstname,
                "studentLastname":req.body.lesson.studentLastname,
                "professorUsername":req.body.lesson.professorUsername,
                "professorFirstname":req.body.lesson.professorFirstname,
                "professorLastname":req.body.lesson.professorLastname,
                "date": req.body.lesson.date,
                "start": start,
                "end":end,
                "commentStudent": req.body.lesson.commentStudent,
                "commentProfessor": req.body.lesson.commentProfessor,
                "rating": 0 ,
                "double": req.body.lesson.double,
                "description":req.body.lesson.description,
                "explanation": req.body.lesson.explanation,
                "confirmation": req.body.lesson.confirmation,

            });
            cas.save()
            .then()
            mess = "Uspesno ste zakazali cas.";
            res.json(mess);
    }

}

getAllFutureLessons = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
   // console.log(username)
    lesson.find({"studentUsername":username, 
                    "confirmation":true ,
                    start:{$gte: today}
                }).then((lessons) =>{
                    //console.log(lessons)
                    res.json(lessons);
                })
}

getAllPassLessons = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

    lesson.find({"studentUsername":username, 
                    "confirmation":true ,
                    start:{$lte: today}
                }).then((lessons) =>{
                    res.json(lessons);
                })
}


getLessonRequest  = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    lesson.find({"professorUsername":username, 
                "confirmation": false ,
                "description": ""
            }).then((lessons) =>{
                res.json(lessons);
            })

}   

acceptLesson  = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    lesson.findOneAndUpdate({"_id":id},{
        "confirmation": true},
        { new: true }
        ).then((str) => {
                res.json(str);
            })

}


deniedLesson  = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let description = req.body.description;

    // console.log(description);
    lesson.findOneAndUpdate({"_id":id},{
        "description": description},
        { new: true }
        ).then((str) => {
                res.json(str);
            })

}

getFiveLessons  = (req: express.Request, res: express.Response) => {
    let professorUsername = req.body.username;

    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

    let thirdDay = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    thirdDay.setDate(thirdDay.getDate() + 3);

    lesson.find({professorUsername: professorUsername, confirmation: true,
            start: { $gte: today, $lte: thirdDay}
    }).then((lessons) =>{
            lessons.sort((a, b)=>{
                if (a.start < b.start)return -1;
                else return 0;
            })
            res.json( lessons.slice(0,5));
    })
}

getMyStudents = (req: express.Request, res: express.Response) => {
    let professorUsername = req.body.username;
    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

    lesson.find({professorUsername: professorUsername, description: "", confirmation: true,
                start: { $lte: today}})

    .then((lessons) =>{
        const uniqueStudentUsernames: Set<string> = new Set();
        const myStudents = lessons.filter((l: any) => {
            // Ako studentUsername nije već dodat, dodajemo ga u Set i vraćamo true da bismo zadržali lekciju
            if(l.studentUsername){
                if (!uniqueStudentUsernames.has(l.studentUsername)) {
                    uniqueStudentUsernames.add(l.studentUsername);
                    return true;
                }
            return false;
            }
        });
        res.json(myStudents);
    });
}

getLessons = (req: express.Request, res: express.Response) => {
    let studentUsername = req.body.studentUsername;
    let professorUsername = req.body.professorUsername;
    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

    lesson.find({studentUsername: studentUsername,
                professorUsername: professorUsername,
                start: {$lte: today},
                description: "",
                confirmation: true
            }).then((l) => {
                res.json(l);
            })
}

sendCommentandRating  = (req: express.Request, res: express.Response) => {
    let id = req.body.lesson._id;
    lesson.findOneAndUpdate({"_id": id},{
        "commentProfessor": req.body.lesson.commentProfessor,
        "rating": req.body.lesson.rating
        },
        { new: true } 
    ).then((str)=>{
        if (str){
            // console.log(str);
            res.json("OK");
        }
    })
}

getLessonForLastWeek = (req: express.Request, res: express.Response) => {
    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    let sevenDaysAgo = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    lesson.countDocuments({"confirmation": true,
                "start": {$gte: sevenDaysAgo, $lte: today}}).then((l) =>{
        res.json(l);
    })
}

getLessonForLastMonth = (req: express.Request, res: express.Response) => {
    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    let monthAgo = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    monthAgo.setDate(monthAgo.getMonth() - 1);

    lesson.find({"confirmation": true,
                "start": {$gte: monthAgo, $lte: today}}).then((l) =>{
        res.json(l.length);
    })
}


}