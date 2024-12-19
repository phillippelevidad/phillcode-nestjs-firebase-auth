import { FirebaseService } from 'src/firebase/firebase.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';

export function RolesGuard(...allowedRoles: string[]): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();

      const authHeader = request.headers['authorization'];
      if (!authHeader) {
        return false;
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        return false;
      }

      try {
        const decodedToken = await this.firebaseService.verifyIdToken(
          token,
          true,
        );
        const userRoles = decodedToken.roles ?? [];
        return allowedRoles.some((required) => userRoles.includes(required));
      } catch {
        return false;
      }
    }
  }

  return mixin(RoleGuardMixin);
}
