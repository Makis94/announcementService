import { Advertisement } from 'src/advertisements/entities/advertisement.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  link: string;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.photos)
  advertisement: Advertisement;
}
