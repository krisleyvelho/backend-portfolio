import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userName: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
