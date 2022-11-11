import { Prisma } from "@prisma/client"

export const paymentTypes: Prisma.fizetesi_modCreateInput[] = [
  {
    id: 0,
    fizetesi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'Nincs megadva',
            nyelv_id: 44
          },
          {
            nev: 'Not Specified',
            nyelv_id: 1
          },
          {
            nev: 'Unbestimmt',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 1,
    fizetesi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'készpénz',
            nyelv_id: 44
          },
          {
            nev: 'cash',
            nyelv_id: 1
          },
          {
            nev: 'Kasse',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 2,
    fizetesi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'bankkártya',
            nyelv_id: 44
          },
          {
            nev: 'credit card',
            nyelv_id: 1
          },
          {
            nev: 'Kreditkarte',
            nyelv_id: 23
          }
        ]
      }
    }
  }
]