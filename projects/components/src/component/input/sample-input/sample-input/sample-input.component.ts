import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from '../../text-field/text-field.component';
import { InputComponent } from '../../input/input.component';

@Component({
    selector: 'teta-sample-input',
    templateUrl: './sample-input.component.html',
    styleUrls: ['./sample-input.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, InputComponent, TextFieldComponent]
})
export class SampleInputComponent implements OnInit {
  form: UntypedFormGroup;
  show: number;
  value = new Array(20).fill(1684);

  constructor() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', {
        updateOn: 'blur',
      }),
      name2: new UntypedFormControl('', {
        updateOn: 'blur',
      }),
      surname: new UntypedFormControl('', {
        updateOn: 'change',
      }),
    });

    this.form.valueChanges.subscribe((changes) => {
      console.log('changes', changes);
    });
  }

  log(text) {
    console.log(text);
  }

  ngOnInit(): void {}
}
