import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-accordion',
  imports: [NgClass],
  templateUrl: './accordion.component.html',
  styles: ``,
  standalone: true,
})
export class AccordionComponent {
  @Input() title = '';
  opened = false;
}
