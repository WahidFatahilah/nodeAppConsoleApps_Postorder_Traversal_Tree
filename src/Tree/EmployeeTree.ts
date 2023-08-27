
import {employeeData} from "./EmployeeData";
import {Employee} from "../model/employee";

export class EmployeeTree {
    employees: Employee[];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    postOrderTraversal(nodeId: number | null, targetName: string | null, managerHierarchy: string[] = []) {
        // Iterate through each node in the tree structure
        for (const node of this.employees) {

            // If the current node is a child of the node with a matching managerId
            if (node.managerId === nodeId) {
                // Perform recursion into the branches/children of the current node
                this.postOrderTraversal(node.id, targetName, [...managerHierarchy, node.name]);
                // If the name of the current node matches the target being searched for
                if (node.name === targetName) {
                    // Store data related to the found target node
                    this.storeDataForTargetName(node, managerHierarchy);
                }
                // Display the name of the current node
                process.stdout.write(node.name + ",");
            }
        }

    }


    //At each iteration the data will be processed and inserted into the data retrieve
    storeDataForTargetName(node: Employee, managerHierarchy: string[]) {
        // Store information about the found employee
        this.storeEmployeeFound(node);
        // Store data related to the employee's position in the root hierarchy
        this.storeRootHierarchyData(node);
        // Store data related to employees without hierarchy
        this.storeEmployeedDontHaveHierarchyData(node);
        // Store the hierarchy of managers from the employee up to the root
        this.storeManagerUpToRoot(managerHierarchy);
        // Store the name of the parent employee
        this.storeParentName(managerHierarchy);
    }

    // Stores the name of the employee that has been found
    storeEmployeeFound(node: Employee) {
        employeeData.employeeFound = node.name;
    }

    // Stores the name of the employee with root position if their ID is 1
    storeRootHierarchyData(node: Employee) {
        if (node.id === 1) {
            employeeData.employeeWithRootPosition = node.name;
        }
    }

    // Stores the name of employees without hierarchy (no manager)
    storeEmployeedDontHaveHierarchyData(node: Employee) {
        // Checks if the employee has no manager (managerId is null) and is not the root employee (ID is not 1)
        if (node.managerId === null && node.id !== 1) {
            employeeData.employeeDontHaveHierarchy = node.name;
        }
    }

    // Stores the hierarchy of managers from the employee up to the root
    storeManagerUpToRoot(managerHierarchy: string[]) {
       // Checks if the node has a parent then it will be inserting into storeManagerUpToRoot
        if (managerHierarchy.length > 0) {
            // Reverses the managerHierarchy array to store hierarchy from bottom to top
            for (let i = managerHierarchy.length - 1; i >= 0; i--) {
                employeeData.storeManagerUpToRoot.push(managerHierarchy[i]);
            }
        }
    }

    // Stores the name of the parent employee (top manager)
    storeParentName(managerHierarchy: string[]) {
        // Gets the name of the parentName from the managerHierarchy
        const parentName = managerHierarchy[managerHierarchy.length - 1];
        employeeData.parentsNodeData.push(parentName);
    }

}