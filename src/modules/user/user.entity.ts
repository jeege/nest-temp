import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"

@Entity()
export class User {
    /**
     * 检测密码是否一致
     * @param password0 加密前密码
     * @param password1 加密后密码
     */
    static async comparePassword(password0, password1) {
        return bcrypt.compareSync(password0, password1)
    }

    static encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 500, default: null })
    avatar: string; // 头像

    @Exclude()
    @Column({ length: 500 })
    password: string;

    @Column('simple-enum', { enum: ['admin', 'editor'], default: 'admin' })
    role: string; // 用户角色

    @CreateDateColumn({
        type: 'datetime',
        comment: '创建时间',
        name: 'create_time',
    })
    createTime: Date;

    @UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间',
        name: 'update_time'
    })
    updateTime: Date;

    @Exclude()
    @DeleteDateColumn({
        type: 'datetime',
        comment: '删除',
        name: 'delete_time'
    })
    deleteTime: Date; 

    @BeforeInsert()
    encrypt() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}