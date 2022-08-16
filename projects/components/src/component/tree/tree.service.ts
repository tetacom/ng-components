import { Injectable } from '@angular/core';
import { ITreeData } from '../../common/contract/i-tree-data';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  openItems: Observable<ITreeData[]>;
  scrollToIndex: Observable<number>;

  private _openItems: BehaviorSubject<ITreeData[]> = new BehaviorSubject<
    ITreeData[]
  >([]);
  private _scrollToIndex = new BehaviorSubject<number>(0);

  constructor() {
    this.openItems = this._openItems.asObservable();
    this.scrollToIndex = this._scrollToIndex.asObservable();
  }

  compareItems: (item: ITreeData) => any = (item: ITreeData) => item;

  openItem(item: ITreeData) {
    const newValue = this.addOrRemove(item, this._openItems.value);
    this.setOpenItems(newValue);
  }

  setOpenItems(items: ITreeData[]) {
    this._openItems.next(items);
  }

  scrollTo(index: number) {
    this._scrollToIndex.next(index)
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
