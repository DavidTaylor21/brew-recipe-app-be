import { addGrinder , getGrinders} from "../controllers/grinders.controller.js";
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
const getGrindersOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          grinders: {
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
  handler: getGrinders,
};


export const grindersRoutes = (fastify, options, done) => {
  fastify.post("/grinders", postGrinderOpts);
  fastify.get("/grinders", getGrindersOpts)
  done();
};