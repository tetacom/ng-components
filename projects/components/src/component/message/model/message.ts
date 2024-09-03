import { TemplateRef } from '@angular/core';
import { viewType } from '../../../common/model/view-type.model';

export class Message {
  name: string | null | undefined;
  title: string | null | undefined;
  text: string | null | undefined;
  infinite: boolean;
  viewType?: viewType = 'rounded';
  duration = 10000;
  className: string[] | null | undefined;
  palette = 'primary';
  template: TemplateRef<any>;

  constructor(options?: {
    name?: string;
    title: string;
    text?: string;
    infinite?: boolean;
    duration?: number;
    viewType?: viewType;
    palette?: string;
    className?: string[];
    template?: TemplateRef<any>;
  }) {
    if (options) {
      this.name = options.name;
      this.title = options.title;
      this.viewType = options.viewType || 'rounded';
      this.text = options.text;
      this.infinite = options.infinite || false;
      this.className = options.className;
      if (options.palette) {
        this.palette = options.palette;
      }
      this.template = options.template;
      if (options.duration && options.duration > 0) {
        this.duration = options.duration;
      }
    }
  }
}
