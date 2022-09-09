/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client'
import { allergenek, categories, fogyasztasiModok, languages, orderStatus, paymentTypes, products, users } from './data'
import * as argon from 'argon2'
const prisma = new PrismaClient()
const args = require('minimist')(process.argv.slice(2))
// const argv = require('minimist')(process.argv.slice(2))
console.log(args.demo)

async function main(demo = args.demo) {
  console.log('Seeding...')

  // Nyelvek létrehozása
  await prisma.languages.createMany({
    data: languages
  })

  // Allergének feltöltése
  for (const allergen of allergenek) {
    await prisma.allergenek.create({
      data: allergen
    })
  }

  // Rendelési státuszok feltöltése
  for (const orderStat of orderStatus) {
    await prisma.rendeles_statusz.create({
      data: orderStat
    })
  }

  // Fogyasztási módok feltöltése
  for (const fogyasztasiMod of fogyasztasiModok) {
    await prisma.fogyasztasi_mod.create({
      data: fogyasztasiMod
    })
  }

  // Fizetési módok feltöltése
  for (const paymentType of paymentTypes) {
    await prisma.fizetesi_mod.create({
      data: paymentType
    })
  }


  // DEMO ADATOK
  if (demo === 'true') {
    console.log('CREATING DEMO DATAS')

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

    // termékek feltöltése a kategoriákhoz
    for (const product of products) {
      await prisma.termekek.create({
        data: product
      })
    }
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