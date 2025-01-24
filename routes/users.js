import { addUser } from "../controllers/users.controller.js";

const postItemOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "integer" },
              username: { type: "string" },
              email: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
  handler: addUser,
};

export const userRoutes = (fastify, options, done) => {
  fastify.post("/users", postItemOpts);
  done();
};
