import readline from "readline";
import {files} from "../utils/listJson";
import {readAndParseJsonFile} from "../utils/readAndParseJson";
import {EmployeeTree} from "../Tree/EmployeeTree";
import {ResultEmployeeNotFound} from "../Employee/ResultEmployeeNotFound";
import {ResultEmployeeWithoutHierarchy} from "../Employee/ResultEmployeeWithoutHierarchy";
import {ResultEmployeeManagerUpToRoot} from "../Employee/ResultEmployeeManagerUpToRoot";
import {ResultParentNode} from "../Employee/ResultParentNode";
import {ResultEmployeeWithDuplicateManagers} from "../Employee/ResultEmployeeWithDuplicateManagers";
import {ResultRootEmployee} from "../Employee/ResultRootEmployee";
import {EmployeeRetrieve} from "../Tree/EmployeeRetrieve";
import {employeeData} from "../Tree/EmployeeData";


export class mainCoreApp {

    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public start(): void {

        this.showWelcomeMessage();
        this.showListOfJsonAssets();
        this.rl.question('Enter the number of the file: ', (input: string) => {
            const selectedFileIndex: number = parseInt(input) - 1;

            if (selectedFileIndex >= 0 && selectedFileIndex < files.length) {
                const selectedFileName: string = files[selectedFileIndex];
                this.readSelectedFile(selectedFileName);
            } else {
                console.log('Invalid file number. Please enter a valid number.');
                this.rl.close();
            }
        });
    }

    private showWelcomeMessage(): void {
        console.log('|------------------------------------------------|');
        console.log('|    Welcome to Pre Order Traversal Project      |');
        console.log('|       Develop by Wahid F - Made With 💙        |');
    }

    private showListOfJsonAssets(): void {
        console.log('|------------------------------------------------|');
        console.log('|     Choose a JSON file (using num 0 - 9  ):    |');
        console.log('|------------------------------------------------|');
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    }

    // @ts-ignore
    private readSelectedFile(selectedFileName: string): void {
        const filePath: string = `src/assets/${selectedFileName}`;
        try {
            const data: any[] = readAndParseJsonFile(filePath);
            const organizationTree = new EmployeeTree(data);


            this.rl.question('Enter the employee name: ', (searchEmployeeName: string) => {
                console.clear()
                console.log('|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|');
                console.log("|      Result Using the Post Order Traversal Tree Algorithm:   |");
                process.stdout.write( "|");
                organizationTree.postOrderTraversal(null, searchEmployeeName); // Traverse And search employee name data
                this.showResults(searchEmployeeName, employeeData); // Call method and show result
                console.log('|------------------------------------------|');
                console.log('|  Search is finished, have a nice day :)  |');
                console.log('|------------------------------------------|');
                this.rl.close();
            });
        }catch (e) {
            console.log('|------------------------------------------|');
            console.log('|     Error When Read And Parse Json  :(   |');
            console.log('|------------------------------------------|');
            this.rl.close();
        }
    }
    private showResults(targetName: string, employeeRetrieve: EmployeeRetrieve): void {
        process.stdout.write("| \n");
        console.log('|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|');
        console.log("Fun Fact About " + targetName);

        const showResultEmployeeNotFound = new ResultEmployeeNotFound(employeeRetrieve);
        console.log(showResultEmployeeNotFound.showResultEmployeeNotFound());

        const showResultRootEmployee = new ResultRootEmployee(employeeRetrieve);
        console.log(showResultRootEmployee.showResultRootEmployee());

        const showResultEmployeeWithoutHierarchy = new ResultEmployeeWithoutHierarchy(employeeRetrieve);
        console.log(showResultEmployeeWithoutHierarchy.showResultEmployeeWithoutHierarchy());

        const showManagersUpToRoot = new ResultEmployeeManagerUpToRoot(employeeRetrieve);
        console.log(showManagersUpToRoot.ResultEmployeeManagerUpToRoot());

        const showParentEmployee = new ResultParentNode(employeeRetrieve);
        console.log(showParentEmployee.showResultParentNode());

        const showEmployeeWithDuplicateManagers = new ResultEmployeeWithDuplicateManagers(employeeRetrieve);
        console.log(showEmployeeWithDuplicateManagers.showResultEmployeeWithDuplicateManagers());
    }
}
