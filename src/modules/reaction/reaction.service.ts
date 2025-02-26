import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './entites';
import { Model } from 'mongoose';
import { AddReactionOnPostDto } from './dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private readonly reactionModel: Model<Reaction>,
  ) {}

  async getUserReactionOnPostById(addReactionDto: AddReactionOnPostDto) {
    const { userId, postId } = addReactionDto;
    return this.reactionModel.findOne({ userId, postId });
  }

  async addReactionOnPost(addReactionDto: AddReactionOnPostDto) {
    const { userId, postId, reactionType } = addReactionDto;

    const existingReaction = await this.reactionModel.findOne({
      userId,
      postId,
    });

    if (existingReaction) {
      if (existingReaction.reactionType === reactionType) {
        await this.reactionModel.deleteOne(addReactionDto);
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'Removed reaction',
        };
      }

      existingReaction.reactionType = reactionType;
      await existingReaction.save();
      return {
        status: HttpStatus.OK,
        message: 'Update reaction',
      };
    }

    await this.reactionModel.create(addReactionDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Added reaction',
    };
  }
}
