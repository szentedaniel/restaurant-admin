import { customAlphabet } from 'nanoid'
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const genTableUniqueCode = (id: number) => {
  const nanoid = customAlphabet(alphabet, 5)
  const str = "" + id
  const ans = ('00000' + str).substring(str.length)
  const ehh = nanoid() + ans

  return ehh
}

export const genOrderUniqueId = () => {
  const nanoid = customAlphabet(alphabet, 8)
  return nanoid()
}