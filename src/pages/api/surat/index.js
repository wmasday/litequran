import fs from 'fs';
import path from 'path';
import process from 'process';

function getData(jsonfile = '') {
    const openfile = jsonfile == '' ? 'surat.json' : jsonfile;
    const filePath = path.join(process.cwd(), 'json', openfile);
    const file = fs.readFileSync(filePath);
    const data = JSON.parse(file);

    return data;
}

export default function handler(req, res) {
    if (req.query.name) {
        const namaSurat = req.query.name;
        const data = getData();
        const dataSurat = data.find(singleSurat => singleSurat.surat === namaSurat);
        if (dataSurat) {
            const singleSurat = getData(dataSurat.json);
            return res.status(200).json(singleSurat);
        }

        return res.status(404).json({ 'code': 404, 'errors': 'surat not found', 'params': 'name' });
    }

    if (req.query.id) {
        const idSurat = req.query.id;
        const data = getData();
        const dataSurat = data.find(singleSurat => singleSurat.id == idSurat);
        if (dataSurat) {
            const singleSurat = getData(dataSurat.json);
            return res.status(200).json(singleSurat);
        }

        return res.status(404).json({ 'code': 404, 'errors': 'surat not found', 'params': 'id' });
    }

    return res.status(404).json({ 'code': 404, 'errors': 'invalid request', 'params': null });
}
