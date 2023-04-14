import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() inputValue!: string;
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();


  onInputChange() {
    this.inputValueChange.emit(this.inputValue);
  }
}
