import fs from 'fs';
import path from 'path';
import process from 'process';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'json', 'surat.json');
    const file = fs.readFileSync(filePath);
    const data = JSON.parse(file);
    res.json(data);
}
