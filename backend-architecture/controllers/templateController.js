import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAllTemplates = async (req, res) => {
    try {
        const templatesDir = path.join(__dirname, '../uploads/templates'); // Adjust path as needed
        const files = fs.readdirSync(templatesDir); // Read all files in the directory
        // Filter only .ejs files
        const ejsFiles = files.filter(file => path.extname(file) === '.ejs');
        // Prepare an array with the file content and ID
        const templates = ejsFiles.map(file => {
            const filePath = path.join(templatesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8'); // Read the file content
            const id = path.basename(file, '.ejs'); // Extract ID from file name
            return { id, content };
        });
        res.status(200).json({ message: 'Templates fetched successfully', templates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const templatesDir = path.join(__dirname, '../uploads/templates'); // Adjust path as needed
        const filePath = path.join(templatesDir, `${id}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8'); // Read the file content
        res.status(200).json({ message: 'Template fetched successfully', content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
