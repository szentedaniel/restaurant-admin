import { Prisma } from "@prisma/client"

export const fogyasztasiModok: Prisma.fogyasztasi_modCreateInput[] = [
  {
    id: 1,
    fogyasztasi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'helyben fogyasztás',
            nyelv_id: 44
          },
          {
            nev: 'local consumption',
            nyelv_id: 1
          },
          {
            nev: 'lokalen Verbrauch',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 2,
    fogyasztasi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'elvitel',
            nyelv_id: 44
          },
          {
            nev: 'takeaway',
            nyelv_id: 1
          },
          {
            nev: 'zum Mitnehmen',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 3,
    fogyasztasi_mod_fordito: {
      createMany: {
        data: [
          {
            nev: 'drive',
            nyelv_id: 44
          },
          {
            nev: 'drive',
            nyelv_id: 1
          },
          {
            nev: 'drive',
            nyelv_id: 23
          }
        ]
      }
    }
  }
]