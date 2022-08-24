import { request, response } from 'express';
import { upload } from '../helpers/upload.js';


const uploadFile = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

    try {
        const name = await upload(req.files, undefined, 'imgs');
        res.json({ name });
    } catch (error) {
        res.status(400).json({ error })
    }

}

export {
    uploadFile
};

