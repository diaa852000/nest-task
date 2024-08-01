import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import Category from "src/enums/category.enum";

@Schema({timestamps: true})
export class Todo {
    @Prop({required: true, unique: false})
    title: string;

    @Prop({required: false, unique: false})
    description?: string;

    @Prop({required: false, unique: false, default: () => new Date().toISOString().split('T')[0] })
    dueDate?: string;

    @Prop({required: false, default: 'not compeleted'})
    isCompleted?: string

    @Prop({
        required: false, 
        type: [String], 
        enum: Object.values(Category),
        default: Category.PERSONAL
    })
    categories?: Category[];


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Types.ObjectId;
}

export const todoSchema = SchemaFactory.createForClass(Todo)