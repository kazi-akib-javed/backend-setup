import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DtoValidationPipe, ResponseDto, ResponseService } from 'common';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService,
    private readonly responseService: ResponseService
  ) {}

  @ApiBearerAuth()
  @Post()
  create(@Body(new DtoValidationPipe({skipMissingProperties: false ,whitelist: true, forbidNonWhitelisted: true})) createProgramDto: CreateProgramDto): Promise<ResponseDto> {
    const payload = this.programsService.create(createProgramDto);
    return this.responseService.toResponse(
			HttpStatus.OK,
			"Request is successful!",
			payload
		);
  }

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<ResponseDto> {
    const payload = this.programsService.findAll();
    return this.responseService.toDtosResponse(
      HttpStatus.OK,
      "Request is successful!",
      payload
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(+id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programsService.remove(+id);
  }
}
