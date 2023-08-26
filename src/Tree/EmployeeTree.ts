import {EmployeeNode} from "./EmployeeNode";
import {Employee} from "../model/Employee";
import {EmployeeRetriever} from "./EmployeeRetrieve";

// Class to represent the EmployeeTree
export class EmployeeTree {
    private employeeMap: Map<number, EmployeeNode>;
    private EmployeeRetriever: EmployeeRetriever;

    constructor(private listEmployees: Employee[]) {
        this.employeeMap = new Map();
        this.EmployeeRetriever = new EmployeeRetriever(listEmployees, this); // Pass 'this' reference
        this.preorderTraversalBuiltTree();
    }

    // Traverse and build the employee tree during initialization
    private preorderTraversalBuiltTree(): void {
        // Find root employees (those without a manager)
        const rootEmployees = this.listEmployees.filter(employee => employee.managerId === null);

        // Iterate through root employees to build their respective subtrees
        for (const rootEmployee of rootEmployees) {
            // Build the subtree for the current root employee
            const rootNode = this.preorderTraversalRecursive(rootEmployee);
            if (rootNode) {
                // Add the root node to the employeeMap
                this.employeeMap.set(rootEmployee.id, rootNode);
            }
        }
    }

// Build the employee tree nodes with recursive approach
    private preorderTraversalRecursive(employee: Employee): EmployeeNode | null {
        // Create a new EmployeeNode for the current employee
        const employeeNode = new EmployeeNode(employee);

        // Find all edges ( employees organizational line)
        const edges = this.listEmployees.filter(e => e.managerId === employee.id);

        // Recursively build subtrees for each direct report
        for (const directReport of edges) {
            // Build subtree for the current direct report
            const childNode = this.preorderTraversalRecursive(directReport);
            if (childNode) {
                // Add the child node to the current employee's node
                employeeNode.addChild(childNode);
            }
        }

        // Return the current employee's node (with its subtree)
        return employeeNode;
    }
    // Get siblings of an employee ;)
    getSiblings(employee: Employee): Employee[] {
        const managerId = employee.managerId;

        if (managerId === null) {
            return [];
        }

        const manager = this.EmployeeRetriever.findEmployeeById(managerId);
        if (!manager) {
            return [];
        }

        return this.listEmployees.filter(e => e.managerId === managerId && e.id !== employee.id);
    }

    // Get managers up to the root for an employee
    getParentsUpToRoot(employee: Employee): string[] {
        const managerNames: string[] = [];
        let currentEmployee: Employee | null = employee;

        while (currentEmployee !== null && currentEmployee.managerId !== null) {
            const manager = this.EmployeeRetriever.findEmployeeById(currentEmployee.managerId);
            if (manager) {
                managerNames.unshift(manager.name);
                currentEmployee = manager;
            } else {
                currentEmployee = null;
            }
        }

        return managerNames.reverse();
    }

    // Print the entire hierarchy
    printHierarchy(): void {
        const rootNodes = this.getRootNodes();
        for (const rootNode of rootNodes) {
            this.printSubHierarchy(rootNode, '');
        }
    }

    // Recursive helper function to print a hierarchy subtree
    private printSubHierarchy(node: EmployeeNode, indent: string): void {
        console.log(`${indent}${node.employee.name}`);
        for (const childNode of node.children) {
            this.printSubHierarchy(childNode, `${indent}    `);
        }
    }

    // Get root nodes of the employee tree
    getRootNodes(): EmployeeNode[] {
        return Array.from(this.employeeMap.values()).filter(node => node.employee.managerId === null);
    }

    // Get the EmployeeRetriever instance
    getEmployeeRetriever(): EmployeeRetriever {
        return this.EmployeeRetriever;
    }


    // Calculate the number of leaf nodes in the tree
    calculateLeafNodes(node: EmployeeNode | null = null): number {
        if (node === null) {
            const rootNodes = this.getRootNodes();
            return rootNodes.reduce((total, rootNode) => total + this.calculateLeafNodes(rootNode), 0);
        }

        if (node.children.length === 0) {
            if (node.employee.id !== 1 && node.employee.managerId !== null) {
                return 1; // This is a leaf node for the specified conditions
            }
            return 0; // This is not a leaf node
        }

        return node.children.reduce((total, childNode) => total + this.calculateLeafNodes(childNode), 0);
    }

    // Calculate the maximum depth of the tree
    calculateMaxTreeDepth(node: EmployeeNode | null = null): number {
        if (node === null) {
            const rootNodes = this.getRootNodes();
            return Math.max(...rootNodes.map(rootNode => this.calculateMaxTreeDepth(rootNode)));
        }

        if (node.children.length === 0) {
            return 1;
        }

        const childrenDepths = node.children.map(childNode => this.calculateMaxTreeDepth(childNode));
        return 1 + Math.max(...childrenDepths); // Add 1 to include the current node
    }

}