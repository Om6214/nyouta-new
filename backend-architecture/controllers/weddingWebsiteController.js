import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const formatName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export const getWeddingWebsitePreview = async (req, res) => {
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

export const createWeddingWebsite = async (req, res) => {
    try {
        const { userId } = req.user;
        const { templateId } = req.params;
        const user = await User.findById(userId);
        const slug = `${formatName(user.name)}-${formatName(user.partnerName)}-${userId}`;
        user.slug = slug;
        user.templateId = templateId;
        user.isWebsiteCreated = true;
        await user.save();
        res.status(200).json({ message: 'Wedding website created successfully', slug });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateWeddingWebsite = async (req, res) => {
    try {
        const { userId } = req.user;
        const { templateId } = req.params;
        const user = await User.findById(userId);
        user.templateId = templateId;
        await user.save();
        res.status(200).json({ message: 'Wedding website updated successfully', slug: user.slug });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getWeddingWebsite = async (req, res) => {
    try {
        const { slug } = req.params;
        const user = await User.findOne({ slug });
        if (!user) {
            return res.status(404).json({ message: 'Wedding website not found' });
        }
        const templateId = user.templateId;
        const templatesDir = path.join(__dirname, '../uploads/templates');
        const filePath = path.join(templatesDir, `${templateId}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const html = ejs.render(content, {
            name: user.name,
            partnerName: user.partnerName,
            weddingDate: user.weddingDate,
        });
        res.status(200).json({ message: 'Wedding website fetched successfully', html });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateWeddingWebsitedata = async (req, res) => {
    try {
        const { userId } = req.user;
        const { partnerName, weddingDate, weddingVenue } = req.body;
        console.log(req.body);
        const user = await User.findById(userId);
        user.partnerName = partnerName;
        if(weddingDate) user.weddingDate = weddingDate;
        if(weddingVenue) user.weddingVenue = weddingVenue;
        await user.save();
        res.status(200).json({ message: 'Wedding website data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
