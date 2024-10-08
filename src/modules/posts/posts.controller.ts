import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';

import { ActiveUserId } from 'src/shared/decorators/activeUserId';

import { PostsService } from './services/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.postsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.postsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(userId, id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.postsService.remove(userId, id);
  }
}
