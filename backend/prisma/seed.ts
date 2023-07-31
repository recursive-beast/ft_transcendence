import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = 500;
  // Used for authentication
  const users: Prisma.UserCreateManyInput[] = [
    {
      authProviderId: '42:90253',
      username: 'syakoubi',
      fullname: 'Soufiane Yakoubi',
      avatar:
        'https://cdn.intra.42.fr/users/d5a309b3c9b4fc2ba304f767a14ed12a/syakoubi.jpg',
      otpSecret: null,
      otpIsEnabled: false,
    },
    {
      authProviderId: '42:90657',
      username: 'aait-oma',
      fullname: 'Abdeljalil Ait Omar',
      avatar:
        'https://cdn.intra.42.fr/users/3dde45e554db2a6da0d0b4b2ca08db97/aait-oma.jpg',
      otpSecret: null,
      otpIsEnabled: false,
    },
  ];

  for (let i = 0; i < count; i++) {
    users.push({
      authProviderId: faker.string.uuid(),
      fullname: faker.person.fullName(),
      username: faker.internet.displayName(),
      avatar: faker.internet.avatar(),
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
