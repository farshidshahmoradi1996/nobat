import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthResponseDto } from './entities/login.entitiy';
import { UserEntityDto } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginInfo: LoginAuthDto): Promise<LoginAuthResponseDto> {
    const findUser = await this.prisma.user.findFirst({
      where: { username: loginInfo.username },
    });
    if (!findUser) {
      throw new HttpException(
        'there is no user with this username.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordCorrect = await this.checkPassword(
      loginInfo.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException(
        'your username or password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    // create Access Token
    const accessToken = await this.generateAccessToken(
      findUser.id,
      findUser.username,
    );

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }
  async registerUser(userInfo: RegisterAuthDto): Promise<UserEntityDto> {
    const findUser = await this.prisma.user.findFirst({
      where: { username: userInfo.username },
    });
    if (findUser) {
      throw new HttpException(
        'this username is now registered.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // save user
    const hashedPassword = await this.generateHashedPassword(userInfo.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: userInfo.username,
        password: hashedPassword,
        profile: {
          create: {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
          },
        },
      },
    });

    const savedUser = await this.userService.findUserById(newUser.id);
    return savedUser;
  }

  generateHashedPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  checkPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  generateAccessToken(userId: number, username: string) {
    return this.jwtService.signAsync({ sub: userId, username });
  }
}