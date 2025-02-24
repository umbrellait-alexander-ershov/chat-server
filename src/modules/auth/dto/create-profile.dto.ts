import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    type: String,
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
  })
  password: string;

  @ApiProperty({
    type: Number,
    description: 'User age',
  })
  age: number;

  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;
}
