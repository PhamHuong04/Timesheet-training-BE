import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { AuthCredentialDto } from './dto/auth.credential';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthHelper } from '../user/auth.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) {}

  async login(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }

    if (user && isPasswordValid) {
      const payload: JwtPayload = { id: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }
  }
}
