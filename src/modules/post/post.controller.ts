import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { AddReactionDto, CreatePostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Get('/user/:userId')
  getPostsByUser(@Param('userId') userId: string) {
    return this.postService.getPostsByUser(userId);
  }

  @Get('/post-with-user/:postId')
  getPostWithUser(@Param('postId') postId: string) {
    return this.postService.getPostWithUser(postId);
  }

  @Post('/reaction')
  addReactionOnPost(@Body() addReactionDto: AddReactionDto) {
    return this.postService.addReactionOnPost(addReactionDto);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
