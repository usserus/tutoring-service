import {
  Component,
  effect,
  EventEmitter, input,
  Input,
  OnInit,
  Output,
  signal,
  Signal,
} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ButtonComponent} from '../../shared/button/button.component';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {TopicAreasWithTutoringSessionsForTutor} from '../../../models/topic-area';
import {AccordionComponent} from '../../shared/accordion/accordion.component';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../services/authentication.service';
import {getSlug} from '../../../utils/get-slug';
import {
  TutoringSessionRequestModalFormErrorMessages
} from '../../public-area/tutoring-session-request-modal-form/tutoring-session-request-modal-form-error-messages';
import {TopicAreaRequestFactory} from '../../../models/Factorys/topic-area-request-factory';
import {formatDateToDatetimeLocal} from '../../../utils/format-date-to-datetime-local';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tutor-topic-area-modal-form',
  imports: [NgIcon, ReactiveFormsModule, ButtonComponent, AccordionComponent],
  templateUrl: './tutor-topic-area-modal-form.component.html',
  standalone: true,
  styles: `
    .modal {
      scrollbar-color: oklch(21% 0.034 264.665) oklch(37.2% 0.044 257.287);
    }
  `,
})
export class TutorTopicAreaModalFormComponent implements OnInit {
  @Input() isModalOpen!: Signal<boolean>;
  @Output() closeModal = new EventEmitter<void>();
  @Input() topicAreaSlug: string | null = null;
  @Input() tutoringSubjectId!: number;

  topicAreaModalForm: FormGroup;
  errors: { [key: string]: string } = {};
  isUpdatingTopicArea = signal<boolean>(false);
  topicArea: TopicAreasWithTutoringSessionsForTutor | null = null;
  tutoringSessions: FormArray;
  students: User[] = [];

  constructor(
    private fb: FormBuilder,
    private ts: TutoringDataService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.topicAreaModalForm = this.fb.group({});
    this.tutoringSessions = this.fb.array([]);
    this.registerModalEffect();
  }

  ngOnInit() {
    this.ts.getAllUsers().subscribe((res) => {
      // Fetch all students to populate the student dropdown in the form
      this.students = res;
    });
  }

  registerModalEffect() {
    // Effect runs whenever the modal is opened or closed
    effect(() => {
      if (this.isModalOpen()) {
        if (this.topicAreaSlug !== null) {
          this.isUpdatingTopicArea.set(true);
          this.ts
            .getOwnTopicAreaWithTutoringSessionsBySlug(this.topicAreaSlug)
            .subscribe((topicArea) => {
              this.topicArea = topicArea;
              this.initTopicArea();
            });
        } else {
          this.isUpdatingTopicArea.set(false);
        }
        this.initTopicArea();
      }
    });
  }

  onCloseModal() {
    // Emit the close event and reset the form and topic area
    this.closeModal.emit();
    this.topicArea = null;
    this.tutoringSessions.clear();
  }

  initTopicArea() {
    this.buildTutoringSessionsArray();
    // Initialize the form with the topic area data or empty values
    this.topicAreaModalForm = this.fb.group({
      title: [this.topicArea?.title || '', Validators.required],
      description: [this.topicArea?.description || '', Validators.required],
      tutoringSessions: this.tutoringSessions,
    });
    this.topicAreaModalForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  private buildTutoringSessionsArray() {
    // Initialize the tutoring sessions array with existing sessions or an empty session
    if (this.topicArea?.tutoring_sessions) {
      this.tutoringSessions = this.fb.array([]);
      for (let tutoringSession of this.topicArea.tutoring_sessions) {
        this.tutoringSessions.push(
          this.fb.group({
            id: [tutoringSession.id],
            startTime: [
              formatDateToDatetimeLocal(tutoringSession.start_time),
              Validators.required,
            ],
            duration: [tutoringSession.duration || 0, Validators.required],
            price: [tutoringSession.price || 0],
            status: [tutoringSession.status],
            student: [tutoringSession.student?.id ?? null],
            street: [tutoringSession.location?.street, Validators.required],
            houseNumber: [
              tutoringSession.location?.house_number,
              Validators.required,
            ],
            postalCode: [
              tutoringSession.location?.postal_code,
              Validators.required,
            ],
            city: [tutoringSession.location?.city, Validators.required],
            country: [tutoringSession.location?.country, Validators.required],
          }),
        );
      }
    }
    if (!this.tutoringSessions.length) {
      this.addTutoringSessionControl();
    }
  }

  addTutoringSessionControl() {
    // Add a new empty tutoring session control to the form array
    this.tutoringSessions.push(
      this.fb.group({
        id: [null],
        startTime: [null, Validators.required],
        duration: [60, Validators.required],
        price: [0],
        status: [''],
        student: [null],
        street: ['', Validators.required],
        houseNumber: [0, Validators.required],
        postalCode: [0, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
    );
  }

  updateErrorMessages() {
    // Clear previous errors and rebuild the error messages
    this.errors = {};
    for (const message of TutoringSessionRequestModalFormErrorMessages) {
      const control = this.topicAreaModalForm.get(message.forControl);
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
    const formValue = this.topicAreaModalForm.value;
    // Create a new TopicAreaRequest object from the form value
    const newTopicAreaRequest = TopicAreaRequestFactory.fromObject({
      ...formValue,
      id: this.topicArea?.id || 0,
      slug: getSlug(formValue.title),
      tutoring_subject_id: this.tutoringSubjectId,
      tutor_id: this.authService.getCurrentUserId(),
    });

    // If updating an existing topic area, call the update method; otherwise, create a new one
    if (this.isUpdatingTopicArea()) {
      this.ts.updateTopicArea(newTopicAreaRequest).subscribe(() => {
        this.onCloseModal();
        this.toastr.success('Kurs erfolgreich aktualisiert!', 'Tutor-Ring', {
          progressBar: true,
        });
      });
    } else {
      this.ts.createTopicArea(newTopicAreaRequest).subscribe(() => {
        this.onCloseModal();
        this.toastr.success('Kurs erfolgreich aktualisiert!', 'Tutor-Ring', {
          progressBar: true,
        });
      });
    }
  }

  handleFormatStartTime(date: string): string {
    if (!date) return 'Neuer Termin';
    let formattedDate = new Date(date);
    // Source: ChatGPT
    return formattedDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getStudentNameById(id: number): string {
    const student = this.students.find((s) => s.id === id);
    return student ? `${student.first_name} ${student.last_name}` : '';
  }
}
