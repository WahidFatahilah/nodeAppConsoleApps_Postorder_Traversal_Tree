import fs from "fs";
import * as readline from "readline";
import {Employee} from "./model/Employee";
import {data} from "./utils/parseJson";

class EmployeeNode {
    constructor(public employee: Employee, public children: EmployeeNode[] = []) {}

    addChild(node: EmployeeNode) {
        this.children.push(node);
    }
}

class EmployeeTree {
    private employeeMap: Map<number, EmployeeNode>;
    private employeeFinder: EmployeeFinder;

    constructor(private listEmployees: Employee[]) {
        this.employeeMap = new Map();
        this.employeeFinder = new EmployeeFinder(listEmployees, this); // Pass 'this' reference
        this.preorderTraversal();
    }

    private preorderTraversal(): void {
        const rootEmployees = this.listEmployees.filter(employee => employee.managerId === null);

        for (const rootEmployee of rootEmployees) {
            const rootNode = this.preorderTraversalRecursive(rootEmployee);
            if (rootNode) {
                this.employeeMap.set(rootEmployee.id, rootNode);
            }
        }
    }

    private preorderTraversalRecursive(employee: Employee): EmployeeNode | null {
        const employeeNode = new EmployeeNode(employee);
        const directReports = this.listEmployees.filter(e => e.managerId === employee.id);

        for (const directReport of directReports) {
            const childNode = this.preorderTraversalRecursive(directReport);
            if (childNode) {
                employeeNode.addChild(childNode);
            }
        }

        return employeeNode;
    }




    printHierarchy(): void {
        const rootNodes = this.getRootNodes();
        for (const rootNode of rootNodes) {
            this.printSubHierarchy(rootNode, '');
        }
    }

    private printSubHierarchy(node: EmployeeNode, indent: string): void {
        console.log(`${indent}${node.employee.name}`);
        for (const childNode of node.children) {
            this.printSubHierarchy(childNode, `${indent}    `);
        }
    }

    getRootNodes(): EmployeeNode[] {
        return Array.from(this.employeeMap.values()).filter(node => node.employee.managerId === null);
    }

    getEmployeeFinder(): EmployeeFinder {
        return this.employeeFinder;
    }

    getManagersUpToRoot(employee: Employee): string[] {
        const managerNames: string[] = [];
        let currentEmployee: Employee | null = employee;

        while (currentEmployee !== null && currentEmployee.managerId !== null) {
            const manager = this.employeeFinder.findEmployeeById(currentEmployee.managerId);
            if (manager) {
                managerNames.push(manager.name);
                currentEmployee = manager;
            } else {
                currentEmployee = null;
            }
        }

        return managerNames.reverse();
    }
}


class EmployeeFinder {
    constructor(private listEmployees: Employee[], private employeeTree: EmployeeTree) {}

    findEmployeeByName(name: string): Employee | undefined {
        return this.listEmployees.find(employee => employee.name.toLowerCase() === name.toLowerCase());
    }

    findEmployeeById(id: number): Employee | undefined {
        return this.listEmployees.find(employee => employee.id === id);
    }

    findIsEmployeeDontHaveHierarchy(employee: Employee): boolean {
        return employee.managerId === null && employee.id !== 1;
    }

    findEmployeesWithMultipleManagers(name: string): Employee[] {
        const employees = this.listEmployees.filter(employee => employee.name.toLowerCase() === name.toLowerCase());
        const groupBy = employees.reduce((acc: { [id: number]: Employee[] }, employee) => {
            acc[employee.id] = acc[employee.id] || [];
            acc[employee.id].push(employee);
            return acc;
        }, {});
        return Object.values(groupBy).filter(group => group.length > 1).flat();
    }

}


interface EmployeeSearch {
    search(employeeName: string): string;
}

class EmployeeSearchRoot implements EmployeeSearch {
    constructor(private employeeFinder: EmployeeFinder) {}

    search(employeeName: string): string {
        const foundEmployee = this.employeeFinder.findEmployeeByName(employeeName);
        if (foundEmployee && foundEmployee.id === 1 && foundEmployee.managerId === null) {
            return `Employee ${foundEmployee.name} is a root tree hierarchy.`;
        }
        return '';
    }
}

