import { Prisma } from "@prisma/client"
import { categories } from "./categories.data"


export const products: Prisma.termekekCreateInput[] = [
  {
    ar_forint: 950,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 1
        },
        create: categories[0]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Velős pirítós lilahagyma karikákkal',
            nyelv_id: 44,
          }
        ]
      }
    }
  }
]