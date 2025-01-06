import { Request, Response } from 'express';
import { Employee } from '../models/Employee-model';
import * as employeeData from '../data/employees.json';

const employees: Employee[] = employeeData as Employee[];

export const getEmployees = (req: Request, res: Response) => {
  res.status(200).json(employees);
};

export const getEmployeeById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const employeeId = parseInt(id, 10); // Ensure base 10 is used for parsing
  
    // Check if employeeId is a valid number
    if (isNaN(employeeId)) {
      res.status(400).json({ message: 'Invalid employee ID format' });
      return; // Exit after response to avoid further execution
    }
  
    // Alternative approach using a for loop to find the employee by ID
    let employee: Employee | undefined;
    for (let emp of employees) {
      if (emp.id === employeeId) {
        employee = emp;
        break; // Stop the loop once the employee is found
      }
    }
  
    // If employee not found, return 404
    if (!employee) {
      res.status(404).json({ message: `Employee with ID ${id} not found` });
      return; // Exit after response to avoid further execution
    }
  
    // If employee found, return employee data
    res.status(200).json(employee);
};
