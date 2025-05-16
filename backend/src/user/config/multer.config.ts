import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

export const multerConfig = {
  storage: diskStorage({
    // TODO: Destino del archivo
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), 'uploads', 'Users');
      // TODO: Crear el directorio si no existe
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    // TODO: Renombrar el archivo
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      cb(null, `${uniqueSuffix}${extension}`);
    },
  }),
  // TODO: Validar el archivo
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedExtensions = /\.(jpg|jpeg|png|gif)$/;

    if (
      !allowedMimes.includes(file.mimetype) ||
      !file.originalname.match(allowedExtensions)
    ) {
      return cb(new BadRequestException('Solo imágenes JPG, PNG o GIF'), false);
    }

    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
