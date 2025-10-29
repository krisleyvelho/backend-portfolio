import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,) { }

    async generateJwtToken(payload: any): Promise<string> {
      try {
        const token = await this.jwtService.sign(payload);
        return token;
      } catch (error) {
        const msgError = 'Error generating JWT token';
        console.error(msgError, error);
        throw new InternalServerErrorException(msgError);
      }
    }

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = this.userRepository.create(registerUserDto);

    return this.userRepository.save(user).then((user) => {
      return user;
    });
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: loginUserDto.email,
        },
      }); 
      
      if (!user) {
        throw new UnauthorizedException('Email or Password is invalid');
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        loginUserDto.password, 
        user.password
      );
      
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Email or Password is invalid');
      }
  
      const payload = { userId: user.id, userName: user.userName };
      const token = await this.generateJwtToken(payload);
      
      return {
        access_token: token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
        },
      };
    } catch (error) {
      console.error('Error while login:', error);
      throw error;
    }
  }
}