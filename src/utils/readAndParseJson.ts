import fs from 'fs';

export function readAndParseJsonFile(filePath: string): any[] {
    const rawData: string = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(rawData);
}