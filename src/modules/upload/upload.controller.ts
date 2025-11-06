import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinary: CloudinaryService) {}

  // Photo upload
  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinary.uploadFile(file, 'photos');
    return { url: result.secure_url };
  }

  // CV upload
  @Post('cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinary.uploadFile(file, 'cvs');
    return { url: result.secure_url };
  }
}
