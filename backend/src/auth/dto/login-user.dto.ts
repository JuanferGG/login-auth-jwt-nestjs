import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { IsNotBlank } from 'src/assets/validators/IsNoBlank.validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotBlank({ message: 'El correo electrónico no puede estar en blanco' })
  email: string;

  @IsString()
  @IsNotBlank({ message: 'La contraseña no puede estar en blanco' })
  @MinLength(8)
  password: string;
}
