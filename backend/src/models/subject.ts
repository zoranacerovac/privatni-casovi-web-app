import mongoose from 'mongoose'

const Subject = new mongoose.Schema(
    {
        name: String,
        professors: Array
    },{
      versionKey:false  
    }
);

export default mongoose.model('Subject', 
Subject, 'predmeti');