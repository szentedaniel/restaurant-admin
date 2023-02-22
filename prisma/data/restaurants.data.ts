import { Prisma } from "@prisma/client"

const Bassiana: Prisma.ettermekCreateInput = {
  city_name: 'Sárvár',
  address: 'Várkerület utca 29.',
  name: 'Hotel Bassiana',
  adoszam: '26850799600',
  lat: 47.25230026245117,
  lng: 16.93910026550293,
  telefon: '+3695521300',
  email: 'info@bassiana.hu',
  weblap: 'http://www.bassiana.hu/',
  img_path: ['https://bassiana.hu/templ/gfx/design/img_bassiana_logo.png'],
  ceg: 'Hotel Bassiana Kft.',
}

const Platan: Prisma.ettermekCreateInput = {
  city_name: 'Sárvár',
  address: 'Hunyadi u 23',
  name: 'Platán Az Ízes Étterem',
  adoszam: '12345678910',
  lat: 47.255623417945145,
  lng: 16.931086812915034,
  telefon: '+3695312280',
  email: 'platansarvar2017@gmail.com',
  weblap: 'https://platan-etterem.metro.rest/',
  img_path: ['https://static.designmynight.com/uploads/2020/10/INteriors2.jpg', 'https://www.corinthia.com/media/3305/corinthia_budapest_brasserie_atrium_restaurant_tables.jpg'],
  ceg: null,
  aktiv: false,
  etterem_nyelv: {
    createMany: {
      data: [
        {
          nyelv_id: 44
        },
        {
          nyelv_id: 23
        }
      ]
    }
  }
}

export const DemoRestaurants = {
  Bassiana,
  Platan,
}