import { addGrinder } from "../controllers/grinders.controller.js";
const postGrinderOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          createdGrinder: {
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
  handler: addGrinder,
};

export const grindersRoutes = (fastify, options, done) => {
  fastify.post("/grinders", postGrinderOpts);
  done();
};