export class UiHelpers {
  public applyFieldsErrorState(fields: any[], isApplyInvalidState: boolean): void {
    fields.forEach((field: any) => {
      if (isApplyInvalidState) {
        field.classList.add('slds-has-error');
      } else {
        field.classList.remove('slds-has-error');
      }
    });
  }

  public validateFields(fields: any[]): any[] {
    const ids = fields.map(field => ('#' + field)).join(', ');
    const inputs: any[] = Array.from(document.querySelectorAll(ids));
    const invalidInputs = inputs.filter((input: any) => !input.validity.valid);

    return invalidInputs;
  }
}