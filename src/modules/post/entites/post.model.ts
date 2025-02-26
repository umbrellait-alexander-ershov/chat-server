import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Post {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: [String] })
  comments: string[];

  @Prop({ type: Number })
  likes: number;

  @Prop({ type: Number })
  dislikes: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Reaction' })
  reaction: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
