import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User password',
  })
  password: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'User age',
  })
  age: number;
}
