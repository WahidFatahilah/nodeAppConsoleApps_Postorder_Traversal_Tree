import {Employee} from "../model/Employee";

export  class EmployeeNode {
    constructor(public employee: Employee, public children: EmployeeNode[] = []) {}

    addChild(node: EmployeeNode) {
        this.children.push(node);
    }
}
