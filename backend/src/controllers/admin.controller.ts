import express from 'express'

import user from '../models/user';
import admin from '../models/admin';
import subject from '../models/subject';
import lesson from '../models/lesson';

export class AdminController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        admin.findOne({username: username, 
            password: password}).then((user)=>{
                res.json(user);
        })

    }

    getPendingUsers = (req: express.Request, res: express.Response) => {
        user.find({isProfesor: "true", status: "pending"})
        .then((user)=>{
            res.json(user);
        })
    }

    // Approved profesor request
    approved = (req: express.Request, res: express.Response) => {
        let usernameR = req.body.username;

        user.findOneAndUpdate({username: usernameR},{status: "approved"})
        .then(()=>{
            res.json("OK");
            user.findOne({username:usernameR}).then((u)=>{
                if (u){
                    let subjects = u.subjects;
                    subjects.forEach(sub => {
                        //  console.log(sub)

                        subject.findOneAndUpdate(
                            {name: sub},
                            {$push: {
                                professors: { firstname: u.firstname, lastname: u.lastname, username: u.username }
                            }},
                            { new: true }
                        ).then((updatedSubject) => {
                            if(updatedSubject){
                               //console.log(updatedSubject)
                              console.log(`Ažuriran predmet ${updatedSubject.name} sa profesorom ${u.firstname} ${u.lastname} ${u.username}`);
                            }
                        })
                    });
                }
            })
        })
    }
    
    // Denied profesor requst
    denied = (req: express.Request, res: express.Response) => {
        let usernameR = req.body.username;

        user.findOneAndUpdate({username: usernameR},{status: "denied"})
        .then(()=>{
            res.json("OK");
        })
    }

    //Add new subject in database
    addSub = (req: express.Request, res: express.Response) => {
        let name = req.body.name;

        subject.create({name})
        .then((newSubject) => {
            res.status(201).json(newSubject);
        })
    }

    getAllProfessorsAndSubjects = (req: express.Request, res: express.Response) => {
        subject.find({}).then((s)=>{
            res.json(s);
        })
    }

    getAllProfessorsAndGrades = (req: express.Request, res: express.Response) => {
        user.find({"isProfesor" : true, "status": "approved"}).then((u)=>{
            res.json(u);
        })
    }

    getAllStudentsGender= (req: express.Request, res: express.Response) => {
        user.find({"isStudent" : true}).then((u)=>{
            res.json(u);
        })
    }

    getAllLessons = (req: express.Request, res: express.Response) => {
        const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

        // const startDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        // startDate.setFullYear(startDate.getFullYear() - 1);
        // startDate.setMonth(0);
        // startDate.setDate(1);
        
        lesson.find({"confirmation":true ,
                    start:{$lte: today}}).then((l)=>{
                        res.json(l);
        })
    }
}