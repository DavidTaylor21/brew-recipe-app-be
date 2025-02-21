import {addRecipe} from "../controllers/recipes.controller.js";
const postRecipeOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          createdRecipe: {
            type: "object",
            properties: {
              id: { type: "integer" },
              title: { type: "string" },
              steps: { type: "string" },
              brewMethod: { type: "string" },
              user: { type: "string" },
              grinder: {type: "string"},
              coffee: {type: "string"}
            },
          },
        },
      },
    },
  },
  handler: addRecipe,
};

export const recipesRoutes = (fastify, options, done) => {
  fastify.post("/recipes", postRecipeOpts);
  done();
};