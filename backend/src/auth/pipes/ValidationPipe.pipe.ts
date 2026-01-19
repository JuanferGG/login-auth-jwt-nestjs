import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DtoValidationPipe<T extends object> implements PipeTransform {
  constructor(private readonly dtoClass: Type<T>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    //TODO Convertimos el objeto plano en una instancia del DTO
    const dtoInstance = plainToInstance(this.dtoClass, value);

    //TODO Validamos con class-validator
    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      //TODO Mapeamos errores al formato que necesitas
      const formattedErrors = errors.flatMap((err) =>
        Object.entries(err.constraints || {}).map(([key, msg]) => ({
          field: err.property,
          type: key,
          message: msg,
        })),
      );

      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    //TODO 👉 Devolvemos el DTO limpio y validado
    return dtoInstance;
  }
}
