import {CommonModule} from '@angular/common';
import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  standalone: true,
})

// source: https://www.youtube.com/watch?v=RNr1QZM4A38&t=4477s&ab_channel=ZoaibKhan
export class ButtonComponent {
  type = input<string>('button');
  label = input<string>();
  variant = input<string>();
  btnClicked = output<void>();
  disabled = input<boolean>(false);

  getButtonClasses(): string {
    switch (this.variant()) {
      case 'primary':
        return 'bg-slate-800 border border-slate-700 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-700 hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-800';
      case 'primary-outline':
        return 'text-slate-400 bg-transparent border border-slate-400 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-900 hover:text-white';
      case 'secondary':
        return 'text-sm bg-slate-900 border border-slate-800 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-800 hover:border-slate-700';
      case 'tertiary':
        return 'text-sm bg-slate-900 border border-slate-800 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-800 hover:border-slate-700';
      default:
        return 'bg-slate-800 border border-slate-700 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-700 hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-800';
    }
  }
}
