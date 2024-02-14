import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCardComponent } from './dashboard-card.component';

describe('DashboardCardComponent', () => {
  let component: DashboardCardComponent;
  let fixture: ComponentFixture<DashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardClick event on card click', () => {
    spyOn(component.cardClick, 'emit');
    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();
    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should return true if titles length is greater than 1', () => {
    component.titles = ['Title 1', 'Title 2'];
    expect(component.showScrollbar).toBeTrue();
  });

  it('should return false if titles length is less than or equal to 1', () => {
    component.titles = ['Title 1'];
    expect(component.showScrollbar).toBeFalse();

    component.titles = [];
    expect(component.showScrollbar).toBeFalse();
  });
});
