import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component'; // Import the HomeComponent

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page route
  { path: 'login', component: LoginComponent }, // Login page route
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'employees', component: EmployeesComponent,canActivate: [AuthGuard] },
      { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard],}  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
