import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import { Todo, todoSchema } from 'src/schemas/Todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      },
      {
        name: Todo.name,
        schema: todoSchema
      }
  ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule {}
