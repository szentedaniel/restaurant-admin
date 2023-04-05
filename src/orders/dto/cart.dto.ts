export class CartDto {
  status: number
  canceled: boolean
  quantity: number
  orderId: string
  dailyOrderId: number
  consumptionTypeId: number
  product: Product
}

export class Product {
  allergens: Allergen[]
  available: boolean
  descriptions: Description[]
  favourite: boolean
  id: number
  image: string
  names: Description[]
  priceInEuro: number
  priceInForint: number
}

export class Allergen {
  id: number
  image: string
  names: Description[]
}

export class Description {
  language: Language
  text: string
}

export class Language {
  kod: string
  id: number
  name: string
}

