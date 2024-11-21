import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorDto } from '../dtos/response/error.dto';
import { FieldErrorDto } from '../dtos/response/field-error.dto';
import { ResponseDto } from '../dtos/response/response.dto';
import { SystemErrorDto } from '../dtos/response/system-error.dto';

export class SystemException extends HttpException {
  constructor(error: any) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred.';

    // Check if the error is a validation error
    if (error.errors) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';

      const fieldErrors: FieldErrorDto[] = [];
      for (const key in error.errors) {
        fieldErrors.push(
          new FieldErrorDto(key, error.errors[key].value, error.errors[key].message)
        );
      }

      const errorDto = new ErrorDto(fieldErrors, null);
      super(new ResponseDto(Date.now(), status, message, errorDto, null), status);
      return;
    }

    // Check if the error has a specific status code
    if (error.status) {
      status = error.status;
      message = error.message || 'An error occurred';
    }

    const systemErrorDto = new SystemErrorDto('System Error', 'ERROR', message);
    const errorDto = new ErrorDto(null, systemErrorDto);
    super(new ResponseDto(Date.now(), status, message, errorDto, null), status);
  }
}