import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Validation pipe API dto-hoz
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Api documentation')
    .setDescription('API description')
    .setVersion('1.0')
    //.addTag('cats')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs/api', app, document)

  await app.listen(3001)
}
bootstrap()
