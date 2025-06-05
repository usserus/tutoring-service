import {Component, input, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-accordion',
  imports: [NgClass],
  templateUrl: './accordion.component.html',
  styles: ``,
  standalone: true,
})

// https://stackblitz.com/edit/angular-8zve4z?file=src%2Fapp%2Faccordion%2Faccordion.component.css
export class AccordionComponent {
  title = input<string>('');
  opened = false;
}
