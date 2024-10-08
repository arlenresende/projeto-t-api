import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { PostRepository } from './repositories/posts.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, PostRepository],
  exports: [UsersRepository, PostRepository],
})
export class DatabaseModule {}
