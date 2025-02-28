import { addCoffee, getCoffees } from "../controllers/coffees.controllers.js";
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
              name: { type: "string" },
            },
          },
        },
      },
    },
  },
  handler: addCoffee,
};
const getCoffeeOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          coffees: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
              },
              additionalProperties: true,
            },
          },
        },
      },
    },
  },
  handler: getCoffees,
};

export const coffeeRoutes = (fastify, options, done) => {
  fastify.post("/coffees", postCoffeeOpts);
  fastify.get("/coffees", getCoffeeOpts);
  done();
};
