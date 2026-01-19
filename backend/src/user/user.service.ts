import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserMeDto } from './dto/update-userMe.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { hash } from 'bcrypt';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>
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

  // TODO: Funcion para crear un usuario por el admin
  async createByAdmin(createByAdmin: CreateUserAdminDto) {
    const userExist = await this.UserModel.findOne({
      email: createByAdmin.email,
    });
    if (userExist) {
      throw new HttpException('El Email ya esta en uso', 401);
    }

    const { password } = createByAdmin;
    const saltOrRounds = 10;
    const plainToHash = await hash(password, saltOrRounds);

    const userCreate = new this.UserModel({
      ...createByAdmin,
      password: plainToHash,
      image: '/uploads/Users/UserDefault.png',
    });

    const userSave = await userCreate.save();

    return {
      message: 'User created successfully',
      user: userSave,
    };
  }

  // TODO: Funcion para traer todos los usuarios
  findAll() {
    return this.UserModel.find().exec();
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

  // TODO: Funcion para actualizar el usuario sin su rol
  async updateUserMe(
    id: string,
    updateUserDto: UpdateUserMeDto,
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
  async remove(id: string, userId: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('El id no es valido', 400);
    }
    if (userId == id) {
      throw new HttpException('No puedes eliminar tu propio perfil', 403);
    }

    const userFound = await this.UserModel.findById(id);

    if (!userFound) {
      throw new HttpException('El usuario no existe', 400);
    }

    await this.deleteImage(userFound.image);

    await this.UserModel.findByIdAndDelete(id);

    return { message: 'Usuario eliminado exitosamente' };
  }
}
