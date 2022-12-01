import express from "express"
import RecipeModel from "../models/Recipe.model.js";
import UserModel from "../models/user.model.js";

const userRoutes = express.Router();

userRoutes.post("/create", async (req,res) => {
    try {
        const newUser = await UserModel.create( { ...req.body });
        return res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Erro ao criar usuário !');
    }
});

userRoutes.get("/read/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.find( { _id: userId} ).populate("recipes");
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Erro ao recuperar dados do usuário !');
    }
});

userRoutes.put("/update/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const updUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { ...req.body }, 
            {new: true, runValidators: true}
        );

        return res.status(200).json(updUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Erro ao atualizar dados do usuário !');
    }
});

userRoutes.delete("/delete/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        await UserModel.findByIdAndDelete(userId);
        await RecipeModel.deleteMany({user: userId});
        return res.status(204).json();
    } catch (e) {
        console.log(e);
        return res.status(500).json('Erro ao atualizar deletar o usuário !');
    }
});

export default userRoutes;