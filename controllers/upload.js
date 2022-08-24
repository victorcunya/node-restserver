import { request, response } from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from '../helpers/upload.js';
import { Product, User } from '../models/index.js';

const uploadFile = async (req = request, res = response) => {

    try {
        const name = await upload(req.files, undefined, 'imgs');
        res.json({ name });
    } catch (error) {
        res.status(400).json({ error })
    }

}

const updateFile = async (req = request, res = response) => {

    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(404).json({
                    msg: `No existe usuario con ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(404).json({
                    msg: `No existe producto con ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar esta collection'
            })
    }

    if (model.image) {
        const pathImage = path.join(process.cwd(), '/uploads/', collection, model.image);

        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage); // remove
        }

    }

    model.image = await upload(req.files, undefined, collection);
    await model.save()

    res.json(model);
}

const showImage = async (req = request, res = response) => {

    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(404).json({
                    msg: `No existe usuario con ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(404).json({
                    msg: `No existe producto con ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar esta collection'
            })
    }

    if (model.image) {
        const pathImage = path.join(process.cwd(), '/uploads/', collection, model.image);

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }

    }

    res.json({
        msg: 'Falta el placeholder'
    });
}

export {
    uploadFile, updateFile, showImage
};

