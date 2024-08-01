import { IsArray, IsDateString, IsEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import Category from "src/enums/category.enum";
import { User } from "src/schemas/User.schema";

export class UpdateTodoDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    dueDate: string;

    @IsString()
    @IsOptional()
    isCompleted?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Category, {each: true})
    categories?: Category[];

    @IsEmpty({message: "UserId can not be passed"})
    readonly user: User;
}