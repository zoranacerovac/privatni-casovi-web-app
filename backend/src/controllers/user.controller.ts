import express from 'express'
import User from '../models/user';
import Subject from '../models/subject';

export class UserController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({username: username, 
            password: password}).then((user)=>{
                res.json(user);
        })

    }

    getAllSubjects = (req: express.Request, res: express.Response) => {
        Subject.find({})
        .then((sub)=>{
            res.json(sub);
        })
    }

    register  = (req: express.Request, res: express.Response) => {
        let u = {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            addres: req.body.addres,
            phone: req.body.phone,
            email: req.body.email,
            picture: req.body.picture,

            isStudent: req.body.isStudent,
            school: req.body.school,
            grade: req.body.grade,

            isProfesor: req.body.isProfesor,
            status: req.body.status,
            cv: req.body.cv,
            subjects: req.body.subjects,
            subjectsAdd: req.body.subjectsAdd,
            grades: req.body.grades,
            comment: req.body.comment
        }

        User.findOne({email: req.body.email})
        .then((user)=>{
            if(user){
                if (user.status == "denied"){
                      //Email from denied user
                    res.json("email")
                }else{
                    User.findOne({username: req.body.username})
                    .then((user)=>{
                        if(user){
                            if(user.status == "denied"){
                                //Username from denied user
                            res.json("username");
                            }else{
                                //User exists
                                res.json("exist");
                            }
                        }else{
                            //ADD USER
                            new User(u).save().then(ok=>{
                                res.json("OK")
                            }).catch(err=>{
                                console.log(err)
                            })
                        }
                    })
                }
            }else{
                User.findOne({username: req.body.username})
                .then((user)=>{
                    if(user){
                        if(user.status == "denied"){
                            //Username from denied user
                        res.json("username");
                        }else{
                            //User exists
                            res.json("exist");
                        }
                    }else{
                        //ADD USER
                        new User(u).save().then(ok=>{
                            res.json("OK")
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                })

              
            }
        })

       
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let usernameU = req.body.username;
        let oldPass = req.body.oldPass;
        let newPass = req.body.newPass;

        //console.log(usernameU, oldPass, newPass);
        User.findOne({username: usernameU, password: oldPass})
        .then((u) =>{
            if (u){
                User.findOneAndUpdate({username: usernameU}, {password:newPass})
                .then((str) =>{
                    res.json("OK");
                })
                
            }else{
                res.json("error")
            }
        })
    }

    getStudents  = (req: express.Request, res: express.Response) => {
        User.countDocuments({isStudent: true}).then((count) =>{
            if(count){
                res.json(count);
            }
        })
    }

    getTeacher  = (req: express.Request, res: express.Response) => {
        User.countDocuments({isProfesor: true, status: "approved"}).then((count) =>{
            if(count){
                res.json(count);
            }
        })
    }


    getSpecificUser = (req: express.Request, res: express.Response) => {
        let usernameU = req.body.username;
        User.findOne({username: usernameU}).then((u)=>{
            //console.log(u);
            if (u){
                
                res.json(u);
            }
        })
    }

    changeDataUser = (req: express.Request, res: express.Response) => {
        //console.log(req.body.user);
        const userDataToUpdate = {
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            addres: req.body.user.addres,
            email: req.body.user.email,
            phone: req.body.user.phone,
            school: req.body.user.school,
            grade: req.body.user.grade,
            picture: req.body.user.picture
        };
        User.findOneAndUpdate({username: req.body.user.username}, userDataToUpdate)
        .then((str) =>{
            res.json("OK");
        })
    }


    //Ova funkcija menja podatke o profesoru
    //Azurira kolekciju Subject takodje
    changeDataProfessor  = (req: express.Request, res: express.Response) => {
        const userDataToUpdate = {
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            addres: req.body.user.addres,
            email: req.body.user.email,
            phone: req.body.user.phone,
            subjects: req.body.user.subjects,
            grades: req.body.user.grades,
            picture: req.body.user.picture
        };

        User.findOne({ username: req.body.user.username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'Korisnik nije pronađen.' });
            }

            // Uklanjanje profesora sa svih listi predmeta
            const subjectsToRemoveProfessor = user.subjects;
            subjectsToRemoveProfessor.forEach((subjectName) => {
                Subject.findOneAndUpdate({ name: subjectName }, { $pull: { professors: { firstname: userDataToUpdate.firstname, lastname: userDataToUpdate.lastname, username: req.body.user.username } } })
                    .then(() => {
                        console.log(`Profesor ${userDataToUpdate.firstname} ${userDataToUpdate.lastname} je uspešno uklonjen sa predmeta ${subjectName}.`);
                    })
                    .catch((error) => {
                        console.error(`Greška prilikom uklanjanja profesora sa predmeta ${subjectName}:`, error);
                    });
            });

            // Nakon što smo uklonili profesora sa svih predmeta, ažuriramo informacije o korisniku
            User.findOneAndUpdate({ username: req.body.user.username }, userDataToUpdate)
                .then(() => {
                         // Dodavanje profesora na nove predmete
                         const subjectsToAddProfessor = req.body.user.subjects;
                         subjectsToAddProfessor.forEach((subjectName: string) => {
                             Subject.findOneAndUpdate({ name: subjectName }, { $push: { professors: { firstname: userDataToUpdate.firstname, lastname: userDataToUpdate.lastname, username: req.body.user.username} } })
                                 .then(() => {
                                     console.log(`Profesor ${userDataToUpdate.firstname} ${userDataToUpdate.lastname} je uspešno dodat na predmet ${subjectName}.`);
                                 })
                                 .catch((error) => {
                                     console.error(`Greška prilikom dodavanja profesora na predmet ${subjectName}:`, error);
                                 });
                         });
                    res.json("OK");
                })
                .catch((error) => {
                    console.error('Greška prilikom ažuriranja informacija korisnika:', error);
                    res.status(500).json({ error: 'Došlo je do greške prilikom ažuriranja informacija korisnika.' });
                });
        })
        .catch((error) => {
            console.error('Greška prilikom pronalaženja korisnika:', error);
            res.status(500).json({ error: 'Došlo je do greške prilikom pronalaženja korisnika.' });
        });
    }
}