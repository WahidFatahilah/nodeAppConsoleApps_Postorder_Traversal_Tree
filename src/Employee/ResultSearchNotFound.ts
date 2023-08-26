import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {EmployeeSearch} from "./EmployeeSearch";

export class ResultSearchNotFound implements EmployeeSearch {
    constructor(private EmployeeRetriever: EmployeeRetriever) {}

    showResult(employeeName: string): string {
        const foundEmployee = this.EmployeeRetriever.findEmployeeByName(employeeName);
        if (foundEmployee) {
            return `- ${foundEmployee.name} is found on Data`;
        }
        return `- ${employeeName} not found on Data  `;
    }

}