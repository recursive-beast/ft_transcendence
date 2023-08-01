import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { isObject } from 'class-validator';
import { Request } from 'express';
import { keyBy } from 'lodash';
import { PrismaService } from 'nestjs-prisma';
import { Observable, map } from 'rxjs';
import { UserEntity } from 'src/common/entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private prismaService: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user?.user;

    if (user) return next.handle().pipe(map((value) => this.map(value, user)));

    return next.handle();
  }

  private async map(value: unknown, user: User) {
    if (value instanceof UserEntity) {
      return this.mapOne(value, user);
    }

    if (
      Array.isArray(value) &&
      value.every((elem): elem is UserEntity => elem instanceof UserEntity)
    ) {
      return this.mapMany(value, user);
    }

    if (isObject(value) && 'data' in value) {
      value.data = await this.map(value.data, user);
    }

    return value;
  }

  async mapOne(entity: UserEntity, user: User) {
    const result = await this.prismaService.user.findUnique({
      where: { id: entity.id },
      select: {
        _count: {
          select: {
            friendOf: { where: { id: user.id } },
            blockedBy: { where: { id: user.id } },
          },
        },
      },
    });

    if (!result) return entity;

    return this.mapToDTO(entity, result._count);
  }

  async mapMany(entities: UserEntity[], user: User) {
    if (entities.length === 0) return entities;

    const ids = entities.map((entity) => entity.id);
    const result = await this.prismaService.user.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        _count: {
          select: {
            friendOf: { where: { id: user.id } },
            blockedBy: { where: { id: user.id } },
          },
        },
      },
    });

    const resultById = keyBy(result, 'id');
    const dtos: UserDTO[] = [];

    for (const entity of entities) {
      const dto = this.mapToDTO(entity, resultById[entity.id]._count);

      dtos.push(dto);
    }

    return dtos;
  }

  private mapToDTO(
    entity: UserEntity,
    count?: Pick<Prisma.UserCountOutputType, 'friendOf' | 'blockedBy'>,
  ) {
    const dto = plainToInstance(UserDTO, entity, {
      ignoreDecorators: true,
      excludeExtraneousValues: true,
    });

    if (!count) return dto;

    dto.isFriend = count.friendOf > 0;
    dto.isBlocked = count.blockedBy > 0;

    return dto;
  }
}
