import {Injectable} from '@nestjs/common';
import {File} from "../entity/file.entity";
import {UploadService} from "./upload.service";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class FilesService {

    constructor(
        private uploadService: UploadService,
        @InjectRepository(File)
        private fileRepository: Repository<File>
    ) {
    }

    async uploadFile(fileBuffer: Buffer, fileName: string, filetype: string): Promise<File> {
        const uploadedFile = await this.uploadService.uploadFileToS3(fileBuffer, fileName, filetype)
        return await this.fileRepository.save({
            name: fileName,
            key: uploadedFile.Key,
            path: uploadedFile.Location
        })
    }

    async deleteFile(key: string) {
        const deleteResult = await this.uploadService.deleteFileFromS3(key);
        await this.fileRepository.delete({key})
        return deleteResult;
    }

    async getAllFiles() {
        return await this.fileRepository.find();
    }
}
