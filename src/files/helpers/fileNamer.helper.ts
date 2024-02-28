import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { v4 } from 'uuid';

export const fileNamer = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //if (!file) return callback(new Error('Empty file'), false);
  if (!file) throw new BadRequestException('No existe el archivo');

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${v4()}.${fileExtension}`;

  callback(null, fileName);
};
