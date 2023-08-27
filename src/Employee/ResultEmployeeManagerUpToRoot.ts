import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultEmployeeManagerUpToRoot {
    constructor(private employee: EmployeeRetrieve) {}

    ResultEmployeeManagerUpToRoot(): string {
        // When employeeFound have null value
        if (this.employee.employeeFound === null) {
            return "";
        }

        if (this.employee.storeManagerUpToRoot.length > 0) {
            return ` - Hierarchy Managers Up To Root: [${this.employee.storeManagerUpToRoot}]`;
        } else {
            return " - Not Have Managers Up To Root.";
        }
    }
}
