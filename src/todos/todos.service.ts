import { Model } from 'mongoose';
import IApiResponse from 'src/config/response';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from 'src/schemas/Todo.schema';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchUpServerError, isValidObjectId, showErrorResponse } from 'src/helpers';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class TodosService {
    constructor(
        @InjectModel(Todo.name) private todoModel: Model<Todo>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ){}

    async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<IApiResponse<Todo>> {
        try {
            const data = Object.assign(createTodoDto, {user: userId});
            const savedTodo = await this.todoModel.create(data);

            await this.userModel.findByIdAndUpdate(userId, {$push: {todos: savedTodo._id}});

            return {
                success: true,
                message: 'Todo Created successfylly',
                data: savedTodo
            }
        } catch (error) {
            console.log("There's an Error occur while creating Todo", error);
            throw new HttpException('Failed to Create Todo', HttpStatus.BAD_REQUEST);
        }
    }

    // async getTodos(): Promise<IApiResponse<Todo[]>> {
    //     try {
    //         const todos = await this.todoModel.find();

    //         return {
    //             success: true,
    //             message: 'successfully fetched todos',
    //             data: todos
    //         }
    //     } catch (error) {
    //         console.log("There's an Error occur while Fetch Todos", error);
    //         throw new HttpException('Failed to retrieve todos', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }


    async getTodos(userId: string): Promise<IApiResponse<Todo[]>> {
        try {
            const isValidId = isValidObjectId(userId);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${userId}`, HttpStatus.NOT_FOUND);

            const todos = await this.todoModel.find({user: userId}).exec();
            if(!todos) return showErrorResponse(`Can not find todos with this id: ${userId}`, HttpStatus.NOT_FOUND)

            return {
                success: true,
                message: `successfully find todos with the id: ${userId}`,
                data: todos,
            }
        } catch (error) {
            console.log(`There's an Error occur while Fetch Todos with userID: ${userId}`, error);
            throw catchUpServerError('Failed to retrieve todo');
        }
    }

    async getTodoById(id: string): Promise<IApiResponse<Todo>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.NOT_FOUND);

            const todo = await this.todoModel.findById(id);
            if(!todo) return showErrorResponse(`Can not find todo with this id: ${id}`, HttpStatus.NOT_FOUND)

            return {
                success: true,
                message: `successfully find todo with the id: ${id}`,
                data: todo,
            };
            
        } catch (error) {
            console.log(`There's an Error occur while Fetch Todo with ID: ${id}`, error);
            throw catchUpServerError('Failed to retrieve todo');
        }
    }

    async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<IApiResponse<Todo>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.BAD_REQUEST);

            const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true});
            if(!updatedTodo) return showErrorResponse(`Can not find and update a User with ID: ${id}`, HttpStatus.NOT_FOUND); 

            return {
                success: true,
                message: `Successfully Update todo with the ID of: ${id}`,
                data: updatedTodo,
            }
        } catch (error) {
            console.log(`There's an Error occur while Update Todo with ID: ${id}`, error);
            throw catchUpServerError('Failed to Update todo');
        }
    }

    async deleteTodo(id: string): Promise<IApiResponse<Todo>> {
        try {
            const isValidId = isValidObjectId(id);
            if(!isValidId) return showErrorResponse(`this ID is not valid Type ObjectId ${id}`, HttpStatus.BAD_REQUEST);

            const deletedTodo = await this.todoModel.findByIdAndDelete(id);
            if(!deletedTodo) return showErrorResponse(`There is no Todo with ID: ${id} to be deleted`, HttpStatus.NOT_FOUND);

            return {
                success: true,
                message: `Successfully deleted Todo with ID: ${id}`,
                data: deletedTodo
            }
        } catch (error) {
            console.log(`There's an Error occur while Delete Todo with ID: ${id}`, error);
            throw new HttpException('Failed to Delete the Todo', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
