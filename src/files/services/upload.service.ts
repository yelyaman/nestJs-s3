import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {uuid} from "uuidv4";
import {File} from "../entity/file.entity";

@Injectable()
export class UploadService {
    async uploadFileToS3(fileBuffer: Buffer, fileName: string, filetype: string) {
        const s3 = new S3();
        return s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Body: fileBuffer.buffer,
            Key: `${uuid()}-${fileName}.${filetype}`
        }).promise()
    }

    async deleteFileFromS3(key: string){
        const s3 = new S3();
        return await s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: key
        }).promise()
    }
}
