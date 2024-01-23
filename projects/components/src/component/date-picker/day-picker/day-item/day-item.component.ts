import {ChangeDetectionStrategy, Component,Input, OnInit} from '@angular/core';
import {DayModel} from "../../model/day-model";


@Component({
    selector: 'teta-day-item',
    templateUrl: './day-item.component.html',
    styleUrls: ['./day-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class DayItemComponent implements OnInit {
  @Input() day: DayModel;


  ngOnInit(): void {
  }

}
