import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String })
  birthday?: string;

  @Prop({ type: String })
  theme?: string;

  @Prop({ type: String })
  aboutYourself?: string;

  @Prop({ type: String })
  city?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
