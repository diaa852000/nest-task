import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe())
    async create(@Body() createTodoDto : CreateTodoDto, @Req() req) {
        const userId = req.user._id;
        return await this.todoService.createTodo(createTodoDto, userId );
    }

    @Get()
    @UseGuards(AuthGuard())
    async findAll(@Query('userId') userId: string) {
        return await this.todoService.getTodos(userId);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async findOne(@Param('id') id: string) {
        return await this.todoService.getTodoById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateTodoDto :UpdateTodoDto) {
        return await this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: string) {
        return this.todoService.deleteTodo(id);
    }
}

