import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeleniumService } from './selenium/selenium.service';
import { SeleniumController } from './selenium/selenium.controller';
import { SeleniumModule } from './selenium/selenium.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TodosModule,
    UsersModule,
    AuthModule,
    SeleniumModule
  ],
  controllers: [SeleniumController],
  providers: [AppService, SeleniumService],
})
export class AppModule {}
