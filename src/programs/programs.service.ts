import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { isActive, QueryService, SystemException } from 'common';
import { ProgramEntity } from './entities/program.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    private readonly queryService: QueryService,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>
  ){}
  create = (createProgramDto: CreateProgramDto): Promise<CreateProgramDto> => {
    try {
      return this.queryService.createData(createProgramDto, this.programRepository);
    } catch (error) {
      throw new SystemException(error);
    }
  }

  findAll = async (): Promise<CreateProgramDto[]> => {
    try {
      return await this.queryService.findAll(this.programRepository, { ...isActive });
    } catch (error) {
      throw new SystemException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} program`;
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return `This action updates a #${id} program`;
  }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }
}
