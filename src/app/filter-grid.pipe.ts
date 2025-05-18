import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGrid'
})
export class FilterGridPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText)
      )
    );
  }
}
