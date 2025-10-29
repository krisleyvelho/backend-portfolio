import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {

  @ApiProperty({example: 'johndoe'})
  @IsString()
  userName: string;

  @ApiProperty({example: '123456'})
  @IsString()
  password: string;

  @ApiProperty({example: 'John Doe'})
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({example: 'johndoe@gmail.com'})
  @IsEmail()
  email: string;
}