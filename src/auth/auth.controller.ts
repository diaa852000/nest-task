import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    async singUp(@Body() signupDto: SignUpDto): Promise<{token:string}> {
        return await this.authService.signUp(signupDto)
    }

    @Post('/login')
    async Login(@Body() loginDto: LoginDto): Promise<{token:string}> {
        return await this.authService.login(loginDto)
    }

}
