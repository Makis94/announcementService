import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Photo } from '../../photos/entities/photo.entity';

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  create_at: Date;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => Photo, (photo) => photo.advertisement)
  photos: Photo[];
}
