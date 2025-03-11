import { addUser, loginUser } from "../controllers/users.controller.js";

const postUserOpts = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          createdUser: {
            type: "object",
            properties: {
              id: { type: "integer" },
              username: { type: "string" },
              email: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
          token: { type: "string" },
        },
      },
    },
  },
  handler: addUser,
};

const loginUserOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              username: { type: "string" },
              email: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
  handler: loginUser,
};

export const userRoutes = (fastify, options, done) => {
  fastify.post("/users/register", postUserOpts);
  fastify.post("/users/login", loginUserOpts);
  done();
};
