import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from 'src/shared/database/repositories/posts.repositories';

@Injectable()
export class ValidatePostOwnershipService {
  constructor(private readonly postRepo: PostRepository) {}

  async validade(userId: string, postId: string) {
    const isOwnser = await this.postRepo.findFirst({
      where: { userId, id: postId },
    });

    if (!isOwnser) {
      throw new NotFoundException('Post not found');
    }
  }
}
