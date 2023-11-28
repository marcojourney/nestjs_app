import { Type } from 'src/enums/type.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Owner } from '../owners/owner.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  color: string;

  @Column()
  type: Type;

  @Column()
  age: number;

  @ManyToOne(() => Owner, (owner) => owner.cats)
  owner: Owner;
}
