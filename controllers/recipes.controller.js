import { addRecipeToDb, getRecipesFromDb } from "../models/recipes.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addRecipe = async (req, reply) => {
  try {
    const SECRET_KEY = process.env.JWT_SECRET;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, SECRET_KEY)
    const username = verifiedToken.user.username;

    const { title, steps, brewMethod, grinder, coffee } = req.body;

    const newRecipe = { title, steps, brewMethod, username, grinder, coffee };

    const createdRecipe = await addRecipeToDb(newRecipe);
    reply.code(201).send({ createdRecipe });
  } catch (error) {
    console.log(error)
    if (error.name === "JsonWebTokenError") {
      return reply.code(401).send({ msg: "Invalid token" });
    }
    if (error.code === "P2025") {
      const recordMissing = error.meta.cause.split(" ")[1];
      reply.code(500).send({ msg: `${recordMissing} not found` });
    }
    reply.code(500).send({ msg: "Unable to add recipe", error });
  }
};

export const getRecipes = async (req, reply) => {
  try {
    const filter = req.query;

    const filterKeys = Object.keys(filter);

    const validFilters = ["user", "coffee", "grinder", "brewMethod"];

    const isValid = filterKeys.every((key) => validFilters.includes(key));

    if (!isValid) {
      return reply.code(400).send({
        error:
          "Invalid filter(s) provided. Allowed filters: user, coffee, grinder.",
      });
    }
    const recipes = await getRecipesFromDb(filter);
    reply.code(200).send({ recipes });
  } catch (error) {
    reply.code(500).send({ msg: "Unable to get recipes", error });
  }
};
