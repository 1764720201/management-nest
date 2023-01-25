import { resolve } from 'path';
import { Injectable, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadService {
  async upload(@UploadedFile() uploadfile: CreateUploadDto) {
    return uploadfile;
  }
  download(res: Response) {
    res.download(resolve(__dirname, '../images/1672144855567.jpg'));
  }
}
