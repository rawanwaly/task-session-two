import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform<T>(items: T[], searchTerm: string, keys: (keyof T)[]): T[] {
    if (!items || !searchTerm || searchTerm.trim() === '') {
      return items;
    }

    const lowerTerm = searchTerm.toLowerCase();

    return items.filter(item =>
      keys.some(key => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(lowerTerm);
      })
    );
  }
}
