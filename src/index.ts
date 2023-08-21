/*
interface TreeNode {
    id: number;
    name: string;
    managerId: number | null;
}
*/

const jsonData = [
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
    },
    {
        "id": 7,
        "name": "peg",
        "managerId": 3
    },
    {
        "id": 8,
        "name": "hugh",
        "managerId": 3
    },
    {
        "id": 9,
        "name": "eveleen",
        "managerId": 3
    },
    {
        "id": 10,
        "name": "evelina",
        "managerId": 9
    }
];

class Employee {
    id: number;
    name: string;
    managerId: number | null;

    constructor(id: number, name: string, managerId: number | null) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
    }

}
class EmployeeRetrieve {
    employeeWithRootPosition: string | null = null;
    employeeDontHaveHierarchy: string | null = null;
    storeManagerUpToRoot: string[] = [];
    parentsNodeData: string[] = [];

}

const employeeRetrieve = new EmployeeRetrieve();

class OrganizationTree {
    employees: Employee[];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    preOrderTraversal(nodeId: number | null, targetName: string | null, managerHierarchy: string[] = []) {
        for (const node of this.employees) {
            if (node.managerId === nodeId) {
                console.log(node.name);
                if (node.name === targetName) {
                    this.storeDataForTargetName(node, managerHierarchy);
                }
                this.preOrderTraversal(node.id, targetName, [...managerHierarchy, node.name]);
            }
        }
    }

    storeDataForTargetName(node: Employee, managerHierarchy: string[]) {
        this.storeRootHierarchyData(node);
        this.storeEmployeedDontHaveHierarchyData(node);
        this.storeManagerUpToRoot(managerHierarchy);
        this.storeManagerName(managerHierarchy);
    }

    storeRootHierarchyData(node: Employee) {
        if (node.id === 1) {
            employeeRetrieve.employeeWithRootPosition = node.name;
        }
    }

    storeEmployeedDontHaveHierarchyData(node: Employee) {
        if (node.managerId === null && node.id !== 1) {
            employeeRetrieve.employeeDontHaveHierarchy = node.name;
        }
    }

    storeManagerUpToRoot(managerHierarchy: string[]) {
        if (managerHierarchy.length > 0) {
            for (let i = managerHierarchy.length - 1; i >= 0; i--) {
                employeeRetrieve.storeManagerUpToRoot.push(managerHierarchy[i]);
            }
        }
    }

    storeManagerName(managerHierarchy: string[]) {
        const topManagerName = managerHierarchy[managerHierarchy.length - 1];
        employeeRetrieve.parentsNodeData.push(topManagerName);
    }
}

const organizationTree = new OrganizationTree(jsonData);

console.log("preOrderedData:");
organizationTree.preOrderTraversal(null, null); // Mengakses semua data

const targetName = "raelynn";
console.log("Searching for:", targetName);
organizationTree.preOrderTraversal(null, targetName); // Mengakses data "linton"

console.log("--------------------------------------------------------");

console.log("Employee With Root Position:", employeeRetrieve.employeeWithRootPosition);
console.log("Employee Without Hierarchy:", employeeRetrieve.employeeDontHaveHierarchy);
console.log("Stored Manager Up To Root:", employeeRetrieve.storeManagerUpToRoot);
console.log("Parents Node Data:", employeeRetrieve.parentsNodeData);

