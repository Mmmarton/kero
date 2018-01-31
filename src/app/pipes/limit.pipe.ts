import {Pipe} from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe {
  transform(value: string, args: string) : string {
    let limit = args ? parseInt(args, 10) : 10;

    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}