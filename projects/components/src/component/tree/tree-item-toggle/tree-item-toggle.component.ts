import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TreeService } from '../tree.service';
import { ITreeData } from '../../../common/contract/i-tree-data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../icon/icon/icon.component';

@Component({
  selector: 'teta-tree-item-toggle',
  templateUrl: './tree-item-toggle.component.html',
  styleUrls: ['./tree-item-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent, AsyncPipe],
})
export class TreeItemToggleComponent implements OnInit {
  @Input() item: ITreeData;
  open: Observable<boolean>;

  constructor(public service: TreeService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.open = this.service.openItems.pipe(
      map((_) => {
        const found = _?.find((x) => this.service.compareItems(x) === this.service.compareItems(this.item));
        return found != null;
      })
    );
  }
}
