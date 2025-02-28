import prisma from "../prisma/prisma.js";
export const addCoffeeToDb = async (coffee) => {
  return await prisma.coffee.create({ data: coffee });
};
export const getCoffeesFromDb = async () => {
  return await prisma.coffee.findMany()
}
