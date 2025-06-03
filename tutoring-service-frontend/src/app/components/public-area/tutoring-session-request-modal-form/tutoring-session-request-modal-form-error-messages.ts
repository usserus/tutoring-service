export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string,
  ) {
  }
}

export const TutoringSessionRequestModalFormErrorMessages: ErrorMessage[] = [
  new ErrorMessage('title', 'required', 'Der Titel ist erforderlich.'), // TODO auslagern und ein einheitliches file mit allen error messages
  new ErrorMessage(
    'description',
    'required',
    'Die Beschreibung ist erforderlich.',
  ),
  new ErrorMessage('date', 'required', 'Das Datum ist erforderlich.'),
  new ErrorMessage('date', 'dateInPast', 'Das Datum darf nicht in der Vergangenheit liegen.'),
  new ErrorMessage('time', 'required', 'Die Uhrzeit ist erforderlich.'),
  new ErrorMessage(
    'duration',
    'min',
    'Die Dauer muss mindestens 30 Minuten betragen.',
  ),
  new ErrorMessage(
    'duration',
    'max',
    'Die Dauer darf maximal 120 Minuten betragen.',
  ),
  new ErrorMessage('street', 'required', 'Die Straße ist erforderlich.'),
  new ErrorMessage(
    'houseNumber',
    'required',
    'Die Hausnummer ist erforderlich.',
  ),
  new ErrorMessage(
    'houseNumber',
    'isNumber',
    'Die Hausnummer muss eine Zahl sein.',
  ),
  new ErrorMessage(
    'postalCode',
    'required',
    'Die Postleitzahl ist erforderlich.',
  ),
  new ErrorMessage(
    'postalCode',
    'isNumber',
    'Die Postleitzahl muss eine Zahl sein.',
  ),
  new ErrorMessage('city', 'required', 'Die Stadt ist erforderlich.'),
  new ErrorMessage('country', 'required', 'Das Land ist erforderlich.'),
];
