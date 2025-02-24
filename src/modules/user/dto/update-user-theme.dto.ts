import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserThemeDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  id: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  theme: string;
}
