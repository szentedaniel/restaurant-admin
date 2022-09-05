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
          },
          {
            termek_nev: 'Überbackener Hirntoast mit ungarischem Weißbrot, garniert mit Lila Zwiebeln',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1390,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 6 }]
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
            termek_nev: 'Ropogós malacfül chips pikánt, csípős, házi szósszal',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Chips aus Schweineohren mit pikanten, hausgemachten Soße',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2290,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 10 }, { allergen_id: 12 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 2
        },
        create: categories[1]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Platán csirkesaláta ropogós szalonna szeletekkel',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Salat "Platan" mit gegrillten Hühnerstreinfen und ausgelassenem Speck',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2190,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 4 }, { allergen_id: 7 }, { allergen_id: 10 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 2
        },
        create: categories[1]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Rábai színes saláta bundázott harcsacsíkokkal',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Wallerfilet Streifen in Mantel mit grünen Salat',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1190,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 9 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 3
        },
        create: categories[2]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Falusi tyúkhúsleves gazdagon',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Herzhafte Hühnersuppe mit Gemüseeinlage nach Bauern Art',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 990,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 7 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 3
        },
        create: categories[2]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Hűs nyári leves, a szezon gyümölcseiből',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Kälte Obstsuppe',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2990,
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
          id: 4
        },
        create: categories[3]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Szaftos marhapörkölt nokedlivel',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Ungarisches Rindergulasch mit Nockerln',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2550,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 12 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 4
        },
        create: categories[3]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Tüzes bográcsgulyás',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Ungarische Gulaschsuppe mit Rindfleisch',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2590,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 12 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 5
        },
        create: categories[4]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Velővel töltött sertésborda, ahogy mi készítjük',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Schweinskotelette gefüllt mit Hirn, die Leibspeise unseres Chefs',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 2990,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }, { allergen_id: 12 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 5
        },
        create: categories[4]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Platán töltött csirkemell fűszeres burgonyával(füstölt sonkával, sajttal töltve)',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Mit geräuchertem Schopf und Käse gefülltes "Platan" Hühnerfilet, dazu Steakkartoffeln',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 6640,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }, { allergen_id: 10 }, { allergen_id: 12 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 6
        },
        create: categories[5]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Két személyes Platán bőségtál',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Platan Platte für zwei Personen',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1150,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 7 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 7
        },
        create: categories[6]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Egy tál dödölle',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Dödölle mit Frühlingszwiebeln und Gewürzrahmsosse',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 3490,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 7 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 7
        },
        create: categories[6]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Bükkfán füstölt trappista sajt ropogós bundában édesburgonyával és snidlinges majonézzel',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Geräucherte Trappistakäse mit Kartoffeln und Schnittlauchmayonaise',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1990,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }, { allergen_id: 10 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 8
        },
        create: categories[7]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Kis rántottsajt rizzsel és tartármártással',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Gebackener Trappistakäse mit Reis und Tartarsosse',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1990,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 8
        },
        create: categories[7]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Rántott csirkemell tejfellel és reszelt sajttal, rizi-bizivel',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Kleines Wienerschnitzel vom Huhn, bestreut geriebenem Käse dazu Reis und Rahm',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 790,
    ettermek: {
      connect: {
        id: 1
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 9
        },
        create: categories[8]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Paradicsom saláta',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Tomatensalat',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 790,
    ettermek: {
      connect: {
        id: 1
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 9
        },
        create: categories[8]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Uborkasaláta',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Gurkensalat',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1190,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 10
        },
        create: categories[9]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Falusi, házias citromtorta',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Hausgemachte Zitronen Torte',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
  {
    ar_forint: 1190,
    ettermek: {
      connect: {
        id: 1
      }
    },
    termekek_allergenek_rend: {
      createMany: {
        data: [{ allergen_id: 1 }, { allergen_id: 3 }, { allergen_id: 7 }, { allergen_id: 8 }]
      }
    },
    kategoriak: {
      connectOrCreate: {
        where: {
          id: 10
        },
        create: categories[9]
      }
    },
    termekek_fordito: {
      createMany: {
        data: [
          {
            termek_nev: 'Somlói galuska, az elengedhetetlen',
            nyelv_id: 44,
          },
          {
            termek_nev: 'Schomlauer Nockerln- der ungarische Klassiker',
            nyelv_id: 23,
          }
        ]
      }
    }
  },
]