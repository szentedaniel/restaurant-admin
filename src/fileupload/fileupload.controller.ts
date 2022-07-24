import { Controller, ForbiddenException, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { FileuploadService } from './fileupload.service'

@ApiTags('files')
@Controller('files')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

        const ext = extname(file.originalname)
        const filenameWithoutExt = file.originalname.slice(0, file.originalname.indexOf(ext))
        const filename = `${filenameWithoutExt}-${uniqueSuffix}${ext}`

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
    return this.fileuploadService.uploadImage(file)
  }

  @Get('image/:filename')
  @ApiParam({
    name: 'filename',
    description: 'Name of the image (*on the server*)',
    example: 'email.png'
  })
  getFile(@Res() res: Response, @Param('filename') filename) {
    return this.fileuploadService.getImage(res, filename)
  }

}
