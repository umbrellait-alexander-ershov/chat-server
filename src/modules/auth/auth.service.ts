import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import {
  comparePasswords,
  hashPassword,
  setCookieForToken,
} from './utils/data';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dto/create-profile.dto';

import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: string) {
    return this.jwtService.sign(
      { userId },
      { secret: 'secret', expiresIn: '30d' },
    );
  }

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    const targetUser = await this.userService.getUserByEmail(email);
    if (!targetUser)
      throw new UnauthorizedException('Invalid email or password');

    const isAuth = await comparePasswords(password, targetUser.password);
    if (!isAuth) throw new UnauthorizedException('Invalid email or password');

    const refreshToken = await this.generateRefreshToken(targetUser.id);
    setCookieForToken(refreshToken, res);

    return res.json({
      accessToken: await this.generateAccessToken(targetUser.id, email),
      userId: targetUser.id,
    });
  }

  async createProfile(createProfileDto: CreateProfileDto, res: Response) {
    const { password } = createProfileDto;

    const hashedPassword = await hashPassword(password);

    const newUser = await this.userService.createUser({
      ...createProfileDto,
      password: hashedPassword,
    });

    if (newUser) {
      const refreshToken = await this.generateRefreshToken(newUser.id);
      setCookieForToken(refreshToken, res);

      return res.json({
        accessToken: await this.generateAccessToken(
          newUser.id,
          createProfileDto.email,
        ),
        userId: newUser.id,
      });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is required');

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'secret',
      });

      const newAccessToken = await this.generateAccessToken(
        payload.userId,
        payload.email,
      );
      return res.json({ accessToken: newAccessToken });
    } catch {
      throw new UnauthorizedException('Refresh token is not active');
    }
  }

  async refreshRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is required');

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'secret',
      });

      const newRefreshToken = await this.generateRefreshToken(payload.userId);
      setCookieForToken(newRefreshToken, res);
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not active');
    }
  }
}
