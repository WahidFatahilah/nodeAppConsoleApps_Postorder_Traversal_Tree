import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultRootEmployee{
    constructor(private employee: EmployeeRetrieve) {}

    showResultRootEmployee(): string | null {
        // When employeeFound have null value
        if (this.employee.employeeFound === null) {
            return "";
        }

        return this.employee.employeeWithRootPosition === null
            ? " - Not Root Employee"
            : " - Is Root Employee";

    }

}