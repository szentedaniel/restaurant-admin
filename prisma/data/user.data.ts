import { Prisma } from "@prisma/client"
import { DemoRestaurants } from "./restaurants.data"

export const users: Prisma.userCreateInput[] = [
  {
    email: 'owner@developer.com',
    name: 'Owner Developer',
    password: 'developer',
    role: ['owner'],
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
    },
    ettermek_ettermek_created_by_user_idTouser: {
      connectOrCreate: {
        where: {
          id: 1
        },
        create: DemoRestaurants.Platan
      }
    }
  },
  {
    email: 'restricted@developer.com',
    name: 'Restricted Developer',
    password: 'developer',
    role: ['restricted'],
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
    email: 'user@developer.com',
    name: 'User Developer',
    password: 'developer',
    role: ['user'],
    phone: '+36302982754'
  },
]