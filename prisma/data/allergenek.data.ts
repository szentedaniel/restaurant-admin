import { Prisma } from "@prisma/client"
/*
en - 1
de - 23
hu - 44

*/
const gluten: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Glutén', nyelv_id: 44 },
  { nev: 'Gluten', nyelv_id: 23 },
  { nev: 'Gluten', nyelv_id: 1 },
]

const rakfelek: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Rákfélék', nyelv_id: 44 },
  { nev: 'Krabble', nyelv_id: 23 },
  { nev: 'Crustaceans', nyelv_id: 1 },
]

const tojas: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Tojás', nyelv_id: 44 },
  { nev: 'Eier', nyelv_id: 23 },
  { nev: 'Eggs', nyelv_id: 1 },
]

const hal: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Hal', nyelv_id: 44 },
  { nev: 'Fisch', nyelv_id: 23 },
  { nev: 'Fish', nyelv_id: 1 },
]

const foldimogyoro: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Földimogyoró', nyelv_id: 44 },
  { nev: 'Erdnüsse', nyelv_id: 23 },
  { nev: 'Peanuts', nyelv_id: 1 },
]

const szojabab: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Szójabab', nyelv_id: 44 },
  { nev: 'Soja', nyelv_id: 23 },
  { nev: 'Soya', nyelv_id: 1 },
]

const tej: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Tej', nyelv_id: 44 },
  { nev: 'Milch', nyelv_id: 23 },
  { nev: 'Milk', nyelv_id: 1 },
]

const diofelek: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Diófélék', nyelv_id: 44 },
  { nev: 'Nüsse', nyelv_id: 23 },
  { nev: 'Nuts', nyelv_id: 1 },
]

const zeller: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Zeller', nyelv_id: 44 },
  { nev: 'Sellerie', nyelv_id: 23 },
  { nev: 'Celery', nyelv_id: 1 },
]

const mustar: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Mustár', nyelv_id: 44 },
  { nev: 'Senf', nyelv_id: 23 },
  { nev: 'Mustard', nyelv_id: 1 },
]

const szezammag: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Szezámmag', nyelv_id: 44 },
  { nev: 'Sesam', nyelv_id: 23 },
  { nev: 'Sesame', nyelv_id: 1 },
]

const szulfitok: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Szulfitok', nyelv_id: 44 },
  { nev: 'Sulfite', nyelv_id: 23 },
  { nev: 'Sulphite', nyelv_id: 1 },
]

const csillagfurt: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Csillagfürt', nyelv_id: 44 },
  { nev: 'Lupine', nyelv_id: 23 },
  { nev: 'Lupin', nyelv_id: 1 },
]

const puhatestuek: Prisma.allergenek_forditoCreateManyAllergenekInput[] = [
  { nev: 'Puhatestűek', nyelv_id: 44 },
  { nev: 'Mollusken', nyelv_id: 23 },
  { nev: 'Mollusc', nyelv_id: 1 },
]

const Allergenek =
{
  gluten,
  rakfelek,
  tojas,
  hal,
  foldimogyoro,
  szojabab,
  tej,
  diofelek,
  zeller,
  mustar,
  szezammag,
  szulfitok,
  csillagfurt,
  puhatestuek
}




export const allergenek: Prisma.allergenekCreateInput[] = [
  {
    kod: 1,
    image_path: 'files/allergies/1.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.gluten
      }
    }
  },
  {
    kod: 2,
    image_path: 'files/allergies/2.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.rakfelek
      }
    }
  },
  {
    kod: 3,
    image_path: 'files/allergies/3.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.tojas
      }
    }
  },
  {
    kod: 4,
    image_path: 'files/allergies/4.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.hal
      }
    }
  },
  {
    kod: 5,
    image_path: 'files/allergies/5.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.foldimogyoro
      }
    }
  },
  {
    kod: 6,
    image_path: 'files/allergies/6.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.szojabab
      }
    }
  },
  {
    kod: 7,
    image_path: 'files/allergies/7.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.tej
      }
    }
  },
  {
    kod: 8,
    image_path: 'files/allergies/8.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.diofelek
      }
    }
  },
  {
    kod: 9,
    image_path: 'files/allergies/9.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.zeller
      }
    }
  },
  {
    kod: 10,
    image_path: 'files/allergies/10.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.mustar
      }
    }
  },
  {
    kod: 11,
    image_path: 'files/allergies/11.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.szezammag
      }
    }
  },
  {
    kod: 12,
    image_path: 'files/allergies/12.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.szulfitok
      }
    }
  },
  {
    kod: 13,
    image_path: 'files/allergies/13.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.csillagfurt
      }
    }
  },
  {
    kod: 14,
    image_path: 'files/allergies/14.png',
    allergenek_fordito: {
      createMany: {
        data: Allergenek.puhatestuek
      }
    }
  },
]
