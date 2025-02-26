import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'User id',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    type: Number,
    description: 'User age',
  })
  age: number;

  @ApiProperty({
    type: String,
    description: 'User theme',
  })
  theme: string;

  @ApiProperty({
    type: String,
    description: 'User about yourself',
  })
  aboutYourself: string;

  @ApiProperty({
    type: String,
    description: 'User city',
  })
  city: string;

  @ApiProperty({
    type: String,
    description: 'User birthday',
  })
  birthday: string;
}
