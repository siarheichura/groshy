export const markFormControlsDirty = (formControls: any) => {
  Object.values(formControls).forEach((control: any) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
};
