import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    //   MailerModule.forRoot({
    //     // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    //     // or
    //     defaults: {
    //       from: '"No Reply" <noreply@example.com>',
    //     },
    //     template: {
    //       dir: join(__dirname, 'templates'),
    //       adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // ],
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: {
          host: 'smtp.mailtrap.io',
          // secure: false,
          auth: {
            user: config.get('MAILTRAP_USER'),
            pass: config.get('MAILTRAP_PASS'),
          },
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
