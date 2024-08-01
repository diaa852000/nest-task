import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, todoSchema } from 'src/schemas/Todo.schema';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        AuthModule,
        UsersModule,
        MongooseModule.forFeature([{
            name: Todo.name,
            schema: todoSchema,
        }])
    ],
    providers: [TodosService],
    controllers: [TodosController]
})
export class TodosModule {}
