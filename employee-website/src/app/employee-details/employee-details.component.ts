import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employees/services/employee.service'; 
import { Employee } from '../employees/models/employee.model'; 

import { signal } from '@angular/core';  

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  employeeId = signal<number | null>(null);  // Signal for employeeId
  employee = signal<Employee | undefined>(undefined);  // Signal for employee data

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService 
  ) {}

  ngOnInit(): void {
    // Listen to route parameter changes using the route observable
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId.set(+id);  // Update the employeeId signal with the new ID
        const employeeId = this.employeeId();
        if (employeeId !== null) {
          this.fetchEmployeeDetails(employeeId);  // Fetch employee details using the ID
        } else {
          console.error('Employee ID is null');
        }
      } else {
        console.error('Employee ID not found in route parameters');
      }
    });
  }

  fetchEmployeeDetails(id: number): void {
    // Call the employee service to fetch details
    this.employeeService.getEmployee(id).subscribe(
      (data: Employee) => {
        this.employee.set(data);  // Update the employee signal with the fetched data
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // No manual unsubscription needed for signals, Angular handles that internally
  }
}
