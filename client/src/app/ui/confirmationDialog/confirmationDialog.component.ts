import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmationDialog.component.html',
  styleUrls: ['./confirmationDialog.component.css']
})
export class ConfirmationDialog implements OnInit {
  @Input() message: string = 'Are you sure?';
  @Input() submitButtonText: string = 'Ok';

  @Output() onConfirmation = new EventEmitter<any>();

  ngOnInit(): void {}

  handleConfiramtion(state: boolean): void {
    this.onConfirmation.emit({state: state});
  }
}