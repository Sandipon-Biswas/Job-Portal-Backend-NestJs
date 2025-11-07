import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  //  Safe sign() method (expiresIn & secret handled)
  private sign(payload: Record<string, any>) {
    return this.jwt.sign(payload, {
      secret: "abc",
      expiresIn:  '7d', //  Fix TS error
    });
  }

  // REGISTER
  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);

    //  Safe ObjectId → String
    const userId = (user._id as Types.ObjectId).toString();

    const token = this.sign({
      sub: userId,
      role: user.role,
    });

    return { accessToken: token, user };
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email, true);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    //  password verify
    const ok = await bcrypt.compare(dto.password, (user as any).password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    if (user.banned) throw new UnauthorizedException('Account banned');

    //  Safe ObjectId → String
    const userId = (user._id as Types.ObjectId).toString();

    const token = this.sign({
      sub: userId,
      role: user.role,
    });

    return { accessToken: token, user };
  }
}
