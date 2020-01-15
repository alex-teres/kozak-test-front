import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from '../services/worker.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(workers: Worker[], searchTerm: string): any {
    if (searchTerm && searchTerm.length) {
      const result = [];
      workers = workers.filter((worker) => {
        for (const key in worker) {
          if (worker[key].toString().indexOf(searchTerm) !== -1) {
            result.push(worker);
          }
        }
      });
      return result;
    } else {
      return workers;
    }
  }

}
