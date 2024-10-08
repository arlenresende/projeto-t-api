import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostRepository } from 'src/shared/database/repositories/posts.repositories';
import { ValidatePostOwnershipService } from './validation-post.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly validatePostOwnershipService: ValidatePostOwnershipService,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    const { title, description, slug, author, createdAt } = createPostDto;

    return this.postRepo.create({
      data: {
        userId,
        title,
        description,
        slug,
        author,
        createdAt,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const posts = await this.postRepo.findMany({
      where: { userId },
    });
    return { posts };
  }

  async findOne(id: string, userId: string) {
    const post = await this.postRepo.findFirst({
      where: { id, userId },
    });
    return { post };
  }

  async update(userId: string, id: string, updatePostDto: UpdatePostDto) {
    const { title, description, slug, author, createdAt } = updatePostDto;

    await this.validatePostOwnershipService.validade(userId, id);

    return this.postRepo.update({
      where: { id },
      data: {
        title,
        description,
        slug,
        author,
        createdAt,
      },
    });
  }
  async remove(userId: string, id: string) {
    await this.validatePostOwnershipService.validade(userId, id);

    await this.postRepo.delete({
      where: { userId, id },
    });

    return null;
  }
}
