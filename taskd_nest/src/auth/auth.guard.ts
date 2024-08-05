import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {Request} from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractJWT(request)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    extractJWT(req: Request): string | null {
        if (
            req.cookies &&
            'user_token' in req.cookies &&
            req.cookies.user_token.length > 0
        ) {
            return req.cookies.user_token;
        }
        return null;
    }
}