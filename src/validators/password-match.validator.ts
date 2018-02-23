import { AbstractControl, ValidatorFn, FormControl } from "@angular/forms";

export class PasswordValidator {
  static matches(expected: AbstractControl): ValidatorFn {
    return (control: FormControl) => {
      return control.value == expected.value ? null : {
        matches: {
          valid: false
        }
      };
    };
  }

  static notEmpty(expected: AbstractControl): ValidatorFn {
    return (control: FormControl) => {
      return (control.value && expected.value) || (!control.value) ? null : {
        notEmpty: {
          valid: false
        }
      };
    };
  }
}