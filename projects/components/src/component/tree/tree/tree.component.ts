import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  computed,
  effect,
  model,
  inject,
} from '@angular/core';
import { ITreeData } from '../../../common/contract/i-tree-data';
import { TreeService } from '../tree.service';
import { TetaTemplateDirective } from '../../../directive/teta-template/teta-template.directive';
import { filter, takeWhile } from 'rxjs/operators';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { TreeItemComponent } from '../tree-item/tree-item.component';
import { ScrollableDirective } from '../../../directive/scrollable/scrollable.directive';
import { ScrollableComponent } from '../../../directive/scrollable/scrollable/scrollable.component';

@Component({
  selector: 'teta-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ScrollableComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    ScrollableDirective,
    CdkVirtualForOf,
    TreeItemComponent,
  ],
})
export class TreeComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private treeService = inject(TreeService);
  private elementRef = inject(ElementRef);
  private ngZone = inject(NgZone);

  data = input<ITreeData[]>([]);
  padding = input<number>(8);
  childNodeName = input<string>('children');
  virtual = input<boolean>(false);
  height = input<number>(28);

  openItems = model<ITreeData[]>([]);

  @Output() service: EventEmitter<TreeService> = new EventEmitter<TreeService>();

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;

  @ContentChild(TetaTemplateDirective, { static: true })
  template: TetaTemplateDirective;

  childPadding = computed(() => {
    return this.data()?.some((_) => _[this.childNodeName()]?.length > 0);
  });

  displayData = computed(() => {
    return this.getDisplayData(this.data(), 0);
  });

  private _alive = true;
  private _obs: ResizeObserver;

  constructor() {
    effect(() => {
      this.treeService.setOpenItems(this.openItems());
    });
    this.treeService.openItems
      .pipe(
        takeWhile((_) => this._alive),
        filter((_) => this.openItems() !== _),
      )
      .subscribe((_: ITreeData[]) => {
        this.openItems.set(_);
        this.viewport?.checkViewportSize();
      });
  }

  @Input()
  set compareItems(func: (item: ITreeData) => any) {
    this.treeService.compareItems = func;
  }

  get compareItems() {
    return this.treeService.compareItems;
  }

  @HostBinding('class.tree') private readonly treeClass = true;

  ngOnInit(): void {
    this.service.emit(this.treeService);
    this.addResizeObserver();
  }

  ngOnChanges(): void {
    this.viewport?.checkViewportSize();
  }

  ngOnDestroy() {
    this._alive = false;
    this.removeResizeObserver();
  }

  ngAfterViewInit() {
    this.treeService.scrollToIndex.pipe(takeWhile(() => this._alive)).subscribe((index) => {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.viewport?.scrollToIndex(index, 'smooth');
        });
      });
    });
  }

  trackRow = (index: number, item: ITreeData): any => {
    if (this.compareItems) {
      return this.compareItems(item);
    }
    return index;
  };

  private getDisplayData(data: ITreeData[], level: number) {
    const result: ITreeData[] = [];
    data?.forEach((item: ITreeData) => {
      item['level'] = level;
      result.push(item);
      if (
        item[this.childNodeName()]?.length > 0 &&
        this.openItems()?.find((openItem) => this.compareItems(openItem) === this.compareItems(item))
      ) {
        result.push(...this.getDisplayData(item[this.childNodeName()], level + 1));
      }
    });
    return result;
  }

  private addResizeObserver() {
    this._obs = new ResizeObserver((_) => {
      this.viewport?.checkViewportSize();
    });

    this._obs.observe(this.elementRef.nativeElement);
  }

  private removeResizeObserver() {
    this._obs.unobserve(this.elementRef.nativeElement);
    this._obs.disconnect();
  }
}
