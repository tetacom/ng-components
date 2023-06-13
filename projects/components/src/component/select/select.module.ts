import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select/select.component';
import {DropdownModule} from '../dropdown/dropdown.module';
import {SelectOptionDirective} from './select-option.directive';
import {SelectValueDirective} from './select-value.directive';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';
import {HighlightModule} from '../../directive/highlight/highlight.module';
import {InputModule} from '../input/input.module';
import {LetModule} from "../../directive/let/let.module";
import {ScrollableModule} from "../../directive/scrollable/scrollable.module";

@NgModule({
  declarations: [SelectComponent, SelectOptionDirective, SelectValueDirective],
  exports: [SelectComponent, SelectOptionDirective, SelectValueDirective],
    imports: [
        DropdownModule,
        CommonModule,
        ScrollingModule,
        FormsModule,
        IconModule,
        HighlightModule,
        InputModule,
        LetModule,
        ScrollableModule,
    ],
})
export class SelectModule {}
