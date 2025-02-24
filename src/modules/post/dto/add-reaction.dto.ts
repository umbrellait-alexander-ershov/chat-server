import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddReactionDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '60d0fe4f5311236168a109ca',
  })
  @IsMongoId()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '60d0fe4f5311236168a109ca',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: String, required: true, example: 'dislike' })
  @IsEnum(['like', 'dislike'])
  @IsNotEmpty()
  reactionType: 'like' | 'dislike';
}
