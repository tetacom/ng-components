import { Injectable } from '@angular/core';
import { ITreeData } from '../../common/contract/i-tree-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  openItems: Observable<ITreeData[]>;
  private _openItems: BehaviorSubject<ITreeData[]> = new BehaviorSubject<
    ITreeData[]
  >([]);

  constructor() {
    this.openItems = this._openItems.asObservable();
  }

  compareItems: (item: ITreeData) => any = (item: ITreeData) => item;

  openItem(item: ITreeData) {
    const newValue = this.addOrRemove(item, this._openItems.value);
    this.setOpenItems(newValue);
  }

  setOpenItems(items: ITreeData[]) {
    this._openItems.next(items);
  }

  private addOrRemove<G>(needle: G, list: G[]): G[] {
    const found = list?.find(
      (x) => this.compareItems(x) === this.compareItems(needle)
    );
    if (found) {
      return list.filter(
        (x) => this.compareItems(x) !== this.compareItems(needle)
      );
    } else {
      return [...list, needle];
    }
  }
}