class EmployeeSearchNotFound implements EmployeeSearch {
    constructor(private employeeFinder: EmployeeFinder) {}

    search(employeeName: string): string {
        const foundEmployee = this.employeeFinder.findEmployeeByName(employeeName);
        if (foundEmployee) {
            return `Search result: ${foundEmployee.name}`;
        }
        return `${employeeName} not found`;
    }
}

class EmployeeSearchDuplicateManager implements EmployeeSearch {
    constructor(private employeeFinder: EmployeeFinder) {}

    search(employeeName: string): string {
        const employeesWithSameName = this.employeeFinder.findEmployeesWithMultipleManagers(employeeName);
        if (employeesWithSameName.length > 0) {
            const managers = employeesWithSameName.map(employee => {
                const managerName = this.employeeFinder.findEmployeeById(employee.managerId || -1)?.name;
                return managerName !== employeeName ? managerName : null;
            }).filter(Boolean);

            if (managers.length > 0) {
                return `Employee ${employeeName} has multiple managers: ${managers.join(', ')}`;
            } else {
                return `Employee ${employeeName} has no duplicate managers.`;
            }
        } else {
            return '';
        }
    }
}

class EmployeeSearchWithoutHierarchy implements EmployeeSearch {
    constructor(private employeeFinder: EmployeeFinder) {}

    search(employeeName: string): string {
        const foundEmployee = this.employeeFinder.findEmployeeByName(employeeName);
        if (foundEmployee) {
            if (this.employeeFinder.findIsEmployeeDontHaveHierarchy(foundEmployee)) {
                return `Employee ${foundEmployee.name} does not have a hierarchy.\n` +
                    `Employee ${foundEmployee.name} does not have any direct report, need to have a manager`;
            }
        }
        return '';
    }
}

/*class EmployeeSearchWithManagers implements EmployeeSearch {
    constructor(private employeeFinder: EmployeeFinder) {}

    search(employeeName: string): string {
        const foundEmployee = this.employeeFinder.findEmployeeByName(employeeName);
        if (foundEmployee) {
            const managerNames = this.employeeFinder.getManagersUpToRoot(foundEmployee);
            if (managerNames.length > 0) {
                return `Employee ${foundEmployee.name} has managers up to root: ${managerNames.join(', ')}`;
            } else {
                return `Employee ${foundEmployee.name} has no managers up to root.`;
            }
        }
        return `${employeeName} not found`;
    }
}*/

// Main function
function main() {
    const rawData = fs.readFileSync('src/assets/3.json', 'utf-8');
    const data: Employee[] = JSON.parse(rawData);

    const employeeTree = new EmployeeTree(data);
    const employeeFinder = employeeTree.getEmployeeFinder();

    const searchRoot = new EmployeeSearchRoot(employeeFinder);
    const searchNotFound = new EmployeeSearchNotFound(employeeFinder);
    const searchDuplicateManager = new EmployeeSearchDuplicateManager(employeeFinder);
    const searchWithoutHierarchy = new EmployeeSearchWithoutHierarchy(employeeFinder);
    //const searchWithManagers = new EmployeeSearchWithManagers(employeeFinder);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Print the hierarchy
    console.log('\nEmployee Hierarchy:');
    employeeTree.printHierarchy();


    rl.question("Enter an employee name : ", (name) => {

        const resultRoot = searchRoot.search(name);
        const resultNotFound = searchNotFound.search(name);
        const resultDuplicateManager = searchDuplicateManager.search(name);
        const resultWithoutHierarchy = searchWithoutHierarchy.search(name);

       // const resultWithManagers = searchWithManagers.search(name); // Add this line
        const results = [resultRoot, resultNotFound, resultDuplicateManager, resultWithoutHierarchy].filter(Boolean);

        if (results.length > 0) {
            console.log(results.join('\n'));
        } else {
            console.log('No matching results found.');
        }
        rl.close();
    });
}

main()