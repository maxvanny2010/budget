import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wtfSymbol'
})

export class SymbolPipe implements PipeTransform {
  transform(str: string): string {
    switch (str) {
      case 'USD':
        str = 'доллар';
        break;
      case 'EUR':
        str = 'евро';
        break;
      case 'RUB':
        str = 'рубль';
        break;
    }
    return str;
  }
}
