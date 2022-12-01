import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    default: "Easy Peasy",
  },
  ingredients: [{ type: String }],
  cuisine : {
    type: String,
    required: true,
    trim: true,
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert" , "other"],
    default: "main_course",
  },
  image : {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: "User"},
  created: {
    type: Date,
    default: Date.now
  }
});

const RecipeModel = model("Recipe", recipeSchema);
export default RecipeModel;
