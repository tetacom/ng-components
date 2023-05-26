import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {AutocompleteModule} from "./autocomplete.module";

export default {
  title: 'Component/Autocomplete',
  decorators: [withKnobs],
  component: AutocompleteComponent,
  moduleMetadata: {
    imports: [AutocompleteModule]
  }
} as Meta;

export const basicAutocomplete = () => ({
  moduleMetadata: {
    imports: [AutocompleteModule]
  },
  template: `<div class="font-body-3 padding-3 bg-panel-50">
        <input #input/>
      <teta-autocomplete>

      </teta-autocomplete>
    </div>`,
});

