import { FirebaseService } from 'src/firebase/firebase.service';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async registerUser(dto: RegisterUserDto) {
    const user = await this.firebaseService.createUser({
      displayName: dto.firstName,
      email: dto.email,
      password: dto.password,
    });
    if (dto.roles?.length) {
      await this.firebaseService.setCustomUserClaims(user.uid, {
        roles: dto.roles,
      });
    }
    return user;
  }
}
