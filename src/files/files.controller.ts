import {Body, Controller, Delete, Get, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {FilesService} from "./services/files.service";
import {UploadFileDto} from "./dto/uploadFileDto";
import {File} from "./entity/file.entity";
import {DeleteFileDto} from "./dto/deleteFileDto";

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {
    }

    @Get()
    async getAll() {
        console.log("Request to get all files")
        return await this.fileService.getAllFiles()
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file, @Body() body: UploadFileDto): Promise<File> {
        console.log("Request to upload file to S3")
        // mimetype: 'application/pdf'
        const filetype = file.mimetype.split('/')[1]
        return this.fileService.uploadFile(file, body.contract_name, filetype)
    }

    @Delete()
    delete(@Body() body: DeleteFileDto) {
        console.log("Request to delete file in S3")
        return this.fileService.deleteFile(body.key)
    }
}
