import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import IApiResponse from 'src/config/response';
import { showErrorResponse } from 'src/helpers';
import { User } from 'src/schemas/User.schema';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async getUsers(): Promise<IApiResponse<User[]>> {
        try {
            const users = await this.userModel.find();
            return {
                success: true,
                message: "successfully retrieve users",
                data: users
            }
        } catch (error) {
            console.log('there is an error ocurr while fetching users', error);
            throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserById(id: string): Promise<IApiResponse<User>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.NOT_FOUND);

            const user = (await this.userModel.findById(id));
            if(!user) return showErrorResponse(`Can not find user with this ID: ${id}`, HttpStatus.NOT_FOUND);

            return {
                success: true,
                message: `Successfully found user with ID: ${id}`,
                data: user
            }
        } catch (error) {
            console.log('there is an error ocurr while fetching users', error);
            throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IApiResponse<User>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.NOT_FOUND);

            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
            if(!updatedUser) return showErrorResponse(`Can not find user with this ID: ${id}`, HttpStatus.NOT_FOUND);

            return {
                success: true,
                message: `Successfully Update User with the ID of: ${id}`,
                data: updatedUser,
            }
        } catch (error) {
            console.log('there is an error ocurr while fetching users', error);
            throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(id: string): Promise<IApiResponse<User>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.BAD_REQUEST);

            const deletedUser = await this.userModel.findByIdAndDelete(id);
            if(!deletedUser) return showErrorResponse(`There is no User with ID: ${id} to be deleted`, HttpStatus.NOT_FOUND);

            return {
                success: true,
                message: `Successfully deleted Todo with ID: ${id}`,
                data: deletedUser
            }
        } catch (error) {
            console.log(`There's an Error occur while Delete Todo with ID: ${id}`, error);
            throw new HttpException('Failed to Delete the Todo', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
