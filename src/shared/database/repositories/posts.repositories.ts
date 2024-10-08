import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.PostCreateArgs) {
    return this.prismaService.post.create(createDto);
  }

  findFirst(findFirstDto: Prisma.PostFindFirstArgs) {
    return this.prismaService.post.findFirst(findFirstDto);
  }

  findMany<T extends Prisma.PostFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>,
  ) {
    return this.prismaService.post.findMany(findManyDto);
  }

  update(updateDto: Prisma.PostUpdateArgs) {
    return this.prismaService.post.update(updateDto);
  }
  delete(deleteDto: Prisma.PostDeleteArgs) {
    return this.prismaService.post.delete(deleteDto);
  }
}
