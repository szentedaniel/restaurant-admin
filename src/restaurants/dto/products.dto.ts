export class CategoriesDto {
  id: number
  names: NameElement[]
  products: ProductDto[]
}

export class NameElement {
  language: Language
  text: string
}

export class DescElement {
  language: Language
  text: string | null
}

export class Language {
  kod: string
  id: number
  name: string
}


export class ProductDto {
  id: number
  allergens: Allergen[]
  available: boolean
  descriptions: DescElement[]
  favourite: boolean
  image: string
  names: NameElement[]
  priceInEuro: number
  priceInForint: number
}

export class Allergen {
  id: number
  image: string
  names: NameElement[]
}
