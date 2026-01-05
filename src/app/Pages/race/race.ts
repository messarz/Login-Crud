import { Component } from '@angular/core';
import {Hero} from '../../comment/hero/hero';

@Component({
  selector: 'race',
  imports: [
    Hero
  ],
  template: `
    <p>
      race works
    </p>
    <hero />
  `,
  styles: ``,
  standalone: true
})
export class Race {

}
