import { Injectable, NotFoundException } from '@nestjs/common';
import {
  accessSync,
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs';
import * as uuid from 'uuid';
import * as mime from 'mime';
import { join } from 'path';
import { FileUploader } from '../../types';
import { FileMetadata } from '../../types/file-meta.interface';

@Injectable()
export class LocalUploadProvider implements FileUploader {
  private readonly path: string;

  constructor() {
    this.path = join(process.cwd(), 'uploads');
  }

  private getFilePath(key: string) {
    return join(this.path, key);
  }

  async exists(key: string): Promise<boolean> {
    try {
      accessSync(this.getFilePath(key));
      return true;
    } catch {
      return false;
    }
  }

  async generateKey(file: Express.Multer.File): Promise<string> {
    const id = uuid.v4();
    const type = mime.getExtension(file.mimetype);
    const key = `${id}.${type}`;
    const exists = await this.exists(key);
    if (exists) {
      return this.generateKey(file);
    }
    return key;
  }

  async upload(file: Express.Multer.File): Promise<FileMetadata> {
    return new Promise(async (resolve, reject) => {
      const key = await this.generateKey(file);
      const filePath = this.getFilePath(key);

      createWriteStream(filePath).write(file.buffer, (err) => {
        if (err) {
          return reject(err);
        }
        const fileMetadata = new FileMetadata();
        fileMetadata.key = key;
        fileMetadata.originalName = file.originalname;
        fileMetadata.mimeType = file.mimetype;

        resolve(fileMetadata);
      });
    });
  }

  async getFile(key: string) {
    const exists = await this.exists(key);
    if (!exists) {
      throw new NotFoundException(`cannot find upload with key: ${key}`);
    }
    return createReadStream(this.getFilePath(key));
  }

  async delete(key: string) {
    try {
      const exists = await this.exists(key);
      if (exists) {
        unlinkSync(this.getFilePath(key));
      }
      return true;
    } catch {
      throw new NotFoundException(`cannot find upload with key: ${key}`);
    }
  }
}
