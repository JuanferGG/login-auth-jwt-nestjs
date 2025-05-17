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

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  // TODO: Funcion para eliminar la imagen
  private async deleteImage(imagePath: string): Promise<void> {
    if (imagePath && imagePath !== '/uploads/tasks/default_task.jpg') {
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

    const userExist = await this.UserModel.findOne({
      email: createUserDto.email,
    });

    if (userExist) {
      if (image?.path && image.path != '/uploads/Users/UserDefault.png') {
        await unlink(image.path);
      }
      throw new HttpException('El Email ya esta en uso', 401);
    }

    const user = await userCreate.save();

    return {
      message: 'User created successfully',
      user: user,
    };
  }

  // TODO: Login
  async login(loginUser: LoginUserDto) {
    const { email, password } = loginUser;

    const userFind = await this.UserModel.findOne({ email });

    if (!userFind) {
      throw new HttpException('Usuario no encontrado', 401);
    }

    const isPasswordValid = await compare(password, userFind.password);

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    return 'Login';
  }

  findAll() {
    return this.UserModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

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
