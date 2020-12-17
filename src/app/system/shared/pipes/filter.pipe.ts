import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((item) => {
      const tmp = Object.assign({}, item);
      if (!isNaN(tmp[field])) {
        tmp[field] += '';
      }
      if (field === 'type') {
        tmp[field] = tmp[field] === 'income' ? 'доход' : 'расход';
      }
      if (field === 'category') {
        tmp[field] = tmp.catName;
      }
      return tmp[field].toLowerCase().includes(value.toLowerCase());
      /*return tmp[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;*/
    });
  }
}
