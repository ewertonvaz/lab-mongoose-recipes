import mongoose from "mongoose";
import RecipeModel from "../models/Recipe.model.js";
import UserModel from "../models/user.model.js";

async function connect(dbName){
    try {
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI, {dbName : dbName});
        console.log(`Connected to data base: ${dbConnect.connection.name}`);
        //await RecipeModel.deleteMany();
        //await UserModel.deleteMany();
    } catch (e) {
        console.log(e);
    }
}

export default connect;