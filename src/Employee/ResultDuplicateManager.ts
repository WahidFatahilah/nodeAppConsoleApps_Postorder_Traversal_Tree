import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {EmployeeSearch} from "./EmployeeSearch";

export class ResultDuplicateManager implements EmployeeSearch {
    constructor(private EmployeeRetriever: EmployeeRetriever) {}

    showResult(employeeName: string): string {
        const employeesWithSameName = this.EmployeeRetriever.findEmployeesWithMultipleManagers(employeeName);
        if (employeesWithSameName.length > 0) {
            const managers = employeesWithSameName.map(employee => {
                const managerName = this.EmployeeRetriever.findEmployeeById(employee.managerId || -1)?.name;
                return managerName !== employeeName ? managerName : null;
            }).filter(Boolean);

            if (managers.length > 0) {
                return `- Employee ${employeeName} has multiple managers: ${managers.join(', ')}`;
            } else {
                return `- Employee ${employeeName} has no duplicate managers.`;
            }
        } else {
            return '';
        }
    }

}
