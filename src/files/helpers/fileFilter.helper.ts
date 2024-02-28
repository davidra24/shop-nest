import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //if (!file) return callback(new Error('Empty file'), false);
  if (!file) throw new BadRequestException('No existe el archivo');

  const fileExtention = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtensions.includes(fileExtention)) return callback(null, true);

  callback(null, true);
};
