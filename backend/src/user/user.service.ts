import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // TODO: Funcion para eliminar la imagen
  private async deleteImage(imagePath: string): Promise<void> {
    if (imagePath && imagePath !== '/uploads/Users/UserDefault.png') {
      try {
        const fullPath = join(process.cwd(), imagePath);
        await unlink(fullPath);
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    }
  }

  // TODO: Funcion para registrar un usuario
  async create(
    createUserDto: CreateUserDto,
    image?: Express.Multer.File,
  ): Promise<{ message: String; user: User }> {
    const userExist = await this.UserModel.findOne({
      email: createUserDto.email,
    });

    if (userExist) {
      if (image?.path && image.path != '/uploads/Users/UserDefault.png') {
        await unlink(image.path);
      }
      throw new HttpException('El Email ya esta en uso', 401);
    }

    const { password } = createUserDto;
    const saltOrRounds = 10;
    const plainToHash = await hash(password, saltOrRounds);

    const userCreate = new this.UserModel({
      ...createUserDto,
      password: plainToHash,
      image: image
        ? `/uploads/Users/${image.filename}`
        : '/uploads/Users/UserDefault.png',
    });

    const user = await userCreate.save();

    return {
      message: 'User created successfully',
      user: user,
    };
  }

  // TODO: Login
  async login(loginUser: LoginUserDto, res: Response) {
    const { email, password } = loginUser;
    const userFind = await this.UserModel.findOne({ email });

    if (!userFind) {
      throw new HttpException('Usuario no encontrado', 401);
    }

    const isPasswordValid = await compare(password, userFind.password);

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    const payload = {
      id: userFind._id,
      firstName: userFind.firstName,
      lastName: userFind.lastName,
    };
    const token = await this.jwtService.signAsync(payload);

    // TODO: Configurar la cookie con el token JWT
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: false, //* Cambiar a false en desarrollo local
      sameSite: 'lax', //* Cambiar a 'lax' para pruebas locales
      maxAge: 3 * 60 * 60 * 1000,
    });

    const ResponseData = {
      user: userFind,
      token: token, //* Seguimos enviando el token para compatibilidad con clientes existentes
    };

    return ResponseData;
  }

  // TODO: Logout
  async logout(res: Response) {
    res.clearCookie('jwt_token');
    return { message: 'Logout exitoso' };
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // TODO: Funcion para actualizar todo el usuario
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image?: Express.Multer.File,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('El id no es valido', 401);
    }
    const userFound = await this.UserModel.findById(id);
    const emailFound = await this.UserModel.findOne({
      email: updateUserDto.email,
    });
    const { password } = updateUserDto;

    if (password?.trim()) {
      const saltOrRounds = 10;
      const plainToHash = await hash(password, saltOrRounds);
      updateUserDto.password = plainToHash;
    }

    if (!userFound) {
      if (image?.path) {
        await unlink(image.path);
      }
      throw new HttpException('El usuario no existe', 400);
    }

    if (emailFound && emailFound.email !== userFound.email) {
      if (image?.path) {
        await unlink(image.path);
      }
      throw new HttpException('El Email ya esta en uso', 401);
    }

    if (image) {
      await this.deleteImage(userFound.image);
    }

    const updateUser = await this.UserModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        image: image ? `/uploads/Users/${image.filename}` : userFound.image,
      },
      { new: true },
    );

    return { message: 'Usuario actualizado exitosamente', updateUser };
  }

  // TODO: Funcion para eliminar un usuario
  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('El id no es valido', 400);
    }

    const userFound = await this.UserModel.findById(id);

    if (!userFound) {
      throw new HttpException('El usuario no existe', 400);
    }

    await this.deleteImage(userFound.image);

    await this.UserModel.findByIdAndDelete(id);

    return { message: 'Usuario eliminada exitosamente' };
  }
}
