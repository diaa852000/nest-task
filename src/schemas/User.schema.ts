import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";


@Schema({timestamps: true})
export class User extends Document {
    @Prop()
    name: string;

    @Prop({unique: [true, 'Duplicate email entered']})
    email: string;

    @Prop()
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]})
    todos?: mongoose.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);