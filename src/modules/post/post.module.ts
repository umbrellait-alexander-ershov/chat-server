import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entites';
import { UserModule } from '../user';
import { ReactionModule } from '../reaction';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ReactionModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
