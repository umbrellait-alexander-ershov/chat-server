import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  getComments(
    @Query('ownerId') ownerId: string,
    @Query('ownerType') ownerType: string,
  ) {
    return this.commentService.getComments(ownerId, ownerType);
  }
}
