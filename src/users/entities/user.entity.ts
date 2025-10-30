import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({nullable: true})
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;
}