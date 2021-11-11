import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { TetaTemplateModule } from '../../directive/teta-template/teta-template.module';
import { IconModule } from '../icon/icon.module';
import { TreeItemToggleComponent } from './tree-item-toggle/tree-item-toggle.component';

@NgModule({
  declarations: [TreeComponent, TreeItemComponent, TreeItemToggleComponent],
  exports: [TreeComponent, TetaTemplateModule, TreeItemToggleComponent],
  imports: [CommonModule, IconModule, TetaTemplateModule],
})
export class TreeModule {}
