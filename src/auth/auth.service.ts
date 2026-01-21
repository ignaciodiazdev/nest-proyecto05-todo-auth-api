import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import type { JwtPayload } from './jwt.payload';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ){}
  
  async create(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const userExist = await this.userService.findByEmail(email);
    if(userExist){
      throw new BadRequestException('El email ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create(email, hashedPassword, name);

    return this.generateToken(newUser.id);
  }

  async login(loginDto: LoginDto){
    const { email, password } = loginDto;

    const userExist = await this.userService.findByEmail(email);
    if(!userExist){
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if(!isMatch){
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(userExist.id);
  }

  private async generateToken(id: string){
    const payload: JwtPayload = { sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}