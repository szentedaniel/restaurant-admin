import { languages_type } from "src/languages/dto/response-language.dto"

class rendeles_statusz_forditoType {
  rendeles_statusz_id: number
  nyelv_id: number
  nev: string
  languages: languages_type
}

export class defaultStatusResponseDto {
  id: number
  rendeles_statusz_fordito: rendeles_statusz_forditoType[]
}