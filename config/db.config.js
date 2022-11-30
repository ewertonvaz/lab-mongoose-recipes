import mongoose from "mongoose";
import RecipeModel from "../models/Recipe.model.js";

async function connect(dbName){
    try {
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI, {dbName : dbName});
        console.log(`Connected to data base: ${dbConnect.connection.name}`);
        //return RecipeModel.deleteMany();
    } catch (e) {
        console.log(e);
    }
}

export default connect;