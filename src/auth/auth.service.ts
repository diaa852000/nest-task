import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
// import { showUnAuthorizedError } from 'src/helpers';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
        try {
            const { name, email, password } = signUpDto;

            const existingUser = await this.userModel.findOne({email});
            if(existingUser) throw new HttpException('invalid email or password', HttpStatus.BAD_REQUEST);

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword
            });

            const payload = { 
                id: user?._id, 
                name: user?.name,
                email: user?.email
            }

            const token = this.jwtService.sign(payload);

            return { token }
        } catch (error) {
            console.error('Error during sign up:', error);
            throw new HttpException('There is an error occur while sign up', HttpStatus.BAD_REQUEST)
        }
    }

    async login(loginDto: LoginDto): Promise<{token: string}> {
        try {
            const {email, password } = loginDto;

            const user = await this.userModel.findOne({ email });
            if(!user) throw new UnauthorizedException('Invalid email or password');

            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if(!isPasswordMatched) throw new UnauthorizedException('Invalid email or password');

            const payload = { 
                id: user?._id, 
                name: user?.name,
                email: user?.email
            }
            const token = this.jwtService.sign(payload);

            return { token }

        } catch (error) {
            console.error('Error during login:', error);
            throw new HttpException('There is an error occur while login', HttpStatus.BAD_REQUEST)
        }
    }
}
