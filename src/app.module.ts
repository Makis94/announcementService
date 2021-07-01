import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [AdvertisementsModule, TypeOrmModule.forRoot(), PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
