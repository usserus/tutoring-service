import {FormControl} from '@angular/forms';

export class TutoringSessionValidators {
  static isNumber(control: FormControl): any {
    if (control.value && isNaN(control.value)) {
      return {isNumber: {valid: false}};
    }
    return null;
  }

  static dateNotInPast(): any {
    return (control: FormControl): any => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      // ChatGPT: Reset time to compare only dates
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return {dateInPast: true};
      }
      return null;
    };
  }
}
