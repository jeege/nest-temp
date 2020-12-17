import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DataBaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'xxxxxx',
    password: 'xxxxxx',
    database: 'test',
    synchronize: true,
    autoLoadEntities: true
};
