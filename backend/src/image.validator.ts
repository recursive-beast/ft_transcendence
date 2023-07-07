import { FileValidator } from '@nestjs/common';
import path from 'path';
import sharp, { Metadata, Sharp } from 'sharp';

export interface ImageFileValidatorOptions {
  formats: Metadata['format'][];
  message?: string | ((format: Metadata['format'][]) => string);
}

export class ImageFileValidator extends FileValidator<ImageFileValidatorOptions> {
  async isValid(file: Express.Multer.File) {
    let image: Sharp;
    let metadata: Metadata;

    try {
      image = sharp(file.path ? file.path : file.buffer);
      metadata = await image.metadata();
    } catch (error) {
      return false;
    }

    const { formats } = this.validationOptions;
    return formats.includes(metadata.format);
  }

  buildErrorMessage(file: Express.Multer.File) {
    const { message, formats } = this.validationOptions;

    if (message) {
      if (typeof message === 'function') return message(formats);
      return message;
    }

    return (
      'Image validation failed (expected format to be one of ' +
      formats.join(', ')
    );
  }
}
