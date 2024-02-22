import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SwitchService } from '../switch.service';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'teta-switch-button',
    templateUrl: './switch-button.component.html',
    styleUrls: ['./switch-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class SwitchButtonComponent implements OnInit, OnDestroy {
  @Input() value: any;
  @Input() class: string;

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'switch-button'];
    if (
      this.svcValue === this.value ||
      (this.svcValue instanceof Array && this.svcValue.indexOf(this.value) >= 0)
    ) {
      result.push('switch-button_active');
    }
    return result.join(' ');
  }

  private svcValue: any;
  private _alive = true;

  constructor(private svc: SwitchService, private cdr: ChangeDetectorRef) {
    this.svc.value.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.svcValue = _;
      this.cdr.markForCheck();
    });
  }

  @HostListener('click', ['$event']) click(event: MouseEvent): void {
    this.svc.setValue(this.value);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }
}
