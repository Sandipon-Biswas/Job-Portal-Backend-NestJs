import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';


console.log('ENV VALUE = ', process.env.TEST_ENV);
console.log("sfsdf")


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // এটা দিলে পুরো প্রজেক্টে config ব্যবহার করা যাবে, আলাদা করে import লাগবে না
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todoapp'),
    UsersModule,
    AuthModule,
    UploadModule,
    JobsModule,
    ApplicationsModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

