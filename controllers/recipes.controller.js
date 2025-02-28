import {addRecipeToDb, getRecipesFromDb} from "../models/recipes.model.js";

export const addRecipe = async (req, reply) => {
  try{
    const { title, steps, brewMethod, user, grinder, coffee } = req.body;
    const newRecipe = { title, steps, brewMethod, user, grinder, coffee };
    const createdRecipe = await addRecipeToDb(newRecipe);
    reply.code(201).send({ createdRecipe });

  }
  catch(error){
    if(error.code === "P2025"){
      const recordMissing = error.meta.cause.split(" ")[1]
      reply.code(500).send({msg: `${recordMissing} not found`})
    }
    reply.code(500).send({msg: "Unable to add recipe", error})
  }
};

export const getRecipes = async (req, reply) => {
  try {
    const recipes = await getRecipesFromDb()
    reply.code(200).send({recipes})
  }
  catch(error){
    reply.code(500).send({msg: "Unable to get recipes", error})
  }
}
