import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'teta-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AutocompleteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
