import { Entity, Column, PrimaryGeneratedColumn, Generated, TreeParent, TreeChildren, TreeLevelColumn, Tree } from 'typeorm';

@Entity()
@Tree("closure-table")
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  memberId: string;

  @Column()
  name: string;

  @Column()
  isSure: boolean;

  @Column()
  isRelatedByBlood: boolean;

  @Column('date')
  born: Date;

  @Column({
    type: 'date',
    nullable: true
  })
  dead: Date;

  @TreeParent()
  parent: Member;

  @TreeChildren({ cascade: true })
  children: Member[];

}