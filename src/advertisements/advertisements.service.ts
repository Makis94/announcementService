import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { PhotosService } from '../photos/photos.service';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private userRepository: Repository<Advertisement>,
    private photosService: PhotosService,
  ) {}
  async create(createAdvertisementDto: CreateAdvertisementDto) {
    let photoData;
    if (createAdvertisementDto.name.length > 200) return 'make name shorter';
    if (createAdvertisementDto.description.length > 1000)
      return 'make description shorter';
    if (createAdvertisementDto.photos.length > 3)
      return 'Take 3 or less photo items';
    const insertResult = await this.userRepository.insert(
      createAdvertisementDto,
    );

    createAdvertisementDto.photos.forEach((photo) => {
      photoData = {
        link: photo,
        advertisement: insertResult.raw[0].id,
      };
      this.photosService.create(photoData);
    });
    return insertResult.raw[0];
  }

  findAll(skip, take, sortByNewest) {
    return this.userRepository.find({
      relations: ['photos'],
      skip: skip,
      take: take,
      order: {
        create_at: sortByNewest === 1 ? 'ASC' : 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id, {
      relations: ['photos'],
    });
  }
}
