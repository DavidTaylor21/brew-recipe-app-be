import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users.js";
import { grindersRoutes } from "./routes/grinders.js";
import { recipesRoutes } from "./routes/recipes.js";
import { coffeeRoutes } from "./routes/coffee.js";
import prisma from "./prisma/prisma.js";

const PORT = process.env.PORT || 3000;

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Brew Recipes API Documentation",
      description: "API documentation for Brew Recipes",
      version: "1.0.0",
    },
    host: process.env.HOST || "localhost:3000", 
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Brew Recipes API Documentation",
      version: "1.0.0",
    },
  },
});

fastify.register(userRoutes);
fastify.register(grindersRoutes);
fastify.register(recipesRoutes);
fastify.register(coffeeRoutes);

fastify.get("/", async (request, reply) => {
  reply.send({ message: "Hello, Coffee Recipe lovers!" });
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
const checkDbConnection = async () => {
  try {
    await prisma.$queryRaw('SELECT * FROM "Grinder";');
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
checkDbConnection()
start();
