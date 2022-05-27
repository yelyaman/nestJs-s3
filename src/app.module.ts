import {Module} from "@nestjs/common";
import { FilesModule } from './files/files.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: ['dist/**/**/*.entity{.js,.ts}'],
            synchronize: true,
        }),
        FilesModule
    ]
})
export class AppModule {

}