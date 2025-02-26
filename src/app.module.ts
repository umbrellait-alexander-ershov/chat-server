import { Module } from '@nestjs/common';
import {
  UserModule,
  ReactionModule,
  PostModule,
  AuthModule,
  CommentModule,
} from './modules';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendModule } from './modules/friend/friend.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    ReactionModule,
    FriendModule,
  ],
})
export class AppModule {}
