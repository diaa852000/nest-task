import { UpdateUserDto } from './dto/UpdateUsers.dto';
import { Controller, Delete, Get, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(){
        return await this.userService.getUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.userService.getUserById(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, updateTodoDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateTodoDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
