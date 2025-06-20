import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import {TopicAreaWithTutoringSessions} from '../../../models/topic-area';
import {NgIcon} from '@ng-icons/core';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ButtonComponent} from '../../shared/button/button.component';
import {TutoringSessionValidators} from '../../../shared/validators/tutoring-session-validators';
import {TutoringSessionRequestModalFormErrorMessages} from './tutoring-session-request-modal-form-error-messages';
import {TutoringSessionRequestFactory} from '../../../models/Factorys/tutoring-session-request-factory';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tutoring-session-request-modal-form',
  imports: [NgIcon, ReactiveFormsModule, ButtonComponent],
  templateUrl: './tutoring-session-request-modal-form.component.html',
  standalone: true,
  styles: `
    .modal {
      scrollbar-color: oklch(21% 0.034 264.665) oklch(37.2% 0.044 257.287);
    }
  `,
})

export class TutoringSessionRequestModalFormComponent implements OnInit {
  @Input() topicArea: TopicAreaWithTutoringSessions | null = null;
  @Input() isModalOpen!: Signal<boolean>;
  @Output() closeModal = new EventEmitter<void>();

  tutoringSessionRequestModalForm: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private ts: TutoringDataService,
    private toastr: ToastrService,
  ) {
    this.tutoringSessionRequestModalForm = this.fb.group({});
  }

  ngOnInit() {
    this.initTutoringSession();
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  initTutoringSession() {
    // Initialize the form with default values
    const now = new Date();
    this.tutoringSessionRequestModalForm = this.fb.group({
      date: [
        now.toISOString().split('T')[0],
        [Validators.required, TutoringSessionValidators.dateNotInPast()],
      ],
      time: [now.toTimeString().slice(0, 5), Validators.required],
      duration: [60, [Validators.min(30), Validators.max(120)]],
      price: [0],
      street: ['', Validators.required],
      houseNumber: [
        '',
        [Validators.required, TutoringSessionValidators.isNumber],
      ],
      postalCode: [
        '',
        [Validators.required, TutoringSessionValidators.isNumber],
      ],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.tutoringSessionRequestModalForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    this.errors = {};
    // Iterate over the error messages and check the form controls
    for (const message of TutoringSessionRequestModalFormErrorMessages) {
      const control = this.tutoringSessionRequestModalForm.get(
        message.forControl,
      );
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !control.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const formValue = this.tutoringSessionRequestModalForm.value;
    const extendedFormValue = {
      ...formValue,
      id: 0,
      topic_area_id: this.topicArea?.id,
    };

    // create a new TutoringSessionRequest object from the form values
    const newTutoringSessionRequest =
      TutoringSessionRequestFactory.fromObject(extendedFormValue);

    this.ts.createTutoringSession(newTutoringSessionRequest).subscribe(() => {
      this.tutoringSessionRequestModalForm.reset();
      this.onCloseModal();
      this.toastr.success(
        'Deine Anfrage wurde erfolgreich gesendet!',
        'Tutor-Ring', {
          progressBar: true,
        }
      );
    });
  }
}
