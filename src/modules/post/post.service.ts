import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entites';
import { Model } from 'mongoose';
import { AddReactionDto, CreatePostDto } from './dto';
import { UserService } from '../user';
import { ReactionService } from '../reaction';
import { reactionMap } from './post.constants';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly userService: UserService,
    private readonly reactionService: ReactionService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const user = await this.userService.getUserById(createPostDto.userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const newPost = new this.postModel({
      ...createPostDto,
      user: createPostDto.userId,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      comments: [],
    });

    return newPost.save();
  }

  async getPostWithUser(postId: string) {
    const post = this.postModel
      .findById(postId)
      .populate('user', 'username _id')
      .exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getPostById(id: string) {
    const targetPost = await this.postModel.findById(id).exec();

    if (!targetPost) {
      throw new NotFoundException('Post not found');
    }
    return targetPost;
  }

  async getPostsByUser(userId: string) {
    const posts = await this.postModel
      .find({ user: userId })
      .populate('user', 'username _id')
      .exec();

    if (!posts) {
      throw new NotFoundException('Posts not found');
    }

    return posts;
  }

  async addReactionOnPost(addReactionDto: AddReactionDto) {
    const { postId, reactionType } = addReactionDto;

    const reactionResponse =
      await this.reactionService.addReactionOnPost(addReactionDto);

    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const reactionTypePost = reactionMap[reactionType];

    switch (reactionResponse.status) {
      // реакция создана
      case HttpStatus.CREATED: {
        post[reactionTypePost] = (post[reactionTypePost] || 0) + 1;
        break;
      }
      // изменили реакцию
      case HttpStatus.OK: {
        post[reactionTypePost] = (post[reactionTypePost] || 0) + 1;

        const targetReactionType =
          reactionTypePost === 'likes' ? 'dislikes' : 'likes';
        post[targetReactionType] = Math.max(
          (post[targetReactionType] || 0) - 1,
          0,
        );
        break;
      }
      // обновили реакцию
      case HttpStatus.NO_CONTENT: {
        post[reactionTypePost] = Math.max((post[reactionTypePost] || 0) - 1, 0);
        break;
      }
    }

    await post.save();

    return reactionResponse;
  }

  async deletePost(postId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    await post.deleteOne();

    return { message: 'Post deleted successfully' };
  }
}
