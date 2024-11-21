import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { ConversionService, QueryService, RequestService, ResponseService } from 'common';
import { ProgramEntity } from './entities/program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramsController],
  providers: [ProgramsService, QueryService, ResponseService, RequestService, ConversionService],
})
export class ProgramsModule {}
