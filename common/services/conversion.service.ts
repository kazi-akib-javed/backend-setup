import { Injectable } from "@nestjs/common";
import { BaseDto } from "../dtos/core/base.dto";
import { CustomBaseEntity } from "../entities/custom-base.entity";

@Injectable()
export class ConversionService {
  toDto<T extends CustomBaseEntity, U extends BaseDto>(entity: T): Promise<U> {
    return Promise.resolve(<U>(<unknown>entity));
  }

  dtoToDto<A extends BaseDto, U extends BaseDto>(dto: A): Promise<U> {
    return Promise.resolve(<U>(<unknown>dto));
  }

  toDtos<T extends CustomBaseEntity, U extends BaseDto>(
    entities: T[]
  ): Promise<U[]> {
    const dtos: U[] = <U[]>(<unknown[]>entities);
    return Promise.resolve(dtos);
  }

  toEntity<T extends CustomBaseEntity, U extends BaseDto>(dto: U): Promise<T> {
    return Promise.resolve(<T>(<unknown>dto));
  }

  toEntities<T extends CustomBaseEntity, U extends BaseDto>(
    dtos: U[]
  ): Promise<T[]> {
    const entities: T[] = <T[]>(<unknown[]>dtos);
    return Promise.resolve(entities);
  }

  toPagination<T extends CustomBaseEntity, U extends BaseDto>(
    rawData: [T[], number]
  ): Promise<[U[], number]> {
    const entities = rawData[0];
    const total = rawData[1];
    const dtos: U[] = <U[]>(<unknown[]>entities);
    return Promise.resolve([dtos, total]);
  }
}