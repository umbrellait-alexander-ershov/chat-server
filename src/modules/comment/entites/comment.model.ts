import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: String, enum: ['Post'], required: true })
  ownerType: 'Post';

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
