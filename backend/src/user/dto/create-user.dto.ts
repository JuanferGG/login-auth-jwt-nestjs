import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsIn,
} from 'class-validator';
import { IsNotBlank } from 'src/assets/validators/IsNoBlank.validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotBlank({ message: 'El nombre no puede estar vacío' })
  firstName: string;

  @IsString()
  @MinLength(3)
  @IsNotBlank({ message: 'El apellido no puede estar vacío' })
  lastName: string;

  @IsEmail()
  @IsNotBlank({ message: 'El correo electrónico no puede estar vacío' })
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotBlank({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsString()
  @IsIn(['admin', 'user'], { message: 'El rol debe ser "admin" o "user"' })
  role?: 'admin' | 'user' = 'user';

  @IsString()
  @IsOptional()
  image?: Express.Multer.File | String;
}
