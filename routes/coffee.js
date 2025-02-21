import { addCoffee } from "../controllers/coffees.controllers.js";
const postCoffeeOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          createdCoffee: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" }
            },
          },
        },
      },
    },
  },
  handler: addCoffee,
};

export const coffeeRoutes = (fastify, options, done) => {
  fastify.post("/coffees", postCoffeeOpts);
  done();
};