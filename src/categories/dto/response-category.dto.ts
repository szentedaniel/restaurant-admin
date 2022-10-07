import { PartialType } from "@nestjs/swagger"
import { kategoriak_fordito, Prisma } from "@prisma/client"
import { languages_type } from "src/languages/dto/response-language.dto"

class kategford {
  kategoria_id: number
  nyelv_id: number
  nev: string
  languages: languages_type
}

export class defaultCategoryResposeDto {
  id: number
  parent_id: number
  kategoria_fordito: kategford[]

}
