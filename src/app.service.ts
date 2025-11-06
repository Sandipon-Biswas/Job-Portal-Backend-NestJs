import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'sdfsd Hello Worl sdfd!';
  }
}
