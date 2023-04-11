import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from './interface/payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 토큰을 헤더에서 가져온다는 뜻
    });
  }

  async validate(payload: Payload) {
    const { sub, username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { id: parseInt(sub), username: username },
    });
    if (!user) {
      throw new UnauthorizedException('유저가 없습니다');
    }
    return user;
  }
}
