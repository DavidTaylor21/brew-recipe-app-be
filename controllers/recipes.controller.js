import {addRecipeToDb} from "../models/recipes.model.js";

export const addRecipe = (req, reply) => {
  const { title, steps, brewMethod, user, grinder, coffee } = req.body;
  const newRecipe = { title, steps, brewMethod, user, grinder, coffee };
  const createdRecipe = addRecipeToDb(newRecipe);
  reply.code(201).send({ createdRecipe });
};
