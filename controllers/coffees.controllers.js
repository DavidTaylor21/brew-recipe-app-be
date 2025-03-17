import { addCoffeeToDb , getCoffeesFromDb} from "../models/coffees.model.js";

export const addCoffee = async (req, reply) => {
  try {
    const { name } = req.body;
    const newCoffee = { name };

    const createdCoffee = await addCoffeeToDb(newCoffee);

    reply
      .code(201)
      .send({ message: "Coffee added successfully", createdCoffee });
  } catch (error) {
    if (error.code === "P2002") {
      reply.code(500).send({ msg: "Coffee already exists" });
    }
    reply.code(500).send({ msg: "Failed to add coffee", error });
  }
};
export const getCoffees = async (req, reply) => {
  try {
    const coffeeData = await getCoffeesFromDb();
    const coffees = coffeeData.map(coffee => ({
      id: coffee.id,
      name: coffee.name,
      origins: coffee.origins.map(origin => origin.origin.country),
    }));
    console.log(coffees)

    reply.code(200).send({ coffees });
  } catch (error) {
    reply.code(500).send({ msg: "Failed to get coffees", error });
  }
};
