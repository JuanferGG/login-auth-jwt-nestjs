import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class ValidateUserDtoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(CreateUserDto, value);
    const errors = await validate(dto);
    
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
