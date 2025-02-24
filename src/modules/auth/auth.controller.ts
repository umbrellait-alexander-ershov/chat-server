import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'auth success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Profile register' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'profile register',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ) {
    return this.authService.createProfile(createProfileDto, res);
  }

  @Get('/refresh')
  @ApiOperation({ summary: 'Refresh refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token is refreshed',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  refreshRefreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshRefreshToken(req, res);
  }

  @Get('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token is refreshed',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshAccessToken(req, res);
  }
}
