import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = 500;
  // Used for authentication
  const users: Prisma.UserCreateManyInput[] = [
    {
      fortyTwoId: '90253',
      googleId: null,
      username: 'syakoubi',
      fullname: 'Soufiane Yakoubi',
      image:
        'https://cdn.intra.42.fr/users/d5a309b3c9b4fc2ba304f767a14ed12a/syakoubi.jpg',
      otpSecret: null,
      otpIsEnabled: false,
    },
    {
      fortyTwoId: '90657',
      username: 'aait-oma',
      fullname: 'Abdeljalil Ait Omar',
      image:
        'https://cdn.intra.42.fr/users/3dde45e554db2a6da0d0b4b2ca08db97/aait-oma.jpg',
      otpSecret: null,
      otpIsEnabled: false,
    },
  ];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      fullname: faker.person.fullName({ firstName, lastName }),
      username: faker.internet.displayName({ firstName, lastName }),
      image: faker.internet.avatar(),
    });
  }

  await prisma.user.createMany({ data: users, skipDuplicates: true });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });