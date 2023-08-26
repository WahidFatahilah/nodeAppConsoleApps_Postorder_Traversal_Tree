import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {EmployeeSearch} from "./EmployeeSearch";

export class ResultSiblings implements EmployeeSearch {
    constructor(private employeeRetriever: EmployeeRetriever) {}

    showResult(employeeName: string): string {
        const siblings = this.employeeRetriever.findSiblingsByName(employeeName);
        if (siblings.length > 0) {
            const siblingNames = siblings.map(sibling => sibling.name).join(', ');
            return `- Tree Structure Siblings of ${employeeName}: ${siblingNames}`;
        } else {
            return `- ${employeeName} has no tree structure siblings.`;
        }
    }
}