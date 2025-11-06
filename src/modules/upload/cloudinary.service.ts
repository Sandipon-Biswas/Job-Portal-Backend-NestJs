import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dqkjiuluk',
      api_key: '284828553676284',
      api_secret: 'ANv-ZeJ-FOMUjNBOcxJtSF_Y5oY',
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'job-portal',
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
