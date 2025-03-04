import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.scss',
})
export class ButtonEditComponent {
  constructor(
    @Inject('data') public data: any,
    @Inject('actionEvent') private readonly parentEvent: EventEmitter<any>
  ) {}
  public submit() {
    this.parentEvent.emit({ action: 'see', row: this.data });
  }
}
