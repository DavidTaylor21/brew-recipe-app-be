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
    where.coffee = { name: filter.coffee }; 
  }
  if (filter.grinder) {
    where.grinder = { name: filter.grinder }; 
  }
  if(filter.brewMethod) {
    where.brewMethod = filter.brewMethod
  }

  return await prisma.recipe.findMany({
    where,
    include: {
      user: true,    
      coffee: true, 
      grinder: true, 
    },
  });
};
