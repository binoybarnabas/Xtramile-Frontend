
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { EmployeeDashboardService } from 'src/app/services/employeeServices/dashboardServices/employee-dashboard.service';
import { CommonAPIService } from 'src/app/services/commonAPIServices/common-api.service';
import { of } from 'rxjs';

describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;
  let mockEmployeeDashboardService: jasmine.SpyObj<EmployeeDashboardService>;
  let mockCommonAPIService: jasmine.SpyObj<CommonAPIService>;

  beforeEach(async () => {
    // Create spy objects for the services
    mockEmployeeDashboardService = jasmine.createSpyObj('EmployeeDashboardService', ['getRequestProgress', 'getUpcomingTripDetails']);
    mockCommonAPIService = jasmine.createSpyObj('CommonAPIService', ['getCurrentRequestDates']);

    // Configure TestBed to use the spy objects
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardComponent ],
      providers: [
        { provide: EmployeeDashboardService, useValue: mockEmployeeDashboardService },
        { provide: CommonAPIService, useValue: mockCommonAPIService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch progress data correctly', () => {
    const mockData = {
      requestCode: 'ABC123',
      status: 'In Progress'
    };
    mockEmployeeDashboardService.getRequestProgress.and.returnValue(of(mockData));

    component.fetchProgress();

    expect(component.cardTitles.length).toBe(1);
    expect(component.cardData.length).toBe(1);
    expect(component.cardTitles[0]).toBe(mockData.requestCode);
    expect(component.cardData[0]).toBe(mockData.status);
  });

});

