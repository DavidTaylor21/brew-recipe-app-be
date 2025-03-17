import prisma from "../prisma/prisma.js";
export const addRecipeToDb = async (recipe) => {
  const { title, steps, brewMethod, username, grinder, coffee } = recipe;
  return await prisma.recipe.create({
    data: {
      title,
      steps,
      brewMethod,
      user: {
        connect: { username },
      },
      grinder: { connect: { name: grinder } },
      coffee: { connect: { name: coffee } },
    },
  });
};
export const getRecipesFromDb = async (filter) => {
  const where = {};

  if (filter.user) {
    where.user = { username: filter.user };
  }
  if (filter.coffee) {
    where.coffee = { name: { equals: filter.coffee, mode: "insensitive" } };
  }
  if (filter.grinder) {
    where.grinder = { name: { equals: filter.grinder, mode: "insensitive" } };
  }
  if (filter.brewMethod) {
    where.brewMethod = filter.brewMethod;
  }

  return await prisma.recipe.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      coffee: true,
      grinder: true,
    },
  });
};
