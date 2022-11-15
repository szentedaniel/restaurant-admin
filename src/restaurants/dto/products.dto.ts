export class CategoriesDto {
  id: number
  names: LanguageElement[]
  products: ProductDto[]
}

export class LanguageElement {
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
  names: LanguageElement[]
  priceInEuro: number
  priceInForint: number
}

export class Allergen {
  id: number
  image: string
  names: LanguageElement[]
}
