import { Pipe, PipeTransform, signal } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit: number, ellipsis: string): string {
    if (!value) {
      return '';
    }
    if (value.length > limit) {
      return value.substring(0, limit) + ellipsis;
    }
    return value;
  }
}
