import prisma from "../prisma/prisma.js";
export const addUserToDb = async (user) => {
  return await prisma.user.create({ data: user });
};
