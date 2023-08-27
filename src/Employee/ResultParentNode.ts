import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultParentNode {
    constructor(private employee: EmployeeRetrieve) {}

    showResultParentNode(): string {

        // When employeeFound have null value
        if (this.employee.employeeFound === null) {
            return "";
        }

        if (this.employee.parentsNodeData === null) {
            return " - Employee Don't Have Parent";
        } else if (this.employee.parentsNodeData.length > 0) {
            return ` - Parent Node: ${this.employee.parentsNodeData.join(", ")}`;
        } else {
            return " - No parent data available.";
        }
    }
}
