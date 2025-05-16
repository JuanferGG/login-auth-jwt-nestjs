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
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config/multer.config';
import { ValidateUserDtoPipe } from './pipes/ValidateUserDto.pipe.';
import { unlink } from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/CreateUser')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body(new ValidateUserDtoPipe()) body:  { value: any; errors: any },
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
    // TODO: Continuar si todo está bien ✅
    return this.userService.create(body.value, image);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
