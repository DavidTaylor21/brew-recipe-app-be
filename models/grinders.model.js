import prisma from "../prisma/prisma.js";
export const addGrinderToDb = async (grinder) => {
  return await prisma.grinder.create({ data: grinder });
};
export const getGrindersFromDb = async ()=> {
  return await prisma.grinder.findMany()
}