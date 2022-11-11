import { Prisma } from "@prisma/client"

export const orderStatus: Prisma.rendeles_statuszCreateInput[] = [
  {
    id: 1,
    rendeles_statusz_fordito: {
      createMany: {
        data: [
          {
            nev: 'megrendelt',
            nyelv_id: 44
          },
          {
            nev: 'ordered',
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
            nev: 'elutasítva',
            nyelv_id: 44
          },
          {
            nev: 'declined',
            nyelv_id: 1
          },
          {
            nev: 'zurückgegangen',
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
    id: 5,
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
    id: 6,
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
    id: 7,
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

export enum OrderStatus {
  Ordered = 1,
  Accepted = 2,
  Declined = 3,
  Completed = 4,
  Received = 5,
  PaymentRequested = 6,
  Paid = 7
}