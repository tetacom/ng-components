import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'teta-sample-input',
  templateUrl: './sample-input.component.html',
  styleUrls: ['./sample-input.component.scss']
})
export class SampleInputComponent implements OnInit {
  form: FormGroup;
  show: number;
  value = new Array(20).fill(1684);
  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', {
        updateOn: 'blur'
      }),
      name2: new FormControl('', {
        updateOn: 'blur'
      }),
      surname: new FormControl('', {
        updateOn: 'change'
      })
    });

    this.form.valueChanges.subscribe((changes) => {
      console.log('changes', changes);
    });
  }

  log(text) {
    console.log(text);
  }

  ngOnInit(): void {
  }

}
