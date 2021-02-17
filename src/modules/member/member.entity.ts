import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  spouse: string;

  @Column()
  parentId: number;

  @Column()
  levelId: number;

  @Column()
  isSure: boolean;

  @Column()
  remark: string;

  @Column()
  born: string;

  @Column()
  dead: string;
}