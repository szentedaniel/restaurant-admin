import { Controller, ForbiddenException, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { of } from 'rxjs'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

        const ext = extname(file.originalname)
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`

        callback(null, filename)
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new ForbiddenException('Only image files are allowed!'), false)
      }
      callback(null, true)
    },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File,) {
    try {
      console.log('file', file)
      return {
        'success': true,
        'data': file
      }

    } catch (err) {
      console.log(err)
      return {
        'success': false,
        'data': err
      }
    }
  }

  @Get('image/:filename')
  getFile(@Res() res: Response, @Param('filename') filename) {
    return of(res.sendFile(join(process.cwd(), `./uploads/${filename}`)))
  }
}
