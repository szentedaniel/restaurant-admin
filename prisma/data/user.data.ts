import { Prisma } from "@prisma/client"
import { DemoRestaurants } from "./restaurants.data"

export const users: Prisma.userCreateInput[] = [
  {
    email: 'user@developer.com',
    name: 'User Developer',
    password: 'developer',
    role: ['user'],
    ettermek: {
      connectOrCreate: {
        where: {
          id: 1
        },
        create: DemoRestaurants.Platan
      }
    }
  },
  {
    email: 'staff@developer.com',
    name: 'Staff Developer',
    password: 'developer',
    role: ['staff'],
    ettermek: {
      connectOrCreate: {
        where: {
          id: 1
        },
        create: DemoRestaurants.Platan
      }
    }
  },
  {
    email: 'admin@developer.com',
    name: 'Admin Developer',
    password: 'developer',
    role: ['admin'],
    ettermek: {
      connectOrCreate: {
        where: {
          id: 1
        },
        create: DemoRestaurants.Platan
      }
    }
  }
]