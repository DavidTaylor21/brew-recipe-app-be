import prisma from "../prisma/prisma.js";
export const addRecipeToDb = async (recipe) => {
  const { title, steps, brewMethod, user, grinder, coffee } = recipe;
  return await prisma.recipe.create({
    data: {
      title,
      steps,
      brewMethod,
      user: {
        connect: { username: user },
      },
      grinder: { connect: { name: grinder } },
      coffee: { connect: { name: coffee } },
    },
  });
};
export const getRecipesFromDb = async () => {
  return await prisma.recipe.findMany()
}
