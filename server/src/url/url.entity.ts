import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  original: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: true
  })
  code: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  custom: boolean;

  @ManyToOne(
    type => UserEntity,
    author => author.urls,
  )
  author: UserEntity;
}
