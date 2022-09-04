import { Prisma } from "@prisma/client"
/*
en - 1
de - 23
hu - 44

*/

const eloetelek: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Előételek', nyelv_id: 44 },
  { nev: 'Vorspeisen', nyelv_id: 23 },
]
const salatak: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Friss Saláták', nyelv_id: 44 },
  { nev: 'Frische Salate', nyelv_id: 23 },
]
const levesek: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Levesek', nyelv_id: 44 },
  { nev: 'Suppen', nyelv_id: 23 },
]
const magyarsagok: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Platános magyarságok és egyéb finomságok', nyelv_id: 44 },
  { nev: 'Echt ungarisches bei Uns', nyelv_id: 23 },
]
const fofogasok: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Platános főfogások lábasjószágokból, meg másból is', nyelv_id: 44 },
  { nev: 'Platan Hauptspeisen', nyelv_id: 23 },
]
const tal: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'A tál', nyelv_id: 44 },
  { nev: 'Der Platte', nyelv_id: 23 },
]
const vega: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Vegetáriánus', nyelv_id: 44 },
  { nev: 'Vegetarisches', nyelv_id: 23 },
]
const gyerek: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Mese étlap gyerekeknek', nyelv_id: 44 },
  { nev: 'Für Die Kleine', nyelv_id: 23 },
]
const savanyuk: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Savanyúk-saláták', nyelv_id: 44 },
  { nev: 'Salate-Eingelegten', nyelv_id: 23 },
]
const desszertek: Prisma.kategoriak_forditoCreateManyKategoriakInput[] = [
  { nev: 'Desszertek-Ízességek', nyelv_id: 44 },
  { nev: 'Süssigkeiten', nyelv_id: 23 },
]

const Categories = {
  eloetelek,
  salatak,
  levesek,
  magyarsagok,
  fofogasok,
  tal,
  vega,
  gyerek,
  savanyuk,
  desszertek,
}

export const categories: Prisma.kategoriakCreateInput[] = [
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.eloetelek
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 1,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    },
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.salatak
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 2,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.levesek
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 3,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.magyarsagok
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 4,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.fofogasok
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 5,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.tal
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 6,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.vega
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 7,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.gyerek
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 8,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.savanyuk
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 9,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  },
  {
    kategoriak_fordito: {
      createMany: {
        data: Categories.desszertek
      }
    },
    etterem_kategoria_rend: {
      connectOrCreate: {
        where: {
          etterem_id_kategoria_id: {
            etterem_id: 1,
            kategoria_id: 10,
          }
        },
        create: {
          etterem_id: 1
        }
      }
    }
  }
]