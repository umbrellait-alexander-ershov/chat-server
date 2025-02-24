import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Reaction {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: ['like', 'dislike'], required: true })
  reactionType: 'like' | 'dislike';
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
ReactionSchema.index({ user: 1, post: 1 }, { unique: true });
