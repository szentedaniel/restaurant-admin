import { LanguageElement } from "./products.dto"

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
  description: LanguageElement[]
  nyitvatartas: Nyitvatartas[]
  languages: Language[]
}

export class Language {
  id: number
  name: string
  kod: string
}

export class Nyitvatartas {
  end: string
  open: boolean
  start: string
}

export enum serviceType {
  Helyben = 1,
  Elvitel = 2,
  Drive = 3,
}