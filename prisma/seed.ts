import { PrismaClient } from '@prisma/client'
import { categories, languages, users } from './data'
import * as argon from 'argon2'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // nyelvek létrehozása
  await prisma.languages.createMany({
    data: languages
  })

  // userek létrehozása étteremmel
  for (const user of users) {
    const hash = await argon.hash(user.password)
    await prisma.user.create({
      data: {
        ...user,
        password: hash
      }
    })
  }


  // kategoriak feltöltése az étteremhez
  for (const categ of categories) {
    await prisma.kategoriak.create({
      data: categ
    })
  }


  console.log('Seeding done')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })