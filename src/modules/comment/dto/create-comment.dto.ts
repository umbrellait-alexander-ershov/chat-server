import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, enum: ['Post'], required: true })
  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ type: String, enum: ['Post'], required: true })
  @IsString()
  @IsNotEmpty()
  ownerType: 'Post';

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  user: string;
}
