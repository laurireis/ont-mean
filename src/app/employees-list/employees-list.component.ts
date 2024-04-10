import { Component, OnInit, WritableSignal } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  employees$ = {} as WritableSignal<Employee[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-position',
    'col-level',
    'col-app',
    'col-action',
  ];

  constructor(private employeesService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  deleteEmployee(id: string): void {
    this.employeesService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(),
    });
  }

  private fetchEmployees(): void {
    this.employees$ = this.employeesService.employees$;
    this.employeesService.getEmployees();
  }
}
