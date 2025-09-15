// TODO Libraries
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Res,
  Request,
} from '@nestjs/common';
import { unlink } from 'fs';
import { Response } from 'express';

// TODO Service's
import { UserService } from './user.service';

// TODO Pipe's
import { ValidateUserDtoPipe } from './pipes/ValidateUserDto.pipe';
import { ValidateUpdatePipe } from './pipes/Update.pipe';
import { LoginPipePipe } from './pipes/login-pipe.pipe';
import { UpdateUserMe } from './pipes/UpdateUserMe.pipe';

// TODO Guard's
import { Roles } from 'src/assets/decorators/roles.decorator';
import { AuthGuard } from '../assets/guards/auth.guard';
import { RolesGuard } from 'src/assets/guards/roles.guard';

import { multerConfig } from './config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ! Registro de usuario
  @Post('/RegisterUser')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body(new ValidateUserDtoPipe()) body: { value: any; errors: any },
    @UploadedFile() image: Express.Multer.File,
  ) {
    // TODO: Valida el body y verifica si hay errores en caso de que haya errores, eliminar la imagen y lanzar una excepción
    if (body.errors) {
      // TODO: Eliminar imagen si se subió
      if (image?.path) {
        unlink(image.path, (err) => {
          if (err) throw err;
        });
      }
      throw new BadRequestException(body.errors);
      // ? Una Exception mas corta para el usuario final
      // ? throw new HttpException("Error de validación", 400)
    }
    // TODO: Continuar si todo está bien ✅
    return this.userService.create(body.value, image);
  }

  // ! Login de usuario
  @Post('/login')
  login(
    @Body(new LoginPipePipe()) body: { value: any; errors: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    // TODO: Valida el body y verifica si hay errores en caso de que haya errores, eliminar la imagen y lanzar una excepción
    if (body.errors) {
      throw new BadRequestException(body.errors);
    }
    return this.userService.login(body.value, res);
  }

  // ! Logout de usuario
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.logout(res);
  }

  // ! Obtener todos los usuarios
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/getUsers')
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  //! Actualizar usuario
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  update(
    @Param('id') id: string,
    @Body(new ValidateUpdatePipe()) body: { value: any; errors: any },
    @UploadedFile() image: Express.Multer.File,
  ) {
    // TODO: Valida el body y verifica si hay errores en caso de que haya errores, eliminar la imagen y lanzar una excepción
    if (body.errors) {
      // TODO: Eliminar imagen si se subió
      if (image?.path) {
        unlink(image.path, (err) => {
          if (err) throw err;
        });
      }
      throw new BadRequestException(body.errors);
      // ? Una Exception mas corta para el usuario final
      // throw new HttpException("Error de validación", 400)
    }
    return this.userService.update(id, body.value, image);
  }

  //! Actualizar Usuario sin rol, UserMe
  @UseGuards(AuthGuard)
  @Patch('me/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  updateUserMe(
    @Param('id') id: string,
    @Body(new UpdateUserMe()) body: { value: any; errors: any },
    @UploadedFile() image: Express.Multer.File,
  ) {
    // TODO: Valida el body y verifica si hay errores en caso de que haya errores, eliminar la imagen y lanzar una excepción
    if (body.errors) {
      // TODO: Eliminar imagen si se subió
      if (image?.path) {
        unlink(image.path, (err) => {
          if (err) throw err;
        });
      }
      throw new BadRequestException(body.errors);
      // ? Una Exception mas corta para el usuario final
      // throw new HttpException("Error de validación", 400)
    }
    return this.userService.updateUserMe(id, body.value, image);
  }

  //! Eliminar usuario
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.userService.remove(id, req.user.id);
  }
}
