import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Navbar/navbar/navbar';
import {Foot} from './foot/foot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Foot],
  template: `
    <navbar></navbar>
    <router-outlet></router-outlet>
    <foot />
  `,
  styles: []
})
export class App { }
