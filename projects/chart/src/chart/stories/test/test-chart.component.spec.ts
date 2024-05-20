import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestChartComponent } from './test-chart.component';

describe('TestChartComponent', () => {
  let component: TestChartComponent;
  let fixture: ComponentFixture<TestChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
