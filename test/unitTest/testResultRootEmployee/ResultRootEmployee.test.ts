// @ts-ignore

import {ResultRootEmployee} from "../../../src/Employee/ResultRootEmployee";

describe('ResultRootEmployee', () => {
    it('should return " - Is Root Employee" when employee is root', () => {
        const employeeRetrieve = {
            employeeFound: 'raelynn',
            employeeWithRootPosition: 'raelynn',
            employeeDontHaveHierarchy: null,
            storeManagerUpToRoot: [],
            parentsNodeData: []
        };

        const showResultRootEmployee = new ResultRootEmployee(employeeRetrieve);
        const result = showResultRootEmployee.showResultRootEmployee();
        expect(result).toBe(' - Is Root Employee');
    });

    it('should return an message when employee is not root', () => {
        const employeeRetrieve = {
            employeeFound: 'andrew',
            employeeWithRootPosition: null,
            employeeDontHaveHierarchy: null,
            storeManagerUpToRoot: [],
            parentsNodeData: []
        };

        const showResultRootEmployee = new ResultRootEmployee(employeeRetrieve);
        const result = showResultRootEmployee.showResultRootEmployee();
        expect(result).toBe(' - Not Root Employee');
    });
});