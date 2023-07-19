import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typewriter'
})
export class TypewriterPipe implements PipeTransform {

  transform(value: string): string {
    let result = '';
    for (let i = 0; i < value.length; i++) {
      result += value[i];
      // Adjust typing speed here (in milliseconds)
      const typingSpeed = 100;
      // Delay each character addition based on index
      const delay = i * typingSpeed;
      setTimeout(() => {
        if (i === value.length - 1) {
          result += '_'; // Add blinking caret at the end
        }
      }, delay);
    }
    return result;
  }

}
