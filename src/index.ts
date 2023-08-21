import {MainCoreApp} from "./coreApp/mainCoreApp";


function main(): void {
    console.clear();
    const app: MainCoreApp = new MainCoreApp();
    app.start();
}

main()