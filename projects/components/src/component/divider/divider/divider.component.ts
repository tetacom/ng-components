import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit, TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'teta-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet],
})
export class DividerComponent implements OnInit {

  @Input() label;

  @Input() template: TemplateRef<any>
  constructor() {}
  ngOnInit(): void {}
}
