import { jwt_access_token_option } from 'config/jwt.const';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return await this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + PayLoad 가 필요하다)
      const payload: Payload = {
        sub: user.id.toString(),
        username: user.username,
      };
      const accessToken = await this.jwtService.sign(
        payload,
        jwt_access_token_option,
      );
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
