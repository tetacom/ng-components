import {ChangeDetectionStrategy, Component,Input, OnInit} from '@angular/core';
import {DayModel} from 'projects/components/src/component/date-picker/model/day-model';


@Component({
  selector: 'teta-day-item',
  templateUrl: './day-item.component.html',
  styleUrls: ['./day-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayItemComponent implements OnInit {
  @Input() day: DayModel;


  ngOnInit(): void {
  }

}
