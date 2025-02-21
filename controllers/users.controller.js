import { addUserToDb } from "../models/users.model.js"

export const addUser = (req, reply) => {
    const {username, email, password} = req.body
    const newUser = {username, email, password, createdAt: new Date().toISOString()}
    const createdUser = addUserToDb(newUser)
    reply.code(201).send({createdUser})
}

