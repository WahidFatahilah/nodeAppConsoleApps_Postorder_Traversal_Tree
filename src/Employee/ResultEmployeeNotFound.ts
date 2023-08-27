import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";

export class ResultEmployeeNotFound {
    constructor(private employee: EmployeeRetrieve) {}

    showResultEmployeeNotFound(): string | null {
        return this.employee.employeeFound === null
            ? "|------------------------------------------|\n|            Data Not Found  :(            |\n|------------------------------------------|"
            : " - Employee Found";

    }

}