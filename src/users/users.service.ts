import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  BcryptService,
  ConversionService,
  ExceptionService,
  PermissionService,
  RequestService,
  SystemException,
  UserResponseDto,
  UsersEntity,
  isActive,
} from '../../common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly exceptionService: ExceptionService,
    private readonly bcryptService: BcryptService,
    private readonly permissionService: PermissionService,
    private readonly conversionService: ConversionService,
    private readonly requestService: RequestService,
  ) {}
  create = async (createUserDto: CreateUserDto): Promise<UserResponseDto> => {
    try {
      createUserDto.password = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      createUserDto = this.requestService.forCreate(createUserDto);
      const dtoToEntity = await this.conversionService.toEntity<
        UsersEntity,
        CreateUserDto
      >(createUserDto);
      const data = this.usersRepository.create(dtoToEntity);
      const savedData = await this.usersRepository.save(data);
      const userResponseDto = new UserResponseDto();
      userResponseDto.id = savedData.id;
      userResponseDto.email = savedData.email;
      userResponseDto.firstName = savedData.firstName;
      userResponseDto.lastName = savedData.lastName;
      return Promise.resolve(userResponseDto);
    } catch (error) {
      throw new SystemException(error);
    }
  };

  find = async (): Promise<UserDto[]>=> {
    const users = await this.usersRepository.find({
      where:{
        ...isActive
      }
    });
    console.log(this.permissionService.returnRequest());
    return this.conversionService.toDtos<UsersEntity, UserDto>(users);
  }

  //----------------------------------helpers------------------------------------
  findOneByEmail = async (
    emailOrUserName: string,
  ): Promise<CreateUserDto | any> => {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: emailOrUserName },
      });
      this.exceptionService.notFound(
        user,
        'User is not found by phone or email',
      );

      return await this.conversionService.toDto<UsersEntity, CreateUserDto>(
        user,
      );
    } catch (error) {
      throw new SystemException(error.message);
    }
  };
}