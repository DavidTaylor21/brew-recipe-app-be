import {addCoffeeToDb} from "../models/coffees.model.js"

export const addCoffee = (req, reply) => {
    const {name} = req.body
    const newCoffee = {name}
    const createdCoffee = addCoffeeToDb(newCoffee)
    reply.code(201).send({createdCoffee})
}