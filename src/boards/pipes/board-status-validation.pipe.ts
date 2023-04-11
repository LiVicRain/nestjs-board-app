import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../entities/board.entity';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1; // indexOf에 없는 값이 올경우 -1 을 내보낸다
  }

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 정확한 status가 아닙니다`);
    }
    // console.log('metadata', metadata);

    return value;
  }
}
