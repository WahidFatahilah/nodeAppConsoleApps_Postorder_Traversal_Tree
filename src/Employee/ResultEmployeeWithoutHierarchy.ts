import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultEmployeeWithoutHierarchy {
    constructor(private employee: EmployeeRetrieve) {}

    showResultEmployeeWithoutHierarchy(): string | null {
        // When employeeFound have null value
        if (this.employee.employeeFound === null) {
            return "";
        }

        // When employeeFound have value
        return this.employee.employeeDontHaveHierarchy === null
            ? " - Employee have hierarchy"
            : " - Employee dont have hierarchy" +
            "\n - Employee need to have managers";
    }

}