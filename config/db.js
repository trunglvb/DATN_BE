//connect db
import mongoose from "mongoose";
import 'dotenv/config'

const dbUserName = process.env.DB_USERNAME
const dbPwd = process.env.DB_PWD
const dbURI = `mongodb+srv://${dbUserName}:${dbPwd}@cluster0.htpyu9l.mongodb.net/?retryWrites=true&w=majority`

export async function connectDb() {
    try {
        await mongoose.connect(dbURI)
        console.log("Connected Database");
    } catch (e) {
        console.log(e)
        console.log("Cannot connect to Database")
    }
}
