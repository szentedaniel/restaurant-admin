export class RestaurantDto {
  id: number
  address: string
  email: string
  favourite: boolean
  images: string[]
  latitude: number
  longitude: number
  name: string
  openingHours: string
  serviceType: number[]
  nyitvatartas: Nyitvatarta[]
  languages: Language[]
  description: string
}

export class Language {
  id: number
  name: string
  kod: string
}

export class Nyitvatarta {
  end: string
  open: boolean
  start: string
}

export enum serviceType {
  Helyben = 1,
  Elvitel = 2,
  Drive = 3,
}