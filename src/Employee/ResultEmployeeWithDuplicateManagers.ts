import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultEmployeeWithDuplicateManagers  {
    constructor(private employee: EmployeeRetrieve) {}

    showResultEmployeeWithDuplicateManagers(): string {
        // When employeeFound have null value
        if (this.employee.employeeFound === null) {
            return "";
        }

        if (this.employee.parentsNodeData === null) {
            return " - Employee Don't Have Duplicate Managers";
        } else if (this.employee.parentsNodeData.length > 1) {
            return ` - Have duplicate managers: ${this.employee.parentsNodeData.join(", ")}`;
        } else {
            return " - Employee Don't Have Duplicate Managers";
        }
    }
}
