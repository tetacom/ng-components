import {Directive, HostBinding} from "@angular/core";

@Directive({
    selector: '[tetaScrollable]',
    standalone: true,
})
export class ScrollableDirective {
  @HostBinding('class.scrollable_hide_scroll') private readonly hideScrollClass = true;
}
