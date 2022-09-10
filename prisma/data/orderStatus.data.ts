import { Prisma } from "@prisma/client"

export const orderStatus: Prisma.rendeles_statuszCreateInput[] = [
  {
    id: 1,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'leadva',
            nyelv_id: 44
          },
          {
            nev: 'placed',
            nyelv_id: 1
          },
          {
            nev: 'aufgegeben',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 2,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'elfogadva',
            nyelv_id: 44
          },
          {
            nev: 'accepted',
            nyelv_id: 1
          },
          {
            nev: 'angenommen',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 3,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'elkészült',
            nyelv_id: 44
          },
          {
            nev: 'completed',
            nyelv_id: 1
          },
          {
            nev: 'abgeschlossen',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 4,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'átvéve',
            nyelv_id: 44
          },
          {
            nev: 'received',
            nyelv_id: 1
          },
          {
            nev: 'erhalten',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 5,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'fizetés kérelmezve',
            nyelv_id: 44
          },
          {
            nev: 'payment requested',
            nyelv_id: 1
          },
          {
            nev: 'Zahlung angefordert',
            nyelv_id: 23
          }
        ]
      }
    }
  },
  {
    id: 6,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'kifizetve',
            nyelv_id: 44
          },
          {
            nev: 'paid',
            nyelv_id: 1
          },
          {
            nev: 'bezahlt',
            nyelv_id: 23
          }
        ]
      }
    }
  }
]