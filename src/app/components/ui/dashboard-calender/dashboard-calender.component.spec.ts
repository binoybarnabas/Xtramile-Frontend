import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCalenderComponent } from './dashboard-calender.component';

describe('DashboardCalenderComponent', () => {
  let component: DashboardCalenderComponent;
  let fixture: ComponentFixture<DashboardCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCalenderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the current month', () => {
    const currentMonth = component.getCurrentMonth();
    const expectedMonth = new Date().toLocaleString('en-us', { month: 'long' });
    expect(currentMonth).toEqual(expectedMonth);
  });

  it('should return the current year', () => {
    const currentYear = component.getCurrentYear();
    const expectedYear = new Date().getFullYear().toString();
    expect(currentYear).toEqual(expectedYear);
  });
});
