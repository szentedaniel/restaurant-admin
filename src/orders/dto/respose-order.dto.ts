export class DefaultOrdersResponseDto {
  id: string
  user_id: number
  etterem_id: number
  statusz_id: number
  asztal_id: number
  rendeles_ideje: string
  kupon: string | null
  fizetes_most: boolean
  fizetesi_mod_id: number
  fogyasztasi_mod_id: number
  rendelesek_termekek: Array<RendelesTermekDto>
}

class RendelesTermekDto {
  rendeles_id: string
  termek_id: number
  darab: number
}