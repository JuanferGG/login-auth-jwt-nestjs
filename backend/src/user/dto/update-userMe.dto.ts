import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IsNotBlank } from 'src/assets/validators/IsNoBlank.validator';

export class UpdateUserMeDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @IsNotBlank({ message: 'El nombre no puede estar vacío' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @IsNotBlank({ message: 'El apellido no puede estar vacío' })
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @IsNotBlank({ message: 'El correo electrónico no puede estar vacío' })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @IsNotBlank({ message: 'La contraseña no puede estar vacía' })
  password?: string;

  @IsString()
  @IsOptional()
  image?: Express.Multer.File | String;
}
