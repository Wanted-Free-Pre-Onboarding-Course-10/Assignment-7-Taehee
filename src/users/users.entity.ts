import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 50)
  @Column({ unique: true })
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
