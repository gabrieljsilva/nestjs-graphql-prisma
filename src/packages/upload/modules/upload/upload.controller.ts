import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic, RequirePermissions } from '@decorators';
import { PERMISSIONS } from '@enums';

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @RequirePermissions(PERMISSIONS.CAN_UPLOAD_FILE)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.uploadService.uploadFile(file);
    delete upload.bucket;
    return upload;
  }

  @IsPublic()
  @Get('/:id')
  async getLocalFileById(@Param('id') id: string) {
    return this.uploadService.getFileById(id);
  }
}
