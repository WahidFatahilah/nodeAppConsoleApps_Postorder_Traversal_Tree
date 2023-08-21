import { ResultRootEmployee } from '../../../src/Employee/ResultRootEmployee'; // Check the path here
import { EmployeeRetriever } from '../../../src/Tree/EmployeeRetrieve';
import {EmployeeTree} from "../../../src/Tree/EmployeeTree"; // Check the path here

describe('ResultRootEmployee', () => {
    const testData = [
        {
            "id": 1,
            "name": "raelynn",
            "managerId": null
        },
        {
            "id": 2,
            "name": "darin",
            "managerId": 1
        },
        {
            "id": 3,
            "name": "kacie",
            "managerId": 1
        },
        {
            "id": 4,
            "name": "jordana",
            "managerId": 2
        },
        {
            "id": 5,
            "name": "everett",
            "managerId": 2
        },
        {
            "id": 6,
            "name": "bertha",
            "managerId": 2
        }
    ];

    // Create an instance of EmployeeTree (you may need to provide real data or mock data)
    const employeeTree = new EmployeeTree(testData);

    // Create an instance of EmployeeRetriever using testData and employeeTree
    const employeeRetriever = new EmployeeRetriever(testData, employeeTree);

    // Create an instance of ResultRootEmployee using employeeRetriever
    const resultRootEmployee = new ResultRootEmployee(employeeRetriever);

    it('should show root hierarchy message for employee "raelynn"', () => {
        const result = resultRootEmployee.showResult('raelynn');
        expect(result).toBe('- Employee raelynn is a root tree hierarchy.');
    });

    it('should not show root hierarchy message for other employees', () => {
        const result = resultRootEmployee.showResult('darin'); // Assuming darin is not a root
        expect(result).toBe('');
    });
});