/* eslint-disable @typescript-eslint/no-var-requires */
const sh = require('shelljs')
const inquirer = require('inquirer')
import { createSpinner } from 'nanospinner'

let silent = true


if (process.argv[2] && process.argv[2] === 'd') {
  silent = false
  console.log('Running in debug mode')

}

const question = async (): Promise<boolean> => {
  const foo = await inquirer.prompt({
    name: 'accepted',
    type: 'confirm',
    message: `Ez a művelet teljesen törli az adatbázist, illetve tartalmát. Biztosan szeretnéd folytatni?`,
    prefix: '❗️'
  })
  return foo.accepted
}

const init = async () => {
  try {
    const accepted = await question()

    if (accepted) {
      let spinner = createSpinner('Creating database...').start()
      try {
        sh.exec('npx prisma migrate reset --force', { silent: silent }).output //
        spinner.success()
      } catch (error: any) {
        spinner.error()
        throw new Error(error)
      }

      spinner = createSpinner('Seed the database with demo records 🌱').start()
      try {
        sh.exec('npx prisma db push --accept-data-loss', { silent: silent }).output
        sh.exec('yarn db_seed --demo=true', { silent: silent }).output
        sh.exec('npx prisma generate', { silent: silent }).output
        spinner.success()
      } catch (error: any) {
        spinner.error()
        throw new Error(error)
      }
      console.log(`Done!`)

      process.exit(0)
    } else {
      process.exit(1)
    }

  } catch (error) {
    console.error(error)
  }
}

init()