import { AutocompleteComponent } from './autocomplete/autocomplete.component';

import { Meta } from '@storybook/angular';

export default {
  title: 'Component/Autocomplete',
  component: AutocompleteComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const basicAutocomplete = () => ({
  moduleMetadata: {
    imports: [],
  },
  template: `<div class="font-body-3 padding-3 bg-panel-50">
                  <input #input/>
                  <teta-autocomplete></teta-autocomplete>
              </div>`,
});
