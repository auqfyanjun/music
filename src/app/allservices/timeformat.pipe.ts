import { Pipe } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe {
  
  transform(value: any, args?: any): any {
  
    let tempMin = Math.floor(value / 60);
    let tempSec = Math.floor(value % 60);

    let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
    let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;

    return curMin + ':' + curSec;
  }

}
