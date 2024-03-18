import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthResponseDto } from './entities/login.entitiy';
import { UserEntity } from 'src/users/entities/user.entity';
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
      throw new BadRequestException('there is no user with this username.');
    }
    const isPasswordCorrect = await this.checkPassword(
      loginInfo.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('your username or password is wrong');
    }

    // create Access Token
    const accessToken = await this.generateAccessToken(
      findUser.id,
      findUser.username,
    );

    const user = await this.userService.findUserById(findUser.id);

    return {
      accessToken,
      tokenType: 'Bearer',
      user,
    };
  }
  async registerUser(userInfo: RegisterAuthDto): Promise<UserEntity> {
    const findUser = await this.prisma.user.findFirst({
      where: { username: userInfo.username },
    });
    if (findUser) {
      throw new BadRequestException('this username is now registered.');
    }

    // save user
    const hashedPassword = await this.generateHashedPassword(userInfo.password);

    const userRole = userInfo.role === 'DOCTOR' ? userInfo.role : 'USER';

    const newUser = await this.prisma.user.create({
      data: {
        username: userInfo.username,
        password: hashedPassword,
        role: userRole,
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
