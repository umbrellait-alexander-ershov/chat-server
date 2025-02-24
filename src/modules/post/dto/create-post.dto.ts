import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ type: Types.ObjectId, required: true })
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
