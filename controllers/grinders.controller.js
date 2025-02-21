import { addGrinderToDb } from "../models/grinders.model.js"

export const addGrinder = (req, reply) => {
    const {name} = req.body
    const newGrinder = {name}
    const createdGrinder = addGrinderToDb(newGrinder)
    reply.code(201).send({createdGrinder})
}