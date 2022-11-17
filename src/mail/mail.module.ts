import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: {
          host: config.get('MAIL_HOST'),
          // secure: false,
          // auth: {
          //   user: config.get('MAILTRAP_USER'),
          //   pass: config.get('MAILTRAP_PASS'),
          // },
        },
        defaults: {
          from: config.get('MAIL_SENDER'),
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService]
})
export class MailModule { }
