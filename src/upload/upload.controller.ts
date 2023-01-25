import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploadDto } from './dto/create-upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  upload(@UploadedFile() uploadfile: CreateUploadDto) {
    return this.uploadService.upload(uploadfile);
  }

  @Get('download')
  download(@Res() res: Response) {
    return this.uploadService.download(res);
  }
}
