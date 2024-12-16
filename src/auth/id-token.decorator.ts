import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IdToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authorization =
      request.headers['authorization'] || request.headers['Authorization'];

    if (authorization && typeof authorization === 'string') {
      // Bearer a97sd9a8sd7a987sd
      const [type, token] = authorization.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }
    return null;
  },
);
