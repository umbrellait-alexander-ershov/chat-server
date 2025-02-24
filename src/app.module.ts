import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReactionModule } from './modules/reaction/reaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    ReactionModule,
  ],
})
export class AppModule {}
