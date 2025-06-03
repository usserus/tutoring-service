import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  standalone: true,
})
export class BadgeComponent {
  label = input<string>();
  variant = input<string>();
  badgeClicked = output<void>();
  disabled = input<boolean>(false);
  isButton = input<boolean>(false);
  isActive = input<boolean>(false);

  getBadgeClasses(): string {
    switch (this.variant()) {
      case 'requested':
        return 'inline-flex items-center rounded-md px-2 py-1 text-xs font-thin text-yellow-500 ring ring-yellow-500 ring-inset opacity-70';
      case 'available':
        return 'inline-flex items-center rounded-md px-2 py-1 text-xs font-thin text-green-500 ring ring-green-500 ring-inset opacity-80';
      case 'booked':
        return 'inline-flex items-center rounded-md px-2 py-1 text-xs font-thin text-blue-500 ring ring-blue-500 ring-inset opacity-80';
      case 'completed':
        return 'inline-flex items-center rounded-md px-2 py-1 text-xs font-thin text-gray-500 ring ring-gray-500 ring-inset opacity-90';
      default:
        return 'inline-flex items-center rounded-md px-2 py-1 text-xs font-thin text-red-500 ring ring-red-500 ring-inset opacity-90';
    }
  }

  combinedClasses(): string {
    const newClasses =
      this.getBadgeClasses() +
      ' ' +
      'hover:opacity-100 hover:scale-105 hover:ring-2 cursor-pointer';
    const active = this.isActive() ? ' ' + 'ring-2 opacity-100' : '';
    return `${newClasses} ${active}`;
  }
}
