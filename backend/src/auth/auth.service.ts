import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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
      role: userFind.role,
    };
    const token = await this.jwtService.signAsync(payload);

    // TODO: Configurar la cookie con el token JWT
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: true, //* Cambiar a false en desarrollo local
      sameSite: 'none', //* Cambiar a 'lax' para pruebas locales
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
}
