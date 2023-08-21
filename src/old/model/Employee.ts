

export class Employee {
    id: number;
    name: string;
    managerId: number | null;

    constructor(id: number, name: string, managerId: number | null) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
    }
}