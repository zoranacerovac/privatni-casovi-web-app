import mongoose from 'mongoose'

const Lesson = new mongoose.Schema(
    {
        
        subject: String,
        studentUsername: String,
        studentFirstname: String,
        studentLastname: String,
        professorUsername: String,
        professorFirstname: String,
        professorLastname: String,
        date: Object,
        start: Object,
        end: Object,

        commentStudent: String,
        commentProfessor: String,
        rating: Number,

        double: Boolean,
        description: String,

        explanation: String,
        confirmation: Boolean

        
    },{
      versionKey:false  
    }
);

export default mongoose.model('Lesson', 
Lesson, 'casovi');