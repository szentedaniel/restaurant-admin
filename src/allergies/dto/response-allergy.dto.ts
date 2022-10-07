import { languages_type } from "src/languages/dto/response-language.dto"

class allergenek_forditoType {
  allergen_id: number
  nyelv_id: number
  nev: string
  languages: languages_type
}

export class defaultAllergyResponseDto {
  id: number
  kod: number
  image_path: string
  allergenek_fordito: allergenek_forditoType[]
}