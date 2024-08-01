import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from "@nestjs/passport";
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
}