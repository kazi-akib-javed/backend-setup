import {
    ArgumentMetadata,
    Injectable,
    Optional,
    PipeTransform,
    ValidationPipeOptions,
  } from '@nestjs/common';
  import { plainToClass } from 'class-transformer';
  import { validate } from 'class-validator';
  import { DtoValidationException } from '../exceptions/dto.exception';
  
  @Injectable()
  export class DtoValidationPipe implements PipeTransform<any> {
    options: ValidationPipeOptions;
  
    constructor(@Optional() options?: ValidationPipeOptions) {
      this.options = options || {};
    }
  
    // eslint-disable-next-line @typescript-eslint/ban-types
    private static toValidate(metatype: Function): boolean {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const types: Function[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
  
    async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !DtoValidationPipe.toValidate(metatype)) {
        return value;
      }
      const object = plainToClass(metatype, value);
      const errors = await validate(object, this.options);
      if (errors.length > 0) {
        throw new DtoValidationException(errors, 'DTO Validation Error');
      }
      return value;
    }
  }