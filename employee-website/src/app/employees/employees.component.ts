import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../employees/services/employee.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'salary', 'age', 'details'];
  employees = signal<any[]>([]);  // Use signal to store employee data
  filteredEmployeesDataSource!: MatTableDataSource<any>;
  searchTerm = signal('');  // Use signal for search term
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.employeeService.getEmployees().subscribe((data: any) => {
      if (data && data.default && Array.isArray(data.default)) {
        this.employees.set(data.default);  // set signal value
        this.filteredEmployeesDataSource = new MatTableDataSource(this.employees());

        this.filteredEmployeesDataSource.filterPredicate = (data: any, filter: string) => {
          const searchTerm = filter.trim().toLowerCase();
          return data.employee_name.toLowerCase().includes(searchTerm) ||
                 data.id.toString().includes(searchTerm) ||
                 data.employee_salary.toString().includes(searchTerm) ||
                 data.employee_age.toString().includes(searchTerm);
        };

        this.applyFilter(this.searchForm.get('searchTerm')?.value);
      } else {
        console.error('Error: Employees data is not in expected format:', data);
      }
    });

    //search term changes and update the signal
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.searchTerm.set(value);  //update signal value
      this.applyFilter(value);
    });
  }

  applyFilter(searchTerm: string): void {
    const term = searchTerm.trim().toLowerCase();
    if (this.filteredEmployeesDataSource) {
      this.filteredEmployeesDataSource.filter = term;
    }
  }

  viewDetails(employee: any): void {
    this.router.navigate([`/employees/${employee.id}`]);
  }
}
