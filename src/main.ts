import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerDarkTheme } from './assets'
import * as dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  dotenv.config()
  // CORS
  app.enableCors()

  // Validation pipe API dto-hoz
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false
  }))

  app.setGlobalPrefix('/api')

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription('API description')
    .setVersion('0.1')
    //.addTag('cats')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs/api', app, document, { customCss: swaggerDarkTheme })

  await app.listen(process.env.PORT || 3001)
}
bootstrap()
