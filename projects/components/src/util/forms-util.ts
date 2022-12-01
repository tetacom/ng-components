import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators,} from '@angular/forms';
import {TableColumn} from '../component/table/contract/table-column';
import {ArrayUtil} from '../common/util/array-util';
import {FilterType} from "../component/filter/enum/filter-type.enum";

export class FormsUtil {
  static validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  static controlIsInvalid(formGroup: UntypedFormGroup, controlName: string) {
    return (
      formGroup.controls[controlName]?.invalid &&
      formGroup.controls[controlName]?.dirty
    );
  }

  static getControlErrors(formGroup: UntypedFormGroup, controlName: string): string[] {
    if (FormsUtil.controlIsInvalid(formGroup, controlName)) {
      return Object.keys(formGroup.controls[controlName]?.errors);
    }
    return [];
  }

  static matchValuesValidator(
    matchTo: string
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>
      !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
  }

  static requiredIf(
    value: boolean
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>
      !!control.parent &&
      !!control.parent.value &&
      control.value != null &&
      value
        ? null
        : {isMatching: false};
  }

  static initFormFromColumns(columns: TableColumn[], dataItem: any) {
    const form = new UntypedFormGroup({});
    const flat = ArrayUtil.flatten(columns, 'columns');
    flat.forEach((column: TableColumn) => {
      const control = new UntypedFormControl(
        {
          value: dataItem ? dataItem[column.name] : undefined,
          disabled: !column.editable,
        },
        {
          validators: FormsUtil.getValidators(column),
          updateOn: column.filterType === FilterType.number || column.filterType === FilterType.string ? 'blur' : 'change'
        }
      );
      form.registerControl(column.name, control);
    });
    return form;
  }

  static getValidators(column: TableColumn) {
    const validators = [];
    if (column.required) {
      validators.push(Validators.required);
      validators.push(FormsUtil.validatorNotEmpty);
    }
    if (column.minValue != null) {
      validators.push(Validators.min(column.minValue));
    }
    if (column.maxValue != null) {
      validators.push(Validators.max(column.maxValue));
    }
    return validators;
  }

  static validatorNotEmpty(control: AbstractControl): ValidationErrors | null {
    if (control?.value?.toString()?.trim()?.length <= 0) {
      return {required: true}
    }
    return null;
  }
}