/*

let parentsNodeData: string[] = [];


class OrganizationTree {
    employees: Employee[];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    preOrderTraversal(nodeId: number | null, targetName: string | null, managerHierarchy: string[] = []) {

        for (const node of this.employees) {
            if (node.managerId === nodeId) {
                //console.log(node.name);

                if (node.name === targetName) {
                    this.storeDataForTargetName(node, managerHierarchy);

                }

                this.preOrderTraversal(node.id, targetName, [...managerHierarchy, node.name]);
            }
        }
    }

    storeDataForTargetName(node: Employee, managerHierarchy: string[]) {
        this.storeRootHierarchyData(node);
        this.storeEmployeedDontHaveHierarchyData(node);
        this.storeManagerUpToRoot(managerHierarchy);
        this.storeManagerName(managerHierarchy);
    }

    storeRootHierarchyData(node: Employee) {
        if (node.id === 1) {
            console.log("Adalah root hierarchy");
        }
    }

    storeEmployeedDontHaveHierarchyData(node: Employee) {
        if (node.managerId === null && node.id !== 1) {
            console.log("Employee Tidak memiliki hierarchy");
        }
    }

    storeManagerUpToRoot(managerHierarchy: string[]) {
        if (managerHierarchy.length > 0) {
            console.log("Hierarki Managers Up To Root");
            for (let i = managerHierarchy.length - 1; i >= 0; i--) {
                console.log(managerHierarchy[i]);
            }
        }
    }

    storeManagerName(managerHierarchy: string[]) {
        const topManagerName = managerHierarchy[managerHierarchy.length - 1];
        parentsNodeData.push(topManagerName);
        console.log("Manager (Parent Node) :", topManagerName);
    }

}

const organizationTree = new OrganizationTree(jsonData);

console.log("preOrderedData:");
organizationTree.preOrderTraversal(null, null); // Mengakses semua data

const targetName = "linton";
console.log("Searching for:", targetName);
organizationTree.preOrderTraversal(null, targetName); // Mengakses data "linton"

*/



/*
// Mengakses dan mencetak semua nama manager dalam array
console.log("Managers Duplicate:");
for (const manager of managersDuplicate) {
    console.log(manager);
}

// Menghitung jumlah nama manager dalam array
const totalManagers = managersDuplicate.length;
console.log("Total Managers Duplicate:", totalManagers);



*/


/*
let duplicateEmployee = 0
let managersDuplicate: string[] = [];
function preOrderTraversal(nodeId: number | null, targetName: string | null, managerHierarchy: string[] = []): void {
    for (const node of jsonData) {

        if (node.managerId === nodeId) {
            console.log(node.name);

            if (node.name === targetName) {

                duplicateEmployee++
                // saya ingin push node ini ke daftar data ditemukan
                console.log("Data Ditemukan");
                // saya ingin push node ini ke daftar karyawaan root
                if(node.id === 1){
                    console.log("Adalah root hierarchy");
                }
                // saya ingin push node ini ke daftar karyawan tidak memiliki hierarchy
                if(node.managerId === null && node.id !== 1){
                    console.log("Employee Tidak memiliki hierarchy");
                }

                if (managerHierarchy.length > 0) {
                    console.log("Hierarki Pengelola hingga ke akar pohon:");
                    for (let i = managerHierarchy.length - 1; i >= 0; i--) {
                        const managerName = managerHierarchy[i];
                        console.log(managerName);
                    }
                }

                if(duplicateEmployee>= 1){
                    const topManagerName = managerHierarchy[managerHierarchy.length - 1];
                    managersDuplicate.push(topManagerName); // Menambahkan nama manager ke dalam array managersDuplicate
                    console.log("Nama Manager Teratas :", topManagerName);
                }

            }

            preOrderTraversal(node.id, targetName, [...managerHierarchy, node.name]);
        }
    }
}
console.log("preOrderedData:");
preOrderTraversal(null, null); // Mengakses semua data

const targetName = "linton";
console.log("Searching for:", targetName);
preOrderTraversal(null, targetName); // Mengakses data "evelina"

// Mengakses dan mencetak semua nama manager dalam array
console.log("Managers Duplicate:");
for (const manager of managersDuplicate) {
    console.log(manager);
}

// Menghitung jumlah nama manager dalam array
const totalManagers = managersDuplicate.length;
console.log("Total Managers Duplicate:", totalManagers);*/

