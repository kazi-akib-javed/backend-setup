import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import {
  BcryptService,
  PermissionService,
  SystemException,
  RedisEnum,
  UserResponseDto,
  UsersEntity,
} from '../../common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import Redis, { Redis as RedisClient } from 'ioredis';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly redis: Redis,
    private readonly permissionService: PermissionService,
  ) {}
  login = async(authDto: AuthDto): Promise<UserResponseDto | any>=> {
    try {
      const validateUser = await this.validateUser(authDto);
      const payload = await this.generatePayload(validateUser);
      const accessToken = await this.generateToken(payload);
      await this.redis
        .get(RedisEnum.REDIS_SESSION).then(()=>
          this.redis.set(accessToken, JSON.stringify(payload))
        );
      payload.accessToken = accessToken;
      return payload;
    } catch (error) {
      throw new SystemException(error);
    }
  }

  validateUser = async(authDto: AuthDto): Promise<CreateUserDto| any>=> {
    try {
      const user = await this.usersRepository.findOne({where: {email: authDto?.email}});
      if (!user){
        throw new SystemException({
          status: HttpStatus.BAD_REQUEST,
          message: "Wrong credentials!"
        })
      }
      const isPasswordMatched = await this.bcryptService.comparePassword(
        authDto.password,
        user?.password,
      );
      if (!isPasswordMatched) {
        throw new SystemException({
          status: HttpStatus.BAD_REQUEST,
          message: "User and password is not valid",
        });
      }
      return user;
    } catch (error) {
      throw new SystemException(error);
    }
  }

  generatePayload = async(userDto: CreateUserDto): Promise<UserResponseDto>=> {
    const userResponseDto = new UserResponseDto();
    userResponseDto.id = userDto.id;
    userResponseDto.userId = userDto?.userId;
    userResponseDto.firstName = userDto?.firstName;
    userResponseDto.lastName = userDto?.lastName;
    userResponseDto.email = userDto?.email;
    userResponseDto.isUser = true;
    return Promise.resolve(userResponseDto);
  }

  generateToken = async(payload: UserResponseDto): Promise<string>=> {
    const privateKEY = this.configService
      .get('PRIVATE_KEY')
      .replace(/\\n/g, '\n');

    let accessToken = jwt.sign({ ...payload }, privateKEY, {
      expiresIn: '365d',
      algorithm: 'RS256',
    });
    
    this.logger.log('access token: ' + accessToken);
    return Promise.resolve(accessToken);
  }

  loginOut = async(): Promise<boolean>=> {
    try {
      const accessToken = this.permissionService.returnRequest().accessToken;
      await this.redis.get(RedisEnum.REDIS_SESSION).then(()=>this.redis.set(accessToken, '', "EX", 0));
      return true;
    } catch (error) {
      console.warn(error);
    }
  }
}