import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class ValidateUpdatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(UpdateUserDto, value);
    const errors = await validate(dto, {
      whitelist: true,
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
