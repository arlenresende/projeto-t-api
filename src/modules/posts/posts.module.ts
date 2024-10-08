import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './posts.controller';
import { ValidatePostOwnershipService } from './services/validation-post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ValidatePostOwnershipService],
  exports: [ValidatePostOwnershipService],
})
export class PostsModule {}
