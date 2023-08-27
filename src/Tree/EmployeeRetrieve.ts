
export class EmployeeRetrieve {
    employeeFound: string | null = null;
    employeeWithRootPosition: string | null = null;
    employeeDontHaveHierarchy: string | null = null;
    storeManagerUpToRoot: string[] = [];
    parentsNodeData: string[] = [];
}
