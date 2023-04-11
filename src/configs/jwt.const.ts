import { JwtSignOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const jwt_access_token_option: JwtSignOptions = {
  secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
};

export const jwt_refresh_token_option: JwtSignOptions = {
  secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};
