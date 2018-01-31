import { Injectable } from '@angular/core';
import { setTimeout } from 'timers';

@Injectable()
export class TimerService {

  timers: any[] = [];

  constructor() { }

  repeat(object: any, callback: () => any, interval: number) {
    setTimeout(() => {
      callback();
      if (object) {
        this.repeat(object, callback, interval);
      }
    }, interval);
  }

}
