import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerDarkTheme } from './assets'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS
  app.enableCors()

  // Validation pipe API dto-hoz
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

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

  await app.listen(3001)
}
bootstrap()
