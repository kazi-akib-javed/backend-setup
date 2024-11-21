import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IntValidationException } from '../exceptions/int.expection';

@Injectable()
export class IntValidationPipe implements PipeTransform<string> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const isNumeric =
      ['string', 'number'].includes(typeof value) &&
      !isNaN(parseFloat(value)) &&
      isFinite(value as any);
    if (!isNumeric) {
      throw new IntValidationException(
        metadata.data,
        value,
        'Int Validation Error',
      );
    }
    return parseInt(value, 10);
  }
}