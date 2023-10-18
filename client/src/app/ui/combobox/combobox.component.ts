import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class Combobox implements OnInit {
  @Input() items: any[] = [];
  @Input() inputId = '';

  @Output() onOptionSelect = new EventEmitter<string>();

  selectedOption: any = {};

  ngOnInit(): void {
    console.log(this.items);
  }

  handleComboboxDisplaying(): void {
    const combobox = document.getElementById('custom-comobobox');

    if (combobox?.classList.contains('slds-is-open')) {
      combobox?.classList.remove('slds-is-open');
    } else {
      combobox?.classList.add('slds-is-open');
    }
  }

  handleListSelect(option: any): void {
    this.selectedOption = option;
    this.handleComboboxDisplaying();

    this.onOptionSelect.emit(this.selectedOption.id);
  }

  handleTextInput(event: any): void {
    event.preventDefault();
  }
}