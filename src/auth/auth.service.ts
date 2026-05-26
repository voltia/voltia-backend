import { Injectable, UnauthorizedException, ConflictException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private users: any[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    const password = await bcrypt.hash('123456', 10);

    this.users = [
      {
        id: 1,
        name: 'Fabian',
        email: 'fabian@voltia.com',
        password,
        role: 'ADMIN',
        plan: 'CORE',
      },
    ];
  }

  async register(registerDto: RegisterDto) {
    const existingUser = this.users.find(
      (user) => user.email === registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = {
      id: this.users.length + 1,
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role ?? 'USER',
      plan: registerDto.plan ?? 'CORE',
    };

    this.users.push(user);

    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find(
      (item) => item.email === loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
    };
  }
}