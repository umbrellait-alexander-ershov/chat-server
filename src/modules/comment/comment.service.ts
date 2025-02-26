import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entites';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<{ status: number; data: Comment }> {
    const newComment = await this.commentModel.create(createCommentDto);

    return { status: HttpStatus.CREATED, data: newComment };
  }

  async getComments(ownerId: string, ownerType: string) {
    const comments = await this.commentModel
      .find({ ownerId, ownerType })
      .populate('user', 'username _id');

    if (!comments) {
      return { status: HttpStatus.NOT_FOUND, data: null };
    }

    return { status: HttpStatus.OK, data: comments };
  }
}
