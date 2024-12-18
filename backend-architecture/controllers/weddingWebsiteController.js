import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getWeddingWebsite = async (req, res) => {
    try {
        const { templateId } = req.params;
        const templatesDir = path.join(__dirname, '../uploads/templates');
        const filePath = path.join(templatesDir, `${templateId}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { userId} = req.user;
        const user = await User.findById(userId);
        const html = ejs.render(content, {
            name: user.name,
            partnerName: user.partnerName,
            weddingDate: user.weddingDate,
        });
        console.log(html);
        res.status(200).json({ message: 'Wedding website fetched successfully', html });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