/*

function inOrderTraversal(nodeId: number | null, result: TreeNode[] = []): TreeNode[] {
    for (const node of jsonData) {
        if (node.managerId === nodeId) {
            inOrderTraversal(node.id, result);
            result.push(node);
        }
    }
    return result;
}

const inOrderedData: TreeNode[] = inOrderTraversal(null);
console.log(inOrderedData);

*/

/*
function postOrderTraversal(nodeId: number | null): void {
    for (const node of jsonData) {
        if (node.managerId === nodeId) {
            postOrderTraversal(node.id); // Rekursi untuk mengunjungi child nodes (subtree)
            console.log(node.name); // Cetak current node setelah mengunjungi child nodes
        }
    }
}

console.log("postOrderedData:");
postOrderTraversal(null); // Memulai traversing dari root (null)
*/



/*
//Pre order traversal accepted
function preOrderTraversal(nodeId: number | null, result: TreeNode[] = []): TreeNode[] {
    for (const node of jsonData) {
        if (node.managerId === nodeId) {
            result.push(node);
            preOrderTraversal(node.id, result);
        }
    }
    return result;
}

console.log("preOrderedData")
const preOrderedData: TreeNode[] = preOrderTraversal(null);
console.log(preOrderedData);

*/





/*

let duplicateEmployee = 0; // Inisialisasi variabel di luar fungsi
let managerNames: string[] = []; // Array untuk menyimpan nama manager

function findEmployeeAndTraverse(nameToFind: string, nodeId: number | null = null, level: number = 0, managerUpToRoot: string[] = [], siblings: string[] = []) {

    for (const node of jsonData) {

        if ( (node.managerId === nodeId) || (node.managerId === null && nodeId === null)) {

            if (node.name === nameToFind) {
                duplicateEmployee++;

                // Found Message
                console.log("  ".repeat(level) + node.name + " detected");

                // Search Employee Hierarchy
                if (node.id === 1) {
                    console.log(node.name + " Is root Employee");
                }

                if (node.managerId === null && nodeId != 1) {
                    console.log(node.name + " Don't have hierarchy");
                }

                if (managerUpToRoot.length > 0) {
                    const reversedManagers = managerUpToRoot.slice().reverse();
                    console.log("Managers up to root are: " + reversedManagers.join(", "));
                    managerNames.push(reversedManagers[0]);
                }

            }

            findEmployeeAndTraverse(nameToFind, node.id, level + 1, [...managerUpToRoot, node.name], siblings);



        }
    }
}

// Example: calling the function and checking duplicateEmployee

findEmployeeAndTraverse("linton");
console.log("Duplicate Employee count: " + duplicateEmployee);
console.log("Manager Names: " + managerNames.join(", "));

*/

/*

function findEmployeeAndTraverse(nameToFind: string, nodeId: number | null = null, level: number = 0, managerNames: string[] = []) {
    for (const node of jsonData) {
        if ((node.managerId === nodeId) || (node.managerId === null && nodeId === null)) {

            if (node.name === nameToFind) {
                console.log("  ".repeat(level) + node.name + " ketemu");
                if (managerNames.length > 0) {
                    console.log("Managers up to root adalah: " + managerNames.join(", "));
                }
                return;
            }



            findEmployeeAndTraverse(nameToFind, node.id, level + 1, [...managerNames, node.name]);
        }
    }
}

// Mencari "Evelina" dan menampilkan hasil
findEmployeeAndTraverse("peg");

*/

/*
function buildTreeAndTraverse(nodeId: number | null = null, level: number = 0) {
    for (const node of jsonData) {
        if ((node.managerId === nodeId) || (node.managerId === null && nodeId === null)) {
            console.log("  ".repeat(level) + node.name);
            buildTreeAndTraverse(node.id, level + 1);
        }
    }
}

// Membangun pohon dan melakukan pre-order traversal
buildTreeAndTraverse()
*/
