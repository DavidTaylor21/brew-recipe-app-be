import {addRecipe, getRecipes} from "../controllers/recipes.controller.js";
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
            },
          },
        },
      },
    },
  },
  handler: addRecipe,
};
const getRecipesOpts = {
  schema: {
    response: {
      200 : {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            items: {
              properties: {
                id: { type: "integer" },
                title: { type: "string" },
                steps: { type: "string" },
                brewMethod: { type: "string" },
              },
              additionalProperties: true, 
            }
          }
        }
      }
    }
  },
  handler: getRecipes
}


export const recipesRoutes = (fastify, options, done) => {
  fastify.post("/recipes", postRecipeOpts);
  fastify.get("/recipes", getRecipesOpts)
  done();
};