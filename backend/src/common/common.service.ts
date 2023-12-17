import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs/promises';
import path from 'path';
import { rimraf } from 'rimraf';
import sharp from 'sharp';

@Injectable()
export class CommonService {
  constructor(private configService: ConfigService) {}

  async saveAvatar(prefix: string, file: Express.Multer.File) {
    const avatar_origin = this.configService.get('AVATAR_ORIGIN');
    const filename = `${prefix}-${Date.now()}.png`;
    const directory = path.resolve('static/avatars');
    const fullpath = path.join(directory, filename);
    const glob = path.join(directory, `${prefix}-*`);

    await fs.mkdir(directory, { recursive: true });

    try {
      await sharp(file.path).resize(300, 300).toFile(fullpath);
    } catch (error) {
      throw new BadRequestException('Invalid image');
    }

    try {
      await rimraf(glob, { glob: { ignore: fullpath } });
    } catch (error) {
      console.error(error); // print and ignore error
    }

    return new URL(`/static/avatars/${filename}`, avatar_origin).href;
  }
}
