import { Component, ElementRef, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollContainerComponent } from './scroll-container.component';
import { ScrollContainerDirective } from './scroll-container.directive';
import { DropdownComponent } from '../../component/dropdown/dropdown/dropdown.component';
import { DropdownHeadDirective } from '../../component/dropdown/dropdown-head.directive';
import { DropdownContentDirective } from '../../component/dropdown/dropdown-content.directive';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';

@Component({
  selector: 'teta-scroll-container-examples',
  imports: [ScrollContainerComponent, ScrollContainerDirective, ScrollingModule],
  template: `
    <div class="examples">
      <button (click)="runChecks()">Run browser checks</button>
      <button (click)="count = count === 3 ? 30 : 3">Toggle content</button>
      <button (click)="mounted = !mounted">Toggle viewport</button>
      <pre aria-live="polite">{{ results }}</pre>
      <p>Actual scroll: {{ scrollPosition }}</p>
      <h3>Both axes; positioned container; native scroll event</h3>
      <teta-scroll-container #box tabindex="0" class="box" [showScrollbars]="true" (scroll)="onScroll($event)">
        <div style="width: 800px; height: 600px; background: linear-gradient(135deg, #8ad, #da8)">Content</div>
      </teta-scroll-container>
      <h3>Natural height, then max-height (no hover)</h3>
      <teta-scroll-container #natural class="natural">
        @for (item of items.slice(0, count); track item) {
          <div style="height: 28px; flex-shrink: 0">Item {{ item }}</div>
        }
      </teta-scroll-container>
      <h3>Minimum thumb / RTL</h3>
      <div class="row" style="gap: 20px">
        <teta-scroll-container #long class="box" [showScrollbars]="true">
          <div style="height: 100000px">Long content</div>
        </teta-scroll-container>
        <teta-scroll-container #rtl dir="rtl" class="box" [showScrollbars]="true">
          <div style="width: 800px; height: 40px; background: #8ad">RTL</div>
        </teta-scroll-container>
      </div>
      <h3>CDK viewport, no outer scroll container</h3>
      @if (mounted) {
        <cdk-virtual-scroll-viewport #viewport tetaScrollContainer [showScrollbars]="true" [itemSize]="28" class="box">
          <div *cdkVirtualFor="let item of items" style="height: 28px; width: 800px">Virtual item {{ item }}</div>
        </cdk-virtual-scroll-viewport>
      }
      <h3>Nested scroll containers</h3>
      <teta-scroll-container #outer class="box" [showScrollbars]="true">
        <div style="height: 400px; padding: 10px">
          <teta-scroll-container #inner style="display: block; width: 200px; height: 100px" [showScrollbars]="true">
            <div style="height: 500px">Inner</div>
          </teta-scroll-container>
        </div>
      </teta-scroll-container>
    </div>
  `,
  styles: [
    `
      .examples {
        padding: 20px;
        color: var(--color-text-90);
      }
      .box {
        position: relative;
        width: 320px;
        height: 180px;
        background: #8882;
      }
      .natural {
        width: 320px;
        max-height: 180px;
      }
      pre {
        white-space: pre-wrap;
      }
    `,
  ],
})
class ScrollContainerExamples {
  @ViewChild('box', { read: ElementRef }) box: ElementRef<HTMLElement>;
  @ViewChild('natural', { read: ElementRef }) natural: ElementRef<HTMLElement>;
  @ViewChild('long', { read: ElementRef }) long: ElementRef<HTMLElement>;
  @ViewChild('rtl', { read: ElementRef }) rtl: ElementRef<HTMLElement>;
  @ViewChild('outer', { read: ElementRef }) outer: ElementRef<HTMLElement>;
  @ViewChild('inner', { read: ElementRef }) inner: ElementRef<HTMLElement>;
  @ViewChild('viewport') viewport: CdkVirtualScrollViewport;
  private readonly cdr = inject(ChangeDetectorRef);
  items = Array.from({ length: 100 }, (_, index) => index);
  count = 3;
  mounted = true;
  results = 'Checks not run';
  scrollPosition = '0, 0';

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    this.scrollPosition = `${element.scrollLeft}, ${element.scrollTop}`;
  }

  async runChecks(): Promise<void> {
    const lines: string[] = [];
    const check = (name: string, ok: boolean, detail = '') => lines.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`);
    const settle = async () => {
      this.cdr.detectChanges();
      for (let i = 0; i < 4; i++) await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    };
    const close = (a: number, b: number) => Math.abs(a - b) < 2;
    const bars = (element: HTMLElement) => element.querySelector(':scope > .teta-scroll-bars') as HTMLElement;
    const thumb = (element: HTMLElement, axis = 'y') =>
      bars(element).querySelector(`.teta-scroll-track-${axis} > .teta-scroll-thumb`) as HTMLElement;
    const box = this.box.nativeElement;
    check('CSS support', CSS.supports('animation-timeline: --test') && CSS.supports('anchor-scope: --test'));
    box.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    await settle();
    check('No content wrapper', box.firstElementChild.tagName === 'DIV' && box.children.length === 2);
    check('Overlay consumes no width', box.clientWidth === 320);
    const popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;left:400px;top:20px;width:80px;height:30px;z-index:100;background:#8ad';
    box.appendChild(popup);
    await settle();
    check('Fixed popup outside host remains visible', document.elementFromPoint(410, 25) === popup);
    popup.remove();
    const startRect = bars(box).getBoundingClientRect();
    check(
      'Bars match viewport',
      close(startRect.width, 320) && close(startRect.height, 180),
      JSON.stringify({ width: startRect.width, height: startRect.height }),
    );
    box.scrollTo({ top: 210, left: 240, behavior: 'instant' });
    await settle();
    const afterRect = bars(box).getBoundingClientRect();
    check(
      'Bars stay fixed during scroll',
      close(startRect.top, afterRect.top) && close(startRect.left, afterRect.left),
      JSON.stringify({ topDelta: afterRect.top - startRect.top, leftDelta: afterRect.left - startRect.left }),
    );
    const yt = thumb(box).getBoundingClientRect();
    const ytrack = thumb(box).parentElement.getBoundingClientRect();
    check(
      'Thumb proportional',
      close(yt.height, (ytrack.height * box.clientHeight) / box.scrollHeight),
      `${yt.height}`,
    );
    check('Thumb at midpoint', close(yt.top - ytrack.top, (ytrack.height - yt.height) / 2));
    const natural = this.natural.nativeElement;
    this.count = 3;
    await settle();
    check('Natural small height', close(natural.clientHeight, 84), `${natural.clientHeight}`);
    check('No overflow has no thumb', getComputedStyle(thumb(natural)).opacity === '0');
    this.count = 30;
    await settle();
    check('Grows to max-height', close(natural.clientHeight, 180) && natural.scrollHeight === 840);
    check('Overflow enables thumb', getComputedStyle(thumb(natural)).opacity === '1');
    this.count = 3;
    await settle();
    check('Shrinks with content', close(natural.clientHeight, 84));
    const long = this.long.nativeElement;
    long.scrollTop = (long.scrollHeight - long.clientHeight) / 2;
    await settle();
    const lt = thumb(long).getBoundingClientRect();
    const ltrack = thumb(long).parentElement.getBoundingClientRect();
    check('Minimum thumb size', close(lt.height, 24));
    check('Minimum thumb linear midpoint', close(lt.top - ltrack.top, (ltrack.height - lt.height) / 2));
    const rtl = this.rtl.nativeElement;
    rtl.scrollLeft = -(rtl.scrollWidth - rtl.clientWidth) / 2;
    await settle();
    const xt = thumb(rtl, 'x').getBoundingClientRect();
    const xtrack = thumb(rtl, 'x').parentElement.getBoundingClientRect();
    check('RTL midpoint', close(xt.left - xtrack.left, (xtrack.width - xt.width) / 2));
    if (this.viewport) {
      this.viewport.scrollToIndex(50, 'auto');
      await settle();
      const viewport = this.viewport.elementRef.nativeElement;
      check(
        'CDK renders after scrolling',
        this.viewport.getRenderedRange().start > 0 && close(viewport.scrollTop, 1400),
      );
      check('CDK bars fixed', close(bars(viewport).getBoundingClientRect().top, viewport.getBoundingClientRect().top));
      check('CDK has one layer', viewport.querySelectorAll(':scope > .teta-scroll-bars').length === 1);
    }
    const outer = this.outer.nativeElement;
    const inner = this.inner.nativeElement;
    outer.scrollTop = 50;
    inner.scrollTop = 100;
    await settle();
    check(
      'Nested anchor isolation',
      close(bars(inner).getBoundingClientRect().width, 200) && close(bars(outer).getBoundingClientRect().width, 320),
    );
    outer.scrollIntoView({ block: 'center', behavior: 'instant' });
    await settle();
    const nestedThumb = thumb(inner);
    const nestedRect = nestedThumb.getBoundingClientRect();
    const outsideX = nestedRect.left + nestedRect.width / 2;
    const outsideY = nestedRect.top + 2;
    check(
      'Nested bar clipped outside parent',
      outsideY > 0 &&
        outsideY < outer.getBoundingClientRect().top &&
        !bars(inner).contains(document.elementFromPoint(outsideX, outsideY)),
    );
    check(
      'Visible nested track remains interactive',
      bars(inner).contains(document.elementFromPoint(outsideX, outer.getBoundingClientRect().top + 10)),
    );
    outer.scrollTop = 160;
    await settle();
    const hiddenRect = nestedThumb.getBoundingClientRect();
    check(
      'Fully hidden nested bar cannot receive pointer',
      hiddenRect.top > 0 &&
        !bars(inner).contains(document.elementFromPoint(hiddenRect.left + hiddenRect.width / 2, hiddenRect.top + 2)),
    );
    outer.scrollTop = 50;
    await settle();
    this.results = lines.join('\n');
    this.cdr.detectChanges();
  }
}

@Component({
  selector: 'teta-dynamic-scroll-dropdown',
  imports: [ScrollContainerComponent, DropdownComponent, DropdownHeadDirective, DropdownContentDirective],
  template: `
    <div style="padding: 20px">
      <button (click)="count = count === 3 ? 30 : 3">Toggle content: {{ count }} items</button>
      <p>Open Dropdown, then toggle 3 → 30 → 3 items. It should grow to available height, then shrink.</p>
      <teta-dropdown [autoClose]="false" [verticalAlign]="bottom">
        <button tetaDropdownHead>Dropdown</button>
        <teta-scroll-container tetaDropdownContent class="column" style="width: 220px">
          @for (item of items.slice(0, count); track item) {
            <div style="height: 28px; flex-shrink: 0">Dropdown item {{ item }}</div>
          }
        </teta-scroll-container>
      </teta-dropdown>
    </div>
  `,
})
class DynamicScrollDropdown {
  count = 3;
  items = Array.from({ length: 30 }, (_, index) => index);
  bottom = VerticalAlign.bottom;
}

export default {
  title: 'Component/Scroll container',
  component: ScrollContainerExamples,
} as Meta<ScrollContainerExamples>;
export const Examples: StoryObj<ScrollContainerExamples> = {};
export const DynamicDropdown: StoryObj<ScrollContainerExamples> = {
  render: () => ({
    moduleMetadata: { imports: [DynamicScrollDropdown] },
    template: '<teta-dynamic-scroll-dropdown />',
  }),
};
