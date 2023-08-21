import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {EmployeeSearch} from "./EmployeeSearch";

export class ResultEmployeeWithoutHierarchy implements EmployeeSearch {
    constructor(private EmployeeRetriever: EmployeeRetriever) {}

    showResult(employeeName: string): string {
        const foundEmployee = this.EmployeeRetriever.findEmployeeByName(employeeName);
        if (foundEmployee) {
            if (this.EmployeeRetriever.findIsEmployeeDontHaveHierarchy(foundEmployee)) {
                return `- Employee ${foundEmployee.name} does not have a hierarchy.\n` +
                    `- Employee ${foundEmployee.name} does not have any direct report, need to have a manager`;
            }
        }
        return '';
    }

}