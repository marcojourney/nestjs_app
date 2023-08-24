import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  appId: string;

  @Column()
  appSecret: string;

  @Column()
  origin: string;
}
