
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Add MatCardModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Add MatToolbarModule
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeService } from './employees/services/employee.service';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { AgePipe } from './age.pipe';
import { HighlightDirective } from './highlight.directive';
import { MatError } from '@angular/material/form-field'; // Import MatError
import { MatSelectModule } from '@angular/material/select'; // Add MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Add MatOptionModule
import { SalaryPipe } from './salary.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    AgePipe,
    SalaryPipe,
    AppComponent,
    LayoutComponent,
    HighlightDirective
  ],
  imports: [
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatError,
    MatToolbarModule,
  ],
  providers: [AuthGuard, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }