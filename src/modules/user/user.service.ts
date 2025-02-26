import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entites';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserThemeDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const targetUser = await this.userModel.findOne({
      email: userDto.email,
    });

    if (targetUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async getUserById(id: Types.ObjectId) {
    const targetUser = await this.userModel
      .findById(id)
      .select('-password')
      .exec();

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return targetUser;
  }

  async getUserByEmail(email: string) {
    const targetUser = await this.userModel.findOne({ email }).exec();

    if (!targetUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return targetUser;
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async upDateUser(updatedUserDto: UpdateUserDto) {
    const { id } = updatedUserDto;

    const targetUpdateData = updatedUserDto;
    delete targetUpdateData.id;

    const targetUser = await this.userModel
      .findByIdAndUpdate(id, targetUpdateData, { new: true })
      .select('-password')
      .exec();

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return targetUser;
  }

  async updateUserTheme(updateUserTheme: UpdateUserThemeDto) {
    const { id, theme } = updateUserTheme;

    const targetUser = await this.userModel
      .findByIdAndUpdate(id, { theme }, { new: true })
      .select('-password')
      .exec();

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { status: HttpStatus.OK };
  }

  async getUserTheme(id: string) {
    const targetUser = await this.userModel.findById(id).select('theme').exec();
    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return targetUser;
  }
}
