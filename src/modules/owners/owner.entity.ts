import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from 'src/enums/role.enum';
import { Type } from 'src/enums/type.enum';
import { Cat } from '../cats/cat.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ enum: ['user', 'admin'], default: 'user', nullable: true })
  role: Role;

  @Column({ nullable: true })
  type: Type;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @OneToMany(() => Cat, (cat) => cat.owner)
  cats: Cat[];
}
