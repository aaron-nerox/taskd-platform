import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {Request} from 'express';

/**
 * This is an Authentication/Authorization guard to be used for endpoints protection
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //we get the request values
        const request = context.switchToHttp().getRequest();

        //we call extract JWT which reads the user_token cookie
        const token = this.extractJWT(request)

        //if the token is undefined or empty then return code 401
        if (!token) {
            throw new UnauthorizedException();
        }

        //if the token is not undefined then we extract the payload and push it to the request
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

    /**
     * This reads a cookie called user_token which is a secure cookie and returns its value
     * @param req
     */
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