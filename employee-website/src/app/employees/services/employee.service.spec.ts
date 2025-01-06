import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppModule } from '../../app.module';  // Import the AppModule

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],  // Import necessary modules
      providers: [EmployeeService]  // Provide the service for testing
    });
    
    service = TestBed.inject(EmployeeService);  // Inject the service
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController to mock HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Test if the service is created
  });

  afterEach(() => {
    httpMock.verify();  // Ensures no pending HTTP requests are left
  });
});
