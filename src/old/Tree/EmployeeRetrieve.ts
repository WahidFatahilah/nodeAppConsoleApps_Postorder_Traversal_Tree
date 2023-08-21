import {EmployeeTree} from "./EmployeeTree";
import {Employee} from "../model/Employee";
import {EmployeeNode} from "./EmployeeNode";


export  class EmployeeRetriever {
    constructor(private listEmployees: Employee[], private employeeTree: EmployeeTree) {}

   public findEmployeeByName(name: string): Employee | undefined {
        return this.listEmployees.find(employee => employee.name.toLowerCase() === name.toLowerCase());
    }

    public findEmployeeById(id: number): Employee | undefined {
        return this.listEmployees.find(employee => employee.id === id);
    }

    public findIsEmployeeDontHaveHierarchy(employee: Employee): boolean {
        return employee.managerId === null && employee.id !== 1;
    }

    public findEmployeesWithMultipleManagers(name: string): Employee[] {
        const employees = this.listEmployees.filter(employee => employee.name.toLowerCase() === name.toLowerCase());
        const groupBy = employees.reduce((acc: { [id: number]: Employee[] }, employee) => {
            acc[employee.id] = acc[employee.id] || [];
            acc[employee.id].push(employee);
            return acc;
        }, {});
        return Object.values(groupBy).filter(group => group.length > 1).flat();
    }

    public findSiblingsByName(name: string): Employee[] {
        const employee = this.findEmployeeByName(name);
        if (!employee) {
            return []; // Employee not found
        }
        return this.employeeTree.getSiblings(employee);
    }

}
