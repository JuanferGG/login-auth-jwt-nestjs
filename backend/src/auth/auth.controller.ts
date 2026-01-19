import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPipePipe } from './pipes/login.pipe';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ! Login de usuario
  @Post('/login')
  login(
    @Body(new LoginPipePipe()) body: { value: any; errors: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    // TODO: Valida el body y verifica si hay errores en caso de que haya errores lanzar una excepción
    if (body.errors) {
      throw new BadRequestException(body.errors);
    }
    return this.authService.login(body.value, res);
  }

  // ! Logout de usuario
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
