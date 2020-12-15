import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DataBaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '1234@Qwer',
    database: 'card',
    synchronize: true,
    autoLoadEntities: true
};
