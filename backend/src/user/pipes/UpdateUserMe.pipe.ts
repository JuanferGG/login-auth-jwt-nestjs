import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserMeDto } from '../dto/update-userMe.dto';

@Injectable()
export class UpdateUserMe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(UpdateUserMeDto, value);
    const errors = await validate(dto, {
      whitelist: true,
      // forbidNonWhitelisted: true, // ! solo para un sistema critico que deba ser muy estricto, para asi saber que parametros extras intentan colar
    });

    if (errors.length > 0) {
      const formattedErrors = errors.flatMap((err) => {
        return Object.entries(err.constraints || {}).map(([key, msg]) => ({
          field: err.property,
          type: key,
          message: msg,
        }));
      });

      return { value: null, errors: formattedErrors };
    }

    return { value: dto, errors: null };
  }
}
