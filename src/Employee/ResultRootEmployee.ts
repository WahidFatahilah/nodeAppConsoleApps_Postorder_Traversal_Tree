
import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {EmployeeSearch} from "./EmployeeSearch";

export class ResultRootEmployee implements EmployeeSearch {
    constructor(private EmployeeRetriever: EmployeeRetriever) {}

    showResult(employeeName: string): string {
        const foundEmployee = this.EmployeeRetriever.findEmployeeByName(employeeName);
        if (foundEmployee && foundEmployee.id === 1 && foundEmployee.managerId === null) {
            return `- Employee ${foundEmployee.name} is a root tree hierarchy.`;
        }
        return '';
    }

}