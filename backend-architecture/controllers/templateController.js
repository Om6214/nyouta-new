import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __dirname = dirname(fileURLToPath(import.meta.url));


export const getAllTemplates = async (req, res) => {
    try {
        const templatesDir = path.join(__dirname, '../uploads/templates'); // Path to templates
        const files = fs.readdirSync(templatesDir); // Read all files in the directory

        // Filter only .ejs files
        const ejsFiles = files.filter(file => path.extname(file) === '.ejs');

        // Sample data for rendering
        const sampleData = {
            name: "Blake",
            partnerName: "Sam",
            weddingDate: "2024-12-25",
        };

        // Render each EJS file with sample data
        const templates = ejsFiles.map(file => {
            const filePath = path.join(templatesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8'); // Read the file content

            // Render the EJS template with data
            const renderedContent = ejs.render(content, sampleData);

            const id = path.basename(file, '.ejs'); // Extract ID from file name
            return { id, content: renderedContent }; // Send rendered HTML to frontend
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
