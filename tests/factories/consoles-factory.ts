import prisma from "config/database";
import { faker } from '@faker-js/faker';

export async function createConsoleAndGame() {
    return prisma.console.create({
        data: {
            name: faker.company.name(),
            games: {
                create: {
                    title: faker.name.firstName()
                }
            }            
        },
        include: {
            games: true
        }
    })
};

export async function consoleId4000(){
  return await prisma.console.create({
    data:{
      id: 4000,
      name: faker.name.firstName()
    }
  })
}

export async function postConsole() {
  return { name: faker.company.name() }
};

export async function findFirst(id: number) {
  return await prisma.console.findFirst({
    where:{
      id: id,
    }
  });
};

export async function createGame(title = 'batata', consoleId = 1) {
    return prisma.game.create({
      data: {
        title,
        consoleId
      }
    });
};

  export async function findGame(id) {
    return prisma.game.findUnique({
      where: {id}
    });
};

export async function findGames() {
    return prisma.game.findMany({});
};

