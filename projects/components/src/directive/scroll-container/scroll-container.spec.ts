import { ApplicationRef, Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollContainerComponent } from './scroll-container.component';
import { ScrollContainerDirective } from './scroll-container.directive';

@Component({
  imports: [ScrollContainerComponent, ScrollContainerDirective],
  template: `
    <teta-scroll-container [showScrollbars]="always" (scroll)="lastScroll = $event">
      <div class="content">Content</div>
    </teta-scroll-container>
    <div tetaScrollContainer tabindex="-1"><div class="content">Existing viewport</div></div>
  `,
})
class TestHost {
  always = false;
  lastScroll?: Event;
}

describe('ScrollContainer', () => {
  let fixture: ComponentFixture<TestHost>;
  let container: HTMLElement;
  let thumb: HTMLElement;
  let scrollTo: jest.Mock;

  const pointer = (target: HTMLElement, type: string, x = 0, y = 0, pointerId = 1, button = 0) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, { clientX: x, clientY: y, pointerId, button });
    target.dispatchEvent(event);
    return event;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHost] });
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    container = fixture.nativeElement.querySelector('teta-scroll-container');
    thumb = container.querySelector('.teta-scroll-track-y > .teta-scroll-thumb');
    Object.defineProperties(container, {
      clientHeight: { value: 100, configurable: true },
      scrollHeight: { value: 1100, configurable: true },
      clientWidth: { value: 100, configurable: true },
      scrollWidth: { value: 1100, configurable: true },
    });
    // A minimum thumb leaves 76px of travel for 1000px of content scroll.
    jest
      .spyOn(thumb.parentElement, 'getBoundingClientRect')
      .mockReturnValue({ top: 0, left: 0, height: 100, width: 100 } as DOMRect);
    jest.spyOn(thumb, 'getBoundingClientRect').mockReturnValue({ height: 24, width: 24 } as DOMRect);
    thumb.setPointerCapture = jest.fn();
    thumb.hasPointerCapture = jest.fn().mockReturnValue(true);
    thumb.releasePointerCapture = jest.fn();
    container.scrollTo = scrollTo = jest.fn();
  });

  afterEach(() => fixture.destroy());

  it('keeps projected content directly inside both kinds of scroll container', () => {
    expect(container.firstElementChild.className).toBe('content');
    expect(container.children.length).toBe(2);
    expect(container.getAttribute('tabindex')).toBe('0');
    const viewport = fixture.nativeElement.querySelector('[tetaScrollContainer]');
    expect(viewport.firstElementChild.className).toBe('content');
    expect(viewport.querySelectorAll(':scope > .teta-scroll-bars').length).toBe(1);
    expect(viewport.getAttribute('tabindex')).toBe('-1');
  });

  it('preserves native scroll events and updates the always-visible input', () => {
    const event = new Event('scroll');
    container.dispatchEvent(event);
    expect(fixture.componentInstance.lastScroll).toBe(event);
    expect(event.target).toBe(container);
    fixture.componentInstance.always = true;
    fixture.detectChanges();
    expect(container.classList.contains('teta-scroll-container-always')).toBe(true);
  });

  it('maps minimum-sized thumb travel to the full scroll range and clamps to the ends', () => {
    container.scrollTop = 100;
    pointer(thumb, 'pointerdown', 0, 10);
    pointer(thumb, 'pointermove', 0, 48);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 600, behavior: 'instant' });
    pointer(thumb, 'pointermove', 0, 1000);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 1000, behavior: 'instant' });
    pointer(thumb, 'pointermove', 0, -1000);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' });
  });

  it('ignores other pointers and releases capture on cancellation', () => {
    pointer(thumb, 'pointerdown');
    pointer(thumb, 'pointermove', 0, 40, 2);
    expect(scrollTo).not.toHaveBeenCalled();
    pointer(thumb, 'pointercancel');
    expect(thumb.releasePointerCapture).toHaveBeenCalledWith(1);
    expect(container.classList.contains('teta-scroll-container-dragging')).toBe(false);
    pointer(thumb, 'pointermove', 0, 40);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it.each(['pointerup', 'lostpointercapture', 'contextmenu'])('ends drag on %s', (type) => {
    pointer(thumb, 'pointerdown');
    pointer(thumb, type);
    pointer(thumb, 'pointermove', 0, 40);
    expect(scrollTo).not.toHaveBeenCalled();
    expect(container.classList.contains('teta-scroll-container-dragging')).toBe(false);
  });

  it('maps horizontal RTL movement to negative scrollLeft', () => {
    thumb.parentElement.className = 'teta-scroll-track teta-scroll-track-x';
    container.style.direction = 'rtl';
    container.scrollLeft = -100;
    pointer(thumb, 'pointerdown', 10);
    pointer(thumb, 'pointermove', -28);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: -600, behavior: 'instant' });
    pointer(thumb, 'pointermove', -1000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: -1000, behavior: 'instant' });
    pointer(thumb, 'pointermove', 1000);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'instant' });
  });

  it('centers the thumb at a track click and allows dragging from that position', () => {
    const track = thumb.parentElement;
    pointer(track, 'pointerdown', 0, 50);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 500, behavior: 'instant' });
    pointer(thumb, 'pointermove', 0, 88);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 1000, behavior: 'instant' });
  });

  it.each([
    [-100, 0],
    [200, 1000],
  ])('clamps a track click at %s to %s', (coordinate, position) => {
    pointer(thumb.parentElement, 'pointerdown', 0, coordinate);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: position, behavior: 'instant' });
  });

  it('centers horizontal RTL track clicks within the negative scroll range', () => {
    thumb.parentElement.className = 'teta-scroll-track teta-scroll-track-x';
    container.style.direction = 'rtl';
    pointer(thumb.parentElement, 'pointerdown', 50);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: -500, behavior: 'instant' });
    pointer(thumb, 'pointermove', 12);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: -1000, behavior: 'instant' });
  });

  it('does not start drag for secondary buttons or a non-scrollable track', () => {
    pointer(thumb, 'pointerdown', 0, 0, 1, 2);
    expect(thumb.setPointerCapture).not.toHaveBeenCalled();
    Object.defineProperty(container, 'scrollHeight', { value: 100 });
    pointer(thumb, 'pointerdown');
    expect(thumb.setPointerCapture).not.toHaveBeenCalled();
  });

  it('destroys decoration, attached views and active drag listeners immediately', () => {
    const app = TestBed.inject(ApplicationRef);
    const views = app.viewCount;
    pointer(thumb, 'pointerdown');
    fixture.destroy();
    expect(container.querySelector('.teta-scroll-bars')).toBeNull();
    expect(app.viewCount).toBe(views - 2);
    pointer(thumb, 'pointermove', 0, 40);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('clips only the scrollbar layer along the axes clipped by an ancestor', () => {
    jest.useFakeTimers();
    try {
      const parent = fixture.nativeElement as HTMLElement;
      parent.style.overflowY = 'hidden';
      parent.style.overflowX = 'visible';
      Object.defineProperties(parent, {
        clientWidth: { value: 50 },
        clientHeight: { value: 100 },
      });
      jest.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
        top: 25,
        left: 0,
        right: 50,
        bottom: 125,
        width: 50,
        height: 100,
      } as DOMRect);
      const layer = container.querySelector('.teta-scroll-bars') as HTMLElement;
      jest.spyOn(layer, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
      } as DOMRect);
      window.dispatchEvent(new Event('resize'));
      jest.advanceTimersByTime(20);
      expect(layer.style.clipPath).toBe('inset(25% 0% 0% 0%)');
      expect(container.style.clipPath).toBe('');
      parent.style.overflowX = 'hidden';
      window.dispatchEvent(new Event('resize'));
      jest.advanceTimersByTime(20);
      expect(layer.style.clipPath).toBe('inset(25% 50% 0% 0%)');
    } finally {
      fixture.destroy();
      jest.useRealTimers();
    }
  });

  it('cancels scheduled clipping when the container is destroyed', () => {
    const cancel = jest.spyOn(window, 'cancelAnimationFrame');
    window.dispatchEvent(new Event('resize'));
    fixture.destroy();
    expect(cancel).toHaveBeenCalled();
    cancel.mockRestore();
  });
});

describe('ScrollContainer on the server', () => {
  it('renders content without accessing browser APIs', () => {
    TestBed.configureTestingModule({ imports: [TestHost], providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.content').textContent).toBe('Content');
    expect(fixture.nativeElement.querySelector('.teta-scroll-bars')).toBeNull();
    fixture.destroy();
  });
});
