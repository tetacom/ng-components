import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesControlsComponent } from './series-controls.component';
import { ChartService } from '../../../service/chart.service';
import { Series } from '../../../model/series';
import { BasePoint } from '../../../model/base-point';
import { SeriesType } from '../../../model/enum/series-type';

describe('SeriesControlsComponent', () => {
  let component: SeriesControlsComponent;
  let fixture: ComponentFixture<SeriesControlsComponent>;
  const chartService = { updateSeries: jest.fn() };
  const curve = (id: string, group?: string, parentGroup?: string, enabled = false): Series<BasePoint> => ({
    id,
    name: id,
    type: SeriesType.line,
    data: [],
    group,
    parentGroup,
    enabled,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesControlsComponent],
      providers: [{ provide: ChartService, useValue: chartService }],
    })
      .overrideComponent(SeriesControlsComponent, { set: { template: '', imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(SeriesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds a hierarchy regardless of curve order, including parents with no curves', () => {
    const deepest = curve('deepest', 'Level 4', 'Level 3');
    const sibling = curve('sibling', 'Sibling', 'Root');
    fixture.componentRef.setInput('series', [
      deepest,
      sibling,
      curve('level 3', 'Level 3', 'Level 2'),
      curve('level 2', 'Level 2', 'Root'),
    ]);

    const [root] = component.groupedSeries();
    expect(root.name).toBe('Root');
    expect(root.series).toEqual([]);
    expect(root.children.map((group) => group.name)).toEqual(['Level 2', 'Sibling']);
    expect(root.children[0].children[0].children[0].series).toEqual([deepest]);
    expect(root.children[1].series).toEqual([sibling]);
  });

  it('keeps parent links from enabled curves and removes empty branches', () => {
    const parent = curve('parent', 'Child', 'Root', true);
    const leaf = curve('leaf', 'Leaf', 'Child');
    fixture.componentRef.setInput('series', [parent, leaf, curve('empty', 'Empty', undefined, true)]);

    expect(component.groupedSeries().map((group) => group.name)).toEqual(['Root']);
    expect(component.groupedSeries()[0].children[0].children[0].series).toEqual([leaf]);

    component.setSeriesEnabled(leaf, true);
    expect(chartService.updateSeries).toHaveBeenCalledWith(leaf);
    fixture.componentRef.setInput('series', [parent, { ...leaf }]);
    expect(component.groupedSeries()).toEqual([]);

    const disabledLeaf = { ...leaf, enabled: false };
    fixture.componentRef.setInput('series', [parent, disabledLeaf]);
    expect(component.groupedSeries()[0].children[0].children[0].series).toEqual([disabledLeaf]);
  });

  it('preserves flat groups and ungrouped curves while excluding hidden and custom curves', () => {
    const ungrouped = curve('ungrouped');
    const grouped = curve('grouped', 'Flat');
    fixture.componentRef.setInput('series', [
      ungrouped,
      grouped,
      { ...curve('hidden', 'Hidden'), showInControls: false },
      { ...curve('custom', 'Custom'), type: SeriesType.custom },
    ]);

    expect(component.flatSeries()).toEqual([ungrouped]);
    expect(component.groupedSeries()).toEqual([{ name: 'Flat', series: [grouped], children: [] }]);
  });

  it('keeps curves accessible when parent references contain cycles', () => {
    fixture.componentRef.setInput('series', [
      curve('a', 'A', 'B'),
      curve('b', 'B', 'A'),
      curve('self', 'Self', 'Self'),
    ]);

    expect(component.groupedSeries().map((group) => group.name)).toEqual(['A', 'B', 'Self']);
    expect(component.groupedSeries().every((group) => group.children.length === 0)).toBe(true);
  });
});
