import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserThemeDto } from './dto/update-user-theme.dto';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    description: 'Return to the user',
    status: 201,
  })
  @ApiResponse({
    status: 409,
    description: 'This user already exists',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiResponse({
    description: 'Return to the user',
    status: 201,
  })
  @Get(':id')
  getUserById(@Param('id') id: Types.ObjectId) {
    return this.userService.getUserById(id);
  }

  @Get(':email')
  @ApiResponse({
    status: 200,
    description: 'Return to the user',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid email address',
  })
  @ApiResponse({
    status: 500,
    description: 'Interval error',
  })
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @ApiResponse({
    description: 'Return to the users',
    status: 201,
  })
  @ApiResponse({
    status: 404,
    description: 'This user not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.upDateUser(updateUserDto);
  }

  @Post('/update-theme')
  updateUserTheme(@Body() updateUserTheme: UpdateUserThemeDto) {
    return this.userService.updateUserTheme(updateUserTheme);
  }

  @Get('/theme/:id')
  getUserTheme(@Param('id') id: string) {
    return this.userService.getUserTheme(id);
  }
}
