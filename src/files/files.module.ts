import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './services/files.service';
import {UploadService} from "./services/upload.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "./entity/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService, UploadService]
})
export class FilesModule {}
