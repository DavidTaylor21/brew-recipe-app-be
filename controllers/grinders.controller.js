import { addGrinderToDb, getGrindersFromDb } from "../models/grinders.model.js";

export const addGrinder = async (req, reply) => {
  try {
    const { name } = req.body;
    const newGrinder = { name };

    const createdGrinder = await addGrinderToDb(newGrinder);

    reply.code(201).send({
      message: "Grinder added successfully",
      createdGrinder,
    });
  } catch (error) {
    if (error.code === "P2002") {
      reply.code(500).send({ msg: "Grinder already exists" });
    }
    reply.code(500).send({ msg: "Failed to add grinder", error });
  }
};
export const getGrinders = async (req, reply) => {
  try {
    const grinders = await getGrindersFromDb();
    reply.code(200).send({ grinders });
  } catch (error) {
    reply.code(500).send({ msg: "Failed to fetch grinders", error });
  }
};
