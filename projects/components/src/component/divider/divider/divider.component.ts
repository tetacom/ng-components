import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit, TemplateRef,
} from '@angular/core';

@Component({
  selector: 'teta-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent implements OnInit {

  @Input() label;

  @Input() template: TemplateRef<any>
  constructor() {}
  ngOnInit(): void {}
}