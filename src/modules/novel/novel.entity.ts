import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Novel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    novelId: string;

    @Column()
    novelName: string;

    @Column()
    a: number;

    @Column()
    b: number;

    @Column()
    c: number;

    @Column()
    d: number;

    @Column()
    e: number;
}