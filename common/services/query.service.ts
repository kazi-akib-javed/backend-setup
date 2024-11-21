import { RequestService } from './request.service';
import { ConversionService } from './conversion.service';
import { BaseDto } from 'common/dtos/core/base.dto';
import { CustomBaseEntity } from 'common/entities/custom-base.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

export class QueryService{
    constructor(
        @Inject(RequestService)
        private readonly requestService: RequestService,
        @Inject(ConversionService)
        private readonly conversionService: ConversionService
    ){}
    async createData<D extends BaseDto, E extends CustomBaseEntity>(dto: D, repository: Repository<E>): Promise<D> {
        const forCreateDto = this.requestService.forCreate(dto);
        const dtoToEntity = await this.conversionService.toEntity<E,D>(forCreateDto);
        const createEntity = repository.create(dtoToEntity);
        const save = await repository.save(createEntity);
        return this.conversionService.toDto<E,D>(save);
    }

    async findAll<D extends BaseDto, E extends CustomBaseEntity>(repository: Repository<E>,options?: FindOptionsWhere<E>): Promise<D[]>{
        const allEntries = await repository.find({where:[options]});
        return Promise.resolve(this.conversionService.toDtos<E,D>(allEntries));
    }
}