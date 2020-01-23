import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacedText'
})
export class SpacedTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('_', ' ');
  }

}
