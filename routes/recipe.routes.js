import express from "express"
import RecipeModel from "../models/Recipe.model.js";
import UserModel from "../models/user.model.js";
import recipesFromJson from "../data.json" assert {type: 'json'} ;

const recipesRoutes = express.Router();

recipesRoutes.get('/all', async (req, res) => {
    try {
        const receitas = await RecipeModel.find();
        return res.status(200).json(receitas);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao realizar a consulta!");
    }
})

recipesRoutes.post('/create/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // const receita = { ...req.body, created: new Date(req.body.created)};
        const receita = { ...req.body, user: userId };
        const newReceita = await RecipeModel.create(receita);

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { recipes: newReceita._id }},
            {runValidators: true}
        );

        return res.status(201).json(newReceita);  
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao criar a receita.");
    }
});

recipesRoutes.post('/import', async (req, res) => {
    try {
        await RecipeModel.insertMany(recipesFromJson);
        const filter = {};
        const projections  = { title : 1};
        const receitas = await RecipeModel.find(filter, projections);
        return res.status(201).json(receitas);  
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao importar as receitas.");
    }
});

recipesRoutes.put('/update/:field/:value', async (req, res) => {
    // Para ficar mais genérico criei este endpoint para receber os parâmetros field e value
    // assim é possível buscar p.ex:
    //      /recipe/update/title/Rigatoni+alla+Genovese para atualizar a receita cujo title é : Rigatoni alla Genovese ou
    //      /recipe/update/creator/Chef+Luigi para atualizar a receita cujo creator foi o Chef Luigi
    // Notar que na chamada a API deve-se separar as palavras do value com + 
    const { field, value } = req.params;
    let filter = {} ;
    filter[field] = value.replaceAll('+', ' ');
    const update = { ...req.body };
    try {
        const updRecipe = await RecipeModel.findOneAndUpdate(
            filter,
            update, 
            {new: true, runValidators: true}
        );
        return res.status(200).json(updRecipe);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro na atualização da receita.");
    }
})

recipesRoutes.delete('/delete/:field/:value', async (req, res) => {
    // Veja explicação acima para a rota /update
    // ex.: /recipe/delete/title/Carrot+Cake
    const { field, value } = req.params;
    let filter = {} ;
    filter[field] = value.replaceAll('+', ' ');
    try {
        const delRecipe = await RecipeModel.deleteOne(filter);
        return res.status(200).json(delRecipe);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível apagar a receita.");
    }
})

export default recipesRoutes;