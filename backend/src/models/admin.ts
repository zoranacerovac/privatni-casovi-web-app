import mongoose from 'mongoose'

const Admin = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String

    },{
      versionKey:false  
    }
);

export default mongoose.model('Admin', 
Admin, 'admin');