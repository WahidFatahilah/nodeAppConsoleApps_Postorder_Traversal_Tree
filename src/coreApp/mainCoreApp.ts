import readline from "readline";
import {files} from "../utils/listJson";
import {EmployeeTree} from "../Tree/EmployeeTree";
import {Employee} from "../model/Employee";
import {ResultRootEmployee} from "../Employee/ResultRootEmployee";
import {ResultSearchNotFound} from "../Employee/ResultSearchNotFound";
import {ResultDuplicateManager} from "../Employee/ResultDuplicateManager";
import {ResultEmployeeWithoutHierarchy} from "../Employee/ResultEmployeeWithoutHierarchy";
import {EmployeeRetriever} from "../Tree/EmployeeRetrieve";
import {readAndParseJsonFile} from "../utils/readAndParseJson";
import {ResultSiblings} from "../Employee/ResultEmployeeSiblings";

export class MainCoreApp {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public start(): void {
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

    private showListOfJsonAssets(): void {
        console.log('|------------------------------------------------|');
        console.log('|     Choose a JSON file (using num 0 - 9  ):    |');
        console.log('|------------------------------------------------|');
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    }

    private processEmployeeTree(employeeTree: EmployeeTree): void {
        console.log('\nEmployee Hierarchy:');
        employeeTree.printHierarchy();

        const totalLeafNodes = employeeTree.calculateLeafNodes();
        console.log(`Total Leaf Nodes: ${totalLeafNodes}`);

        const maxTreeDepth = employeeTree.calculateMaxTreeDepth();
        console.log(`Max Depth: ${maxTreeDepth}`);
    }

    private readSelectedFile(selectedFileName: string): void {
        const filePath: string = `src/assets/${selectedFileName}`;
        try {

            const data: any[] = readAndParseJsonFile(filePath);
            const employeeTree = new EmployeeTree(data);
            const employeeRetriever = employeeTree.getEmployeeRetriever();

            console.clear();
            this.processEmployeeTree(employeeTree);

            //Readline input query search of employee name
            this.rl.question('Enter an employee name: ', (name: string) => {
                const foundEmployee: Employee | undefined = employeeRetriever.findEmployeeByName(name);
                this.displayResults(foundEmployee, employeeTree);

                const searchResults = this.searchResultEmployee(name, employeeRetriever);

                if (searchResults.length > 0) {
                    console.log(searchResults.join('\n'));
                } else {
                    console.log('No matching results found.');
                }
                console.log('|------------------------------------------|');
                console.log('|  Search is finished, have a nice day :)  |');
                console.log('|------------------------------------------|');
                this.rl.close();
            });
        } catch (error) {
            // @ts-ignore
            console.error('Error reading or parsing the JSON file:', error.message);
            this.rl.close();
        }
    }



    private searchResultEmployee(name: string, employeeRetriever: EmployeeRetriever): string[] {
        const searchResults: string[] = [];
        const searches = [
            new ResultRootEmployee(employeeRetriever),
            new ResultSearchNotFound(employeeRetriever),
            new ResultDuplicateManager(employeeRetriever),
            new ResultEmployeeWithoutHierarchy(employeeRetriever),
            new ResultSiblings(employeeRetriever)
        ];

        for (const search of searches) {
            const result = search.showResult(name);
            if (result) {
                searchResults.push(result);
            }
        }
        return searchResults;
    }

    private displayResults(foundEmployee: Employee | undefined, employeeTree: EmployeeTree): void {
        if (foundEmployee) {
            const managersUpToRoot: string[] = employeeTree.getParentsUpToRoot(foundEmployee);
            console.log('|------------------------------------------|');
            console.log('Results:');
            console.log(`Fun fact about ${foundEmployee.name}`);

            if (managersUpToRoot.length > 0) {
                console.log(`- Managers up to root: ${managersUpToRoot.join(', ')}`);
            } else {
                console.log("- This employee has no Managers up to root");
            }
        } else {
            console.log('- Employee not found.');
        }
    }
}