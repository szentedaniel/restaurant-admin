[![wakatime](https://wakatime.com/badge/github/szentedaniel/restaurant-admin.svg)](https://wakatime.com/badge/github/szentedaniel/restaurant-admin)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

<!---
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
## Description

This application is bootstrapped with [Nest](https://github.com/nestjs/nest) framework.

## Added features

- [x] JWT Authentication
- [x] Role Based access control
- [x] File upload
- [x] Email service with templates
- [x] Prisma integration
- [x] Swagger API Documentation

## Installation

```bash
yarn
```

## Environment variables

Create a `.env` file in the root directory and fill the variables with your datas.

```bash
# Prisma
DATABASE_URL='mysql://username:password@127.0.0.1:3306/dbname?serverVersion=5.7'

# Email
MAIL_HOST=smtp.example.io
MAILTRAP_USER=exampleuser
MAILTRAP_PASS=examplepassword
MAIL_SENDER='"example-sender" <noreply@example.com>'

# Domain settings
PORT=3001
DOMAIN_URL=http://localhost:${PORT}/
API_URL=${DOMAIN_URL}api
IMAGES_URL=${DOMAIN_URL}/files/image

# JWT 
JWT_SECRET=DA31BADC4CBA83B6
REFRESH_SECRET=4BC384776747AA6CFD5CCB86673AB

# GOOGLE AUTH
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
```

## Setup & demo database

Run `yarn db_init` to initialize the database. If you want to seed the database with demo records run `yarn db_demo`.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
