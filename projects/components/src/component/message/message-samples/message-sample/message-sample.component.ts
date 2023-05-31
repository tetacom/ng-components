import {ChangeDetectionStrategy, Component, OnInit, TemplateRef,} from '@angular/core';
import {MessageService} from '../../message.service';
import {Message} from '../../model/message';

@Component({
  selector: 'teta-message-sample',
  templateUrl: './message-sample.component.html',
  styleUrls: ['./message-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSampleComponent implements OnInit {
  constructor(private _svc: MessageService) {
  }

  create(
    title: string,
    text: string,
    infinite: boolean,
    palette: string,
    className?: string,
    template?: TemplateRef<any>
  ) {
    this._svc.add(
      new Message({
        className: [className],
        title,
        viewType: "brick",
        palette,
        text,
        template,
        infinite,
      })
    );
  }

  ngOnInit(): void {
  }
}
