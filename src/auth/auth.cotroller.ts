import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { Public } from "./decorators/public-decorator";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Make a login request' })
  @Post('login')
  login(@Body() loginDto: LoginUserDto) { 
    return this.authService.loginUser(loginDto);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post('register')
  async register(@Body() createUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const userRegister = { ...createUserDto, password: hashedPassword };
    return this.authService.registerUser(userRegister);
  }
}