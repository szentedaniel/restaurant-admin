import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { FileuploadModule } from './fileupload/fileupload.module'
import { MailModule } from './mail/mail.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { FavoritesModule } from './favorites/favorites.module'
import { LanguagesModule } from './languages/languages.module'
import { TablesModule } from './tables/tables.module'
import { CategoriesModule } from './categories/categories.module'
import { ConsumptionTypesModule } from './consumption-types/consumption-types.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { AllergiesModule } from './allergies/allergies.module'
import { StatusModule } from './status/status.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*/*/*/*/*/*/*', '/api', 'api/auth/verify', '/api/', '/api/*', '/api*'],

    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    PrismaModule,
    FileuploadModule,
    MailModule,
    UsersModule,
    RestaurantsModule,
    FavoritesModule,
    TablesModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    ConsumptionTypesModule,
    LanguagesModule,
    AllergiesModule,
    StatusModule],
  controllers: [],
  providers: [AppService,],
})
export class AppModule { }
