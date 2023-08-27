import {ResultEmployeeWithoutHierarchy} from "../../../src/Employee/ResultEmployeeWithoutHierarchy";

describe('ResultEmployeeWithoutHierarchy', () => {
    it('should return " - Employee have hierarchy" when employee has hierarchy', () => {
        const employeeRetrieve = {
            employeeFound: 'raelynn',
            employeeWithRootPosition: null,
            employeeDontHaveHierarchy: null,
            storeManagerUpToRoot: [],
            parentsNodeData: []
        };

        const showResultEmployeeWithoutHierarchy = new ResultEmployeeWithoutHierarchy(employeeRetrieve);
        const result = showResultEmployeeWithoutHierarchy.showResultEmployeeWithoutHierarchy();
        expect(result).toBe(' - Employee have hierarchy');
    });

    it('should return " - Employee dont have hierarchy\\n - Employee need to have managers" when employee does not have hierarchy', () => {
        const employeeRetrieve = {
            employeeFound: 'kylee',
            employeeWithRootPosition: null,
            employeeDontHaveHierarchy: 'kylee',
            storeManagerUpToRoot: [],
            parentsNodeData: []
        };

        const showResultEmployeeWithoutHierarchy = new ResultEmployeeWithoutHierarchy(employeeRetrieve);
        const result = showResultEmployeeWithoutHierarchy.showResultEmployeeWithoutHierarchy();
        expect(result).toBe(' - Employee dont have hierarchy\n - Employee need to have managers');
    });

    it('should return an empty string when employeeFound is null', () => {
        const employeeRetrieve = {
            employeeFound: null,
            employeeWithRootPosition: null,
            employeeDontHaveHierarchy: null,
            storeManagerUpToRoot: [],
            parentsNodeData: []
        };

        const showResultEmployeeWithoutHierarchy = new ResultEmployeeWithoutHierarchy(employeeRetrieve);
        const result = showResultEmployeeWithoutHierarchy.showResultEmployeeWithoutHierarchy();
        expect(result).toBe('');
    });
});