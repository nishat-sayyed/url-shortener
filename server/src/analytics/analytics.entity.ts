import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('page_views')
export class PageViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  path: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  ip_address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  region: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  country: string;

  @CreateDateColumn()
  visited_at: Date;
}
