import { languages_type } from "src/languages/dto/response-language.dto"

class fogyasztasi_mod_forditoType {
  fogyasztasi_mod_id: number
  nyelv_id: number
  nev: string
  languages: languages_type
}

export class defaultConsumptionTypeResponseDto {
  id: number
  fogyasztasi_mod_fordito: fogyasztasi_mod_forditoType[]
}