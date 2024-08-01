import { 
    IsArray, 
    IsDateString, 
    IsEmpty, 
    IsEnum, 
    IsNotEmpty, 
    IsOptional, 
    IsString 
} from "class-validator";
import Category from "src/enums/category.enum";
import { User } from "src/schemas/User.schema";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsOptional()
    @IsDateString()
    @IsString()
    readonly dueDate?: Date;

    @IsString()
    @IsOptional()
    readonly isCompleted?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Category, {each: true}) 
    readonly categories?: Category[];
    
    @IsEmpty({message: "UserId can not be passed"})
    readonly user: User;
}