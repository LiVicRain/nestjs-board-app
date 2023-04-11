import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  @IsString()
  // @MinLength(2, { message: '아이디를 2글자보다 크게 지어라' })
  // @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(4)
  // @MaxLength(6)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 숫자와 비밀번호만 가능합니다',
  })
  password: string;
}
