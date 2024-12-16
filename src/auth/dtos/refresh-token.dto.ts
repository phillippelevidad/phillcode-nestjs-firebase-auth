import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'A valid refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
