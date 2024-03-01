import express from 'express'

import Subject from '../models/subject';
import User from '../models/user';
import user from '../models/user';
import subject from '../models/subject';

export class SubController {


    getAllSubject = (req: express.Request, res: express.Response) => {
        Subject.find({}).then((sub) =>{
            res.json(sub);
        })
    }

    // Ovo radi samo je problem kada imam jednog usera iz nekog razloga ga ne dodaje u niz. sutra ces to resiti <3
    //Radi ;)
    getSpecificSubject = async (req: express.Request, res: express.Response) => {
        let grade = req.body.grade;
        let subjectList: any[] = [];
            const users = await User.find({status: "approved", grades: { $in: [grade] } });
            users.forEach((user) => {
                user.subjects.forEach((subject) => {
                    let subjectExistIndex = subjectList.findIndex((item) => item.name === subject);
                    if (subjectExistIndex !== -1) {
                        subjectList[subjectExistIndex].professors.push({
                            firstname: user.firstname,
                            lastname: user.lastname,
                            username: user.username
                        });
                    } else {
                        subjectList.push({
                            name: subject,
                            professors: [{
                                firstname: user.firstname,
                                lastname: user.lastname,
                                username: user.username
                            }]
                        });
                    }
                });
            });
            res.json(subjectList);
    }
    

}