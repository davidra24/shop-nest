import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RawHeaders } from 'src/auth/decorators/raw-headers.decorator';
import { AuthService } from './auth.service';
import { Auth, RoleProtected } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDTO, LoginUserDTO } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return await this.authService.create(createUserDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return await this.authService.login(loginUserDTO);
  }

  @Get('check-status')
  @UseGuards(AuthGuard())
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log({ rawHeaders });
    //console.log({ user: request.user.rawHeaders });
    return { ok: true, message: 'Hola mundo private', user, userEmail };
  }

  //@SetMetadata('roles', ['admin', 'superuser'])
  @Get('private2')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return { ok: true, data: 'hola' };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute() {}
}
