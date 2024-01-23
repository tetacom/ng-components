import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ThemeSwitchService } from '../theme-switch.service';
import { Observable } from 'rxjs';
import { ButtonViewType, ButtonComponent } from '../../button/button/button.component';
import { IconComponent } from '../../icon/icon/icon.component';

@Component({
    selector: 'teta-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: ['./theme-switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, IconComponent],
})
export class ThemeSwitchComponent implements OnInit {
  @Input() palette = 'text';
  @Input() view: ButtonViewType = 'ghost';
  theme: Observable<boolean>;

  constructor(private _svc: ThemeSwitchService) {
    this.theme = this._svc.theme;
  }

  ngOnInit(): void {}

  switchTheme() {
    this._svc.switchTheme();
  }
}
