import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomBaseEntity } from '../entities/custom-base.entity';

@Injectable()
export class ExceptionService {
  notFound<T extends CustomBaseEntity>(entity: T | T[], message: string) {
    if (entity instanceof Array) {
      if (entity.length < 1) {
        throw new NotFoundException(message);
      }
    } else {
      if (!entity) {
        throw new NotFoundException(message);
      }
    }
  }
}