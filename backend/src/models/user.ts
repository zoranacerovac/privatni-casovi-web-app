import mongoose from 'mongoose'

const User = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        gender: String,
        addres: String,
        phone: String,
        email: String,
        picture: String,

        //Student
        isStudent: String,
        school: String,
        grade: String,

        //Teacher
        isProfesor: String,
        status: String,
        cv: String,
        subjects: Array,
        subjectsAdd: String,
        grades: Array,
        comment: String

    },{
      versionKey:false  
    }
);

export default mongoose.model('User', 
User, 'korisnici');